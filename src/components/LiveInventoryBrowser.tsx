"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { DealerVehicle } from "@/lib/dealer-api";
import { mapDealerToQuizVehicle } from "@/lib/dealer-quiz-bridge";
import { DealerVehicleCard } from "./DealerVehicleCard";
import {
  InventoryFilters,
  FilterState,
  EMPTY_FILTERS,
  PRICE_RANGES,
  MILEAGE_RANGES,
  BODY_STYLE_MAP,
  FUEL_TYPES,
  FEATURE_GROUPS,
  DRIVETRAIN_OPTIONS,
  type BrandHierarchy,
} from "./InventoryFilters";
import { FilterChips, type FilterChip } from "./FilterChips";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ArrowUpDown, Loader2, RefreshCw, SlidersHorizontal, X } from "lucide-react";

// ─── Feature cache ─────────────────────────────────────

function getVehicleFeatures(vehicle: DealerVehicle): string[] {
  const mapped = mapDealerToQuizVehicle(vehicle);
  return mapped.lifestyleTags.features;
}

function getVehicleFuel(vehicle: DealerVehicle): string {
  const mapped = mapDealerToQuizVehicle(vehicle);
  return mapped.fuel;
}

function getVehiclePrice(vehicle: DealerVehicle): number {
  const raw = vehicle.salePrice || vehicle.msrp || vehicle.retailPrice || "0";
  return parseInt(raw.replace(/[$,]/g, "")) || 0;
}

// ─── Drivetrain detection ─────────────────────────────

const AWD_DEFAULT_MAKES = ["subaru"];

function getVehicleDrivetrain(vehicle: DealerVehicle): string {
  const trimLower = `${vehicle.trim} ${vehicle.model}`.toLowerCase();

  if (/\b4wd\b|4x4|four.?wheel/i.test(trimLower)) return "4wd";
  if (/\bawd\b|all.?wheel/i.test(trimLower)) return "awd";
  if (/\brwd\b|rear.?wheel/i.test(trimLower)) return "rwd";
  if (/\bfwd\b|front.?wheel/i.test(trimLower)) return "fwd";

  // Make-based defaults
  if (AWD_DEFAULT_MAKES.includes(vehicle.make.toLowerCase())) return "awd";

  // Default to FWD for most sedans/crossovers
  return "fwd";
}

// ─── Filter matching logic ─────────────────────────────

function matchesFilters(
  vehicle: DealerVehicle,
  filters: FilterState,
  features: string[],
  fuel: string,
  price: number,
  drivetrain: string
): boolean {
  // Type filter
  if (filters.type !== "all" && vehicle.type !== filters.type) return false;

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const haystack = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim} ${vehicle.exteriorColor} ${vehicle.vin}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }

  // Makes (OR within)
  if (filters.makes.length > 0) {
    if (!filters.makes.includes(vehicle.make)) return false;
  }

  // Models (OR within) — key format: "Make|Model"
  if (filters.models.length > 0) {
    const vehicleModelKey = `${vehicle.make}|${vehicle.model}`;
    if (!filters.models.includes(vehicleModelKey)) return false;
  }

  // Trims (OR within) — key format: "Make|Model|Trim"
  if (filters.trims.length > 0) {
    const vehicleTrimKey = `${vehicle.make}|${vehicle.model}|${vehicle.trim}`;
    if (!filters.trims.includes(vehicleTrimKey)) return false;
  }

  // Price ranges (OR within)
  if (filters.priceRanges.length > 0) {
    const matchesAnyPrice = filters.priceRanges.some((rangeKey) => {
      const range = PRICE_RANGES.find((r) => r.key === rangeKey);
      if (!range) return false;
      return price >= range.min && price < range.max;
    });
    if (!matchesAnyPrice) return false;
  }

  // Mileage ranges (OR within)
  if (filters.mileageRanges.length > 0) {
    const matchesAnyMileage = filters.mileageRanges.some((rangeKey) => {
      const range = MILEAGE_RANGES.find((r) => r.key === rangeKey);
      if (!range) return false;
      return vehicle.mileage >= range.min && vehicle.mileage < range.max;
    });
    if (!matchesAnyMileage) return false;
  }

  // Body styles (OR within)
  if (filters.bodyStyles.length > 0) {
    const bs = vehicle.bodyStyle.toLowerCase();
    if (!filters.bodyStyles.some((style) => bs.includes(style))) return false;
  }

  // Fuel types (OR within)
  if (filters.fuelTypes.length > 0) {
    if (!filters.fuelTypes.includes(fuel)) return false;
  }

  // Drivetrain (OR within)
  if (filters.drivetrains.length > 0) {
    if (!filters.drivetrains.includes(drivetrain)) return false;
  }

  // Color (OR within)
  if (filters.colors.length > 0) {
    if (!filters.colors.includes(vehicle.exteriorColor)) return false;
  }

  // Certified Pre-Owned
  if (filters.certifiedOnly) {
    if (!vehicle.certified) return false;
  }

  // Features (AND — must have ALL selected)
  if (filters.features.length > 0) {
    for (const feat of filters.features) {
      if (!features.includes(feat)) return false;
    }
  }

  return true;
}

// ─── Build brand hierarchy from vehicles ───────────────

function buildBrandHierarchy(vehicles: DealerVehicle[]): BrandHierarchy[] {
  const makeMap = new Map<
    string,
    Map<string, Map<string, number>>
  >();

  for (const v of vehicles) {
    if (!makeMap.has(v.make)) makeMap.set(v.make, new Map());
    const modelMap = makeMap.get(v.make)!;
    if (!modelMap.has(v.model)) modelMap.set(v.model, new Map());
    const trimMap = modelMap.get(v.model)!;
    trimMap.set(v.trim, (trimMap.get(v.trim) || 0) + 1);
  }

  const result: BrandHierarchy[] = [];
  for (const [make, modelMap] of makeMap) {
    const models: BrandHierarchy["models"] = [];
    let makeCount = 0;
    for (const [model, trimMap] of modelMap) {
      const trims: BrandHierarchy["models"][0]["trims"] = [];
      let modelCount = 0;
      for (const [trim, count] of trimMap) {
        trims.push({ trim, count });
        modelCount += count;
      }
      trims.sort((a, b) => a.trim.localeCompare(b.trim));
      models.push({ model, count: modelCount, trims });
      makeCount += modelCount;
    }
    models.sort((a, b) => a.model.localeCompare(b.model));
    result.push({ make, count: makeCount, models });
  }

  result.sort((a, b) => b.count - a.count);
  return result;
}

// ─── Build active filter chips ─────────────────────────

function buildFilterChips(filters: FilterState): FilterChip[] {
  const chips: FilterChip[] = [];

  if (filters.type !== "all") {
    chips.push({
      key: filters.type,
      label: filters.type === "new" ? "New" : "Used",
      category: "type",
    });
  }

  for (const make of filters.makes) {
    chips.push({ key: make, label: make, category: "makes" });
  }

  for (const model of filters.models) {
    const parts = model.split("|");
    chips.push({ key: model, label: `${parts[0]} ${parts[1]}`, category: "models" });
  }

  for (const trim of filters.trims) {
    const parts = trim.split("|");
    chips.push({ key: trim, label: `${parts[1]} ${parts[2] || "(Base)"}`, category: "trims" });
  }

  for (const rangeKey of filters.priceRanges) {
    const range = PRICE_RANGES.find((r) => r.key === rangeKey);
    if (range) chips.push({ key: rangeKey, label: range.label, category: "priceRanges" });
  }

  for (const rangeKey of filters.mileageRanges) {
    const range = MILEAGE_RANGES.find((r) => r.key === rangeKey);
    if (range) chips.push({ key: rangeKey, label: range.label, category: "mileageRanges" });
  }

  for (const bs of filters.bodyStyles) {
    const info = BODY_STYLE_MAP[bs];
    chips.push({ key: bs, label: info?.label || bs, category: "bodyStyles" });
  }

  for (const ft of filters.fuelTypes) {
    const info = FUEL_TYPES.find((f) => f.key === ft);
    chips.push({ key: ft, label: info?.label || ft, category: "fuelTypes" });
  }

  for (const dt of filters.drivetrains) {
    const info = DRIVETRAIN_OPTIONS.find((d) => d.key === dt);
    chips.push({ key: dt, label: info?.label || dt, category: "drivetrains" });
  }

  for (const color of filters.colors) {
    chips.push({ key: color, label: color, category: "colors" });
  }

  if (filters.certifiedOnly) {
    chips.push({ key: "cpo", label: "Certified Pre-Owned", category: "certifiedOnly" });
  }

  for (const feat of filters.features) {
    // Find label from groups
    let label = feat.replace(/_/g, " ");
    for (const group of Object.values(FEATURE_GROUPS)) {
      const found = group.features.find((f) => f.key === feat);
      if (found) { label = found.label; break; }
    }
    chips.push({ key: feat, label, category: "features" });
  }

  return chips;
}

// ─── Count active filters ──────────────────────────────

function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.type !== "all") count++;
  count += filters.makes.length;
  count += filters.models.length;
  count += filters.trims.length;
  count += filters.priceRanges.length;
  count += filters.mileageRanges.length;
  count += filters.bodyStyles.length;
  count += filters.fuelTypes.length;
  count += filters.drivetrains.length;
  count += filters.colors.length;
  count += filters.features.length;
  if (filters.certifiedOnly) count++;
  if (filters.search) count++;
  return count;
}

// ─── Sort options ───────────────────────────────────────

type SortOption = "newest" | "price_asc" | "price_desc" | "mileage_asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low \u2192 High" },
  { value: "price_desc", label: "Price: High \u2192 Low" },
  { value: "mileage_asc", label: "Lowest Mileage" },
];

// ─── Props ─────────────────────────────────────────────

interface LiveInventoryBrowserProps {
  defaultType?: "all" | "new" | "used";
}

// ─── Main component ────────────────────────────────────

export function LiveInventoryBrowser({ defaultType = "all" }: LiveInventoryBrowserProps) {
  const t = useTranslations("inventory");
  const [vehicles, setVehicles] = useState<DealerVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    ...EMPTY_FILTERS,
    type: defaultType,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inventory");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      if (data.syncing) {
        setSyncing(true);
        setLoading(false);
        setRetryCount((prev) => {
          const next = prev + 1;
          if (next < 20) {
            setTimeout(() => fetchInventory(), 15000);
          }
          return next;
        });
        return;
      }

      setSyncing(false);
      setRetryCount(0);
      setVehicles(data.vehicles || []);
      setSyncedAt(data.syncedAt);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Pre-compute features, fuel, price, and drivetrain for each vehicle
  const vehicleMeta = useMemo(() => {
    const meta = new Map<
      string,
      { features: string[]; fuel: string; price: number; drivetrain: string }
    >();
    for (const v of vehicles) {
      meta.set(v.vin, {
        features: getVehicleFeatures(v),
        fuel: getVehicleFuel(v),
        price: getVehiclePrice(v),
        drivetrain: getVehicleDrivetrain(v),
      });
    }
    return meta;
  }, [vehicles]);

  // Derived data
  const brandHierarchy = useMemo(() => buildBrandHierarchy(vehicles), [vehicles]);

  const availableBodyStyles = useMemo(() => {
    const styles = new Set<string>();
    for (const v of vehicles) {
      const bs = v.bodyStyle.toLowerCase();
      if (bs) styles.add(bs);
    }
    return Array.from(styles).sort();
  }, [vehicles]);

  const availableFuelTypes = useMemo(() => {
    const types = new Set<string>();
    for (const v of vehicles) {
      const meta = vehicleMeta.get(v.vin);
      if (meta) types.add(meta.fuel);
    }
    return Array.from(types);
  }, [vehicles, vehicleMeta]);

  const availableDrivetrains = useMemo(() => {
    const dts = new Set<string>();
    for (const v of vehicles) {
      const meta = vehicleMeta.get(v.vin);
      if (meta) dts.add(meta.drivetrain);
    }
    return Array.from(dts).sort();
  }, [vehicles, vehicleMeta]);

  const availableColors = useMemo(() => {
    const colors = new Map<string, number>();
    for (const v of vehicles) {
      const c = v.exteriorColor;
      if (c) colors.set(c, (colors.get(c) || 0) + 1);
    }
    // Sort by count descending
    return Array.from(colors.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color);
  }, [vehicles]);

  const newCount = useMemo(() => vehicles.filter((v) => v.type === "new").length, [vehicles]);
  const usedCount = useMemo(() => vehicles.filter((v) => v.type === "used").length, [vehicles]);

  // Apply filters
  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const meta = vehicleMeta.get(v.vin);
      if (!meta) return false;
      return matchesFilters(v, filters, meta.features, meta.fuel, meta.price, meta.drivetrain);
    });
  }, [vehicles, filters, vehicleMeta]);

  // Sort filtered results
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "price_asc":
        return arr.sort((a, b) => (vehicleMeta.get(a.vin)?.price ?? 0) - (vehicleMeta.get(b.vin)?.price ?? 0));
      case "price_desc":
        return arr.sort((a, b) => (vehicleMeta.get(b.vin)?.price ?? 0) - (vehicleMeta.get(a.vin)?.price ?? 0));
      case "mileage_asc":
        return arr.sort((a, b) => a.mileage - b.mileage);
      case "newest":
      default:
        return arr.sort((a, b) => b.year - a.year || (vehicleMeta.get(b.vin)?.price ?? 0) - (vehicleMeta.get(a.vin)?.price ?? 0));
    }
  }, [filtered, sortBy, vehicleMeta]);

  const activeFilterCount = countActiveFilters(filters);
  const filterChips = useMemo(() => buildFilterChips(filters), [filters]);

  const handleRemoveChip = useCallback(
    (chip: FilterChip) => {
      const cat = chip.category as keyof FilterState;
      if (cat === "type") {
        setFilters((prev) => ({ ...prev, type: "all" }));
      } else if (cat === "search") {
        setFilters((prev) => ({ ...prev, search: "" }));
      } else if (cat === "certifiedOnly") {
        setFilters((prev) => ({ ...prev, certifiedOnly: false }));
      } else {
        setFilters((prev) => {
          const arr = prev[cat] as string[];
          return { ...prev, [cat]: arr.filter((x) => x !== chip.key) };
        });
      }
    },
    []
  );

  const handleClearAll = useCallback(() => {
    setFilters({ ...EMPTY_FILTERS, type: defaultType });
  }, [defaultType]);

  // Dynamic title based on type
  const pageTitle = useMemo(() => {
    if (filters.type === "new") return t("titleNew");
    if (filters.type === "used") return t("titleUsed");
    return t("title");
  }, [filters.type, t]);

  // ─── Loading / syncing / error states ──────────────

  if (syncing) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        <p className="text-muted-foreground">
          Inventory is syncing for the first time (~2-3 min). Auto-refreshing...
        </p>
        <p className="text-xs text-muted-foreground">
          Attempt {retryCount} of 20
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        <p className="text-muted-foreground">Loading inventory from Fred Anderson Kia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-red-500">Failed to load inventory: {error}</p>
        <Button onClick={fetchInventory} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Retry
        </Button>
      </div>
    );
  }

  // ─── Filter sidebar content (reused in desktop + mobile) ──

  const filterContent = (
    <InventoryFilters
      filters={filters}
      onChange={setFilters}
      brandHierarchy={brandHierarchy}
      availableBodyStyles={availableBodyStyles}
      availableFuelTypes={availableFuelTypes}
      availableColors={availableColors}
      availableDrivetrains={availableDrivetrains}
      totalCount={vehicles.length}
      filteredCount={filtered.length}
      newCount={newCount}
      usedCount={usedCount}
      showCpoToggle={defaultType === "used"}
    />
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {pageTitle}
        </h1>
        <p className="text-muted-foreground">
          {vehicles.length} vehicles &middot; {newCount} new &middot; {usedCount} used
        </p>
        {syncedAt && (
          <p className="mt-1 text-xs text-muted-foreground">
            Last synced: {new Date(syncedAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Mobile: Filter button */}
      <div className="mb-4 lg:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters{activeFilterCount > 0 ? ` (${activeFilterCount} active)` : ""}</span>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-hidden flex flex-col">
            <SheetHeader>
              <SheetTitle>
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({activeFilterCount} active)
                  </span>
                )}
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {filterContent}
            </div>
            <SheetFooter>
              <div className="flex gap-2 w-full">
                {activeFilterCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="flex-1"
                  >
                    Clear All
                  </Button>
                )}
                <SheetClose className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600">
                  Show {filtered.length} vehicles
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active filter chips */}
      {filterChips.length > 0 && (
        <div className="mb-4">
          <FilterChips
            chips={filterChips}
            onRemove={handleRemoveChip}
            onClearAll={handleClearAll}
          />
        </div>
      )}

      {/* Results count + sort */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {vehicles.length} vehicles
        </p>
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearAll}
              className="hidden lg:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Clear All Filters
            </button>
          )}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Desktop: sidebar + grid layout */}
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          <div className="sticky top-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
            {filterContent}
          </div>
        </aside>

        {/* Vehicle grid */}
        <div className="flex-1 min-w-0">
          {sorted.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {sorted.map((vehicle) => {
                const meta = vehicleMeta.get(vehicle.vin);
                return (
                  <DealerVehicleCard
                    key={vehicle.vin}
                    vehicle={vehicle}
                    features={meta?.features}
                  />
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground mb-4">{t("noResults")}</p>
              {activeFilterCount > 0 && (
                <Button variant="outline" onClick={handleClearAll}>
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
