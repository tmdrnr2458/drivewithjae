"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  ChevronDown,
  ChevronRight,
  X,
  Car,
  Truck,
  Zap,
  Fuel,
  Droplets,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────

export interface FilterState {
  type: "all" | "new" | "used";
  makes: string[];
  models: string[];
  trims: string[];
  priceRanges: string[];
  mileageRanges: string[];
  bodyStyles: string[];
  features: string[];
  fuelTypes: string[];
  drivetrains: string[];
  colors: string[];
  certifiedOnly: boolean;
  search: string;
}

export const EMPTY_FILTERS: FilterState = {
  type: "all",
  makes: [],
  models: [],
  trims: [],
  priceRanges: [],
  mileageRanges: [],
  bodyStyles: [],
  features: [],
  fuelTypes: [],
  drivetrains: [],
  colors: [],
  certifiedOnly: false,
  search: "",
};

// ─── Constants ─────────────────────────────────────────

export const PRICE_RANGES = [
  { key: "under_20k", label: "Under $20K", sublabel: "~$400/mo", min: 0, max: 20000 },
  { key: "20k_30k", label: "$20K-$30K", sublabel: "~$400-600/mo", min: 20000, max: 30000 },
  { key: "30k_40k", label: "$30K-$40K", sublabel: "~$600-800/mo", min: 30000, max: 40000 },
  { key: "40k_50k", label: "$40K-$50K", sublabel: "~$800-1000/mo", min: 40000, max: 50000 },
  { key: "50k_plus", label: "$50K+", sublabel: "~$1000+/mo", min: 50000, max: Infinity },
];

export const MILEAGE_RANGES = [
  { key: "under_10k", label: "Under 10K mi", min: 0, max: 10000 },
  { key: "10k_30k", label: "10K-30K mi", min: 10000, max: 30000 },
  { key: "30k_50k", label: "30K-50K mi", min: 30000, max: 50000 },
  { key: "50k_100k", label: "50K-100K mi", min: 50000, max: 100000 },
  { key: "100k_plus", label: "100K+ mi", min: 100000, max: Infinity },
];

export const BODY_STYLE_MAP: Record<string, { label: string; icon: string }> = {
  sedan: { label: "Sedan", icon: "sedan" },
  suv: { label: "SUV", icon: "suv" },
  truck: { label: "Truck", icon: "truck" },
  van: { label: "Van", icon: "van" },
  minivan: { label: "Minivan", icon: "van" },
  hatchback: { label: "Hatchback", icon: "hatchback" },
  coupe: { label: "Coupe", icon: "coupe" },
  wagon: { label: "Wagon", icon: "wagon" },
  crossover: { label: "Crossover", icon: "suv" },
  convertible: { label: "Convertible", icon: "coupe" },
};

export const FUEL_TYPES = [
  { key: "gas", label: "Gas" },
  { key: "hybrid", label: "Hybrid" },
  { key: "ev", label: "Electric" },
];

export const DRIVETRAIN_OPTIONS = [
  { key: "fwd", label: "FWD" },
  { key: "rwd", label: "RWD" },
  { key: "awd", label: "AWD" },
  { key: "4wd", label: "4WD" },
];

export const FEATURE_GROUPS = {
  winter_ready: {
    label: "Winter Ready \u2744\uFE0F",
    features: [
      { key: "heated_seats", label: "Heated Seats" },
      { key: "heated_steering", label: "Heated Wheel" },
      { key: "remote_start", label: "Remote Start" },
      { key: "awd", label: "AWD" },
    ],
  },
  family_friendly: {
    label: "Family Friendly \uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
    features: [
      { key: "third_row", label: "3rd Row" },
      { key: "power_liftgate", label: "Power Liftgate" },
      { key: "backup_camera", label: "Backup Cam" },
      { key: "blind_spot", label: "Blind Spot" },
      { key: "rear_cross_traffic", label: "Rear Cross Traffic" },
    ],
  },
  road_trip: {
    label: "Road Trip Ready \uD83D\uDEE3\uFE0F",
    features: [
      { key: "adaptive_cruise", label: "Smart Cruise" },
      { key: "lane_assist", label: "Lane Assist" },
      { key: "premium_audio", label: "Premium Audio" },
      { key: "roof_rack", label: "Roof Rack" },
      { key: "tow_package", label: "Tow Package" },
    ],
  },
  tech_lover: {
    label: "Tech Lover \uD83D\uDCF1",
    features: [
      { key: "apple_carplay", label: "CarPlay" },
      { key: "android_auto", label: "Android Auto" },
      { key: "wireless_charging", label: "Wireless Charging" },
      { key: "digital_dash", label: "Digital Dash" },
      { key: "heads_up", label: "Heads-Up Display" },
      { key: "keyless_entry", label: "Push Start" },
    ],
  },
  luxury_feel: {
    label: "Luxury Feel \u2728",
    features: [
      { key: "leather", label: "Leather" },
      { key: "cooled_seats", label: "Cooled Seats" },
      { key: "sunroof", label: "Sunroof" },
      { key: "ventilated_seats", label: "Ventilated Seats" },
      { key: "premium_audio", label: "Premium Audio" },
      { key: "parking_sensors", label: "Park Sensors" },
    ],
  },
  safety_first: {
    label: "Safety First \uD83D\uDEE1\uFE0F",
    features: [
      { key: "backup_camera", label: "Backup Cam" },
      { key: "blind_spot", label: "Blind Spot" },
      { key: "lane_assist", label: "Lane Assist" },
      { key: "adaptive_cruise", label: "Smart Cruise" },
      { key: "parking_sensors", label: "Park Sensors" },
    ],
  },
};

// ─── Helper: Brand hierarchy from vehicles ─────────────

export interface BrandHierarchy {
  make: string;
  count: number;
  models: {
    model: string;
    count: number;
    trims: { trim: string; count: number }[];
  }[];
}

interface InventoryFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  brandHierarchy: BrandHierarchy[];
  availableBodyStyles: string[];
  availableFuelTypes: string[];
  availableColors: string[];
  availableDrivetrains: string[];
  totalCount: number;
  filteredCount: number;
  newCount: number;
  usedCount: number;
  showCpoToggle?: boolean;
}

// ─── Collapsible section ───────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
  onClear,
  showClear = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onClear?: () => void;
  showClear?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground hover:text-sky-600 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          {title}
        </span>
        {showClear && onClear && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="text-xs text-muted-foreground hover:text-sky-500 transition-colors"
          >
            Clear
          </span>
        )}
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

// ─── Pill button ───────────────────────────────────────

function PillButton({
  active,
  onClick,
  children,
  className = "",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-sky-500 bg-sky-500 text-white"
          : "border-border bg-background text-foreground hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950"
      } ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Checkbox item ─────────────────────────────────────

function CheckboxItem({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer py-0.5 text-sm hover:text-sky-600 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-border text-sky-500 focus:ring-sky-500 accent-sky-500"
      />
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </label>
  );
}

// ─── Main filter component ─────────────────────────────

export function InventoryFilters({
  filters,
  onChange,
  brandHierarchy,
  availableBodyStyles,
  availableFuelTypes,
  availableColors,
  availableDrivetrains,
  totalCount,
  filteredCount,
  newCount,
  usedCount,
  showCpoToggle = false,
}: InventoryFiltersProps) {
  const [expandedMakes, setExpandedMakes] = useState<Set<string>>(new Set());
  const [expandedModels, setExpandedModels] = useState<Set<string>>(new Set());

  function toggleArrayItem<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  function update(partial: Partial<FilterState>) {
    onChange({ ...filters, ...partial });
  }

  // Toggle make expansion
  function toggleMakeExpanded(make: string) {
    setExpandedMakes((prev) => {
      const next = new Set(prev);
      if (next.has(make)) next.delete(make);
      else next.add(make);
      return next;
    });
  }

  function toggleModelExpanded(key: string) {
    setExpandedModels((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="space-y-1">
      {/* Search bar */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search model, color, VIN..."
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          className="pl-9 h-9 text-sm"
        />
        {filters.search && (
          <button
            onClick={() => update({ search: "" })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* New / Used toggle */}
      <div className="flex gap-2 mb-3">
        {(["all", "new", "used"] as const).map((t) => {
          const count = t === "all" ? totalCount : t === "new" ? newCount : usedCount;
          return (
            <PillButton
              key={t}
              active={filters.type === t}
              onClick={() => update({ type: t, ...(t === "new" ? { mileageRanges: [], certifiedOnly: false } : {}) })}
            >
              {t === "all" ? "All" : t === "new" ? "New" : "Used"} ({count})
            </PillButton>
          );
        })}
      </div>

      <Separator />

      {/* CPO toggle — only on Used page */}
      {showCpoToggle && filters.type !== "new" && (
        <>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-semibold text-foreground">Certified Pre-Owned</span>
            <button
              onClick={() => update({ certifiedOnly: !filters.certifiedOnly })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                filters.certifiedOnly ? "bg-sky-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  filters.certifiedOnly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <Separator />
        </>
      )}

      {/* Brand / Model / Trim hierarchy */}
      <FilterSection
        title="Brand"
        showClear={filters.makes.length > 0 || filters.models.length > 0 || filters.trims.length > 0}
        onClear={() => update({ makes: [], models: [], trims: [] })}
      >
        <div className="space-y-0.5 max-h-64 overflow-y-auto pr-1">
          {brandHierarchy.map((brand) => (
            <div key={brand.make}>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleMakeExpanded(brand.make)}
                  className="p-0.5 text-muted-foreground hover:text-foreground"
                >
                  {expandedMakes.has(brand.make) ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </button>
                <CheckboxItem
                  checked={filters.makes.includes(brand.make)}
                  onChange={() => update({ makes: toggleArrayItem(filters.makes, brand.make) })}
                  label={brand.make}
                  count={brand.count}
                />
              </div>
              {expandedMakes.has(brand.make) && (
                <div className="ml-6 space-y-0.5">
                  {brand.models.map((m) => {
                    const modelKey = `${brand.make}|${m.model}`;
                    return (
                      <div key={modelKey}>
                        <div className="flex items-center gap-1">
                          {m.trims.length > 1 && (
                            <button
                              onClick={() => toggleModelExpanded(modelKey)}
                              className="p-0.5 text-muted-foreground hover:text-foreground"
                            >
                              {expandedModels.has(modelKey) ? (
                                <ChevronDown className="h-3 w-3" />
                              ) : (
                                <ChevronRight className="h-3 w-3" />
                              )}
                            </button>
                          )}
                          {m.trims.length <= 1 && <span className="w-4" />}
                          <CheckboxItem
                            checked={filters.models.includes(modelKey)}
                            onChange={() => update({ models: toggleArrayItem(filters.models, modelKey) })}
                            label={m.model}
                            count={m.count}
                          />
                        </div>
                        {expandedModels.has(modelKey) && m.trims.length > 1 && (
                          <div className="ml-6 space-y-0.5">
                            {m.trims.map((tr) => {
                              const trimKey = `${brand.make}|${m.model}|${tr.trim}`;
                              return (
                                <CheckboxItem
                                  key={trimKey}
                                  checked={filters.trims.includes(trimKey)}
                                  onChange={() => update({ trims: toggleArrayItem(filters.trims, trimKey) })}
                                  label={tr.trim || "(Base)"}
                                  count={tr.count}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Price Range */}
      <FilterSection
        title="Price"
        showClear={filters.priceRanges.length > 0}
        onClear={() => update({ priceRanges: [] })}
      >
        <div className="flex flex-wrap gap-1.5">
          {PRICE_RANGES.map((r) => (
            <PillButton
              key={r.key}
              active={filters.priceRanges.includes(r.key)}
              onClick={() => update({ priceRanges: toggleArrayItem(filters.priceRanges, r.key) })}
            >
              <span className="flex flex-col items-center leading-tight">
                <span>{r.label}</span>
                <span className="text-[10px] opacity-70">{r.sublabel}</span>
              </span>
            </PillButton>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Mileage — only when Used is selected */}
      {(filters.type === "used" || filters.type === "all") && (
        <>
          <FilterSection
            title="Mileage"
            showClear={filters.mileageRanges.length > 0}
            onClear={() => update({ mileageRanges: [] })}
          >
            <div className="flex flex-wrap gap-1.5">
              {MILEAGE_RANGES.map((r) => (
                <PillButton
                  key={r.key}
                  active={filters.mileageRanges.includes(r.key)}
                  onClick={() => update({ mileageRanges: toggleArrayItem(filters.mileageRanges, r.key) })}
                >
                  {r.label}
                </PillButton>
              ))}
            </div>
          </FilterSection>
          <Separator />
        </>
      )}

      {/* Body Style */}
      <FilterSection
        title="Body Style"
        showClear={filters.bodyStyles.length > 0}
        onClear={() => update({ bodyStyles: [] })}
      >
        <div className="grid grid-cols-3 gap-1.5">
          {availableBodyStyles.map((bs) => {
            const info = BODY_STYLE_MAP[bs] || { label: bs.charAt(0).toUpperCase() + bs.slice(1), icon: "car" };
            const active = filters.bodyStyles.includes(bs);
            return (
              <button
                key={bs}
                onClick={() => update({ bodyStyles: toggleArrayItem(filters.bodyStyles, bs) })}
                className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-xs font-medium transition-all ${
                  active
                    ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                    : "border-border hover:border-sky-300 hover:bg-muted"
                }`}
              >
                {info.icon === "truck" ? (
                  <Truck className="h-5 w-5" />
                ) : (
                  <Car className="h-5 w-5" />
                )}
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <Separator />

      {/* Drivetrain */}
      {availableDrivetrains.length > 0 && (
        <>
          <FilterSection
            title="Drivetrain"
            showClear={filters.drivetrains.length > 0}
            onClear={() => update({ drivetrains: [] })}
          >
            <div className="flex flex-wrap gap-1.5">
              {DRIVETRAIN_OPTIONS.filter((dt) => availableDrivetrains.includes(dt.key)).map((dt) => (
                <PillButton
                  key={dt.key}
                  active={filters.drivetrains.includes(dt.key)}
                  onClick={() => update({ drivetrains: toggleArrayItem(filters.drivetrains, dt.key) })}
                >
                  {dt.label}
                </PillButton>
              ))}
            </div>
          </FilterSection>
          <Separator />
        </>
      )}

      {/* Fuel Type */}
      <FilterSection
        title="Fuel Type"
        showClear={filters.fuelTypes.length > 0}
        onClear={() => update({ fuelTypes: [] })}
      >
        <div className="flex flex-wrap gap-1.5">
          {FUEL_TYPES.filter((ft) => availableFuelTypes.includes(ft.key)).map((ft) => (
            <PillButton
              key={ft.key}
              active={filters.fuelTypes.includes(ft.key)}
              onClick={() => update({ fuelTypes: toggleArrayItem(filters.fuelTypes, ft.key) })}
            >
              {ft.key === "ev" ? (
                <Zap className="mr-1 h-3 w-3" />
              ) : ft.key === "hybrid" ? (
                <Droplets className="mr-1 h-3 w-3" />
              ) : (
                <Fuel className="mr-1 h-3 w-3" />
              )}
              {ft.label}
            </PillButton>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Color */}
      {availableColors.length > 0 && (
        <>
          <FilterSection
            title="Exterior Color"
            defaultOpen={false}
            showClear={filters.colors.length > 0}
            onClear={() => update({ colors: [] })}
          >
            <div className="flex flex-wrap gap-1.5">
              {availableColors.map((color) => (
                <PillButton
                  key={color}
                  active={filters.colors.includes(color)}
                  onClick={() => update({ colors: toggleArrayItem(filters.colors, color) })}
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full border border-gray-300 mr-1.5"
                    style={{ backgroundColor: colorToHex(color) }}
                  />
                  {color}
                </PillButton>
              ))}
            </div>
          </FilterSection>
          <Separator />
        </>
      )}

      {/* Features */}
      <FilterSection
        title="Features"
        defaultOpen={false}
        showClear={filters.features.length > 0}
        onClear={() => update({ features: [] })}
      >
        <div className="space-y-3">
          {Object.entries(FEATURE_GROUPS).map(([groupKey, group]) => (
            <div key={groupKey}>
              <p className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.features.map((f) => (
                  <CheckboxItem
                    key={`${groupKey}-${f.key}`}
                    checked={filters.features.includes(f.key)}
                    onChange={() => update({ features: toggleArrayItem(filters.features, f.key) })}
                    label={f.label}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

// ─── Color name to hex helper ─────────────────────────

function colorToHex(color: string): string {
  const c = color.toLowerCase();
  const map: Record<string, string> = {
    black: "#1a1a1a",
    white: "#f5f5f5",
    silver: "#c0c0c0",
    gray: "#808080",
    grey: "#808080",
    red: "#dc2626",
    blue: "#2563eb",
    green: "#16a34a",
    yellow: "#eab308",
    orange: "#ea580c",
    brown: "#92400e",
    beige: "#d4c5a9",
    gold: "#ca8a04",
    maroon: "#7f1d1d",
    navy: "#1e3a5f",
    burgundy: "#800020",
    tan: "#d2b48c",
    cream: "#fffdd0",
    charcoal: "#36454f",
    pearl: "#eae0c8",
    platinum: "#e5e4e2",
    bronze: "#cd7f32",
  };
  // Try to match any keyword in the color name
  for (const [keyword, hex] of Object.entries(map)) {
    if (c.includes(keyword)) return hex;
  }
  return "#9ca3af"; // default gray
}
