import { DealerVehicle } from "./dealer-api";
import { Vehicle } from "./inventory-data";

// --- Price parsing ---

function parsePrice(dealer: DealerVehicle): number {
  const raw = dealer.salePrice || dealer.msrp || dealer.retailPrice || "0";
  return parseInt(raw.replace(/[$,]/g, "")) || 0;
}

function toBudgetTag(price: number): string {
  if (price < 20000) return "under_20k";
  if (price < 30000) return "20k_30k";
  if (price < 40000) return "30k_40k";
  return "over_40k";
}

// --- Fuel mapping ---

function toFuelTags(fuelType: string): string[] {
  const f = fuelType.toLowerCase();
  if (f.includes("plug")) return ["hybrid", "ev"];
  if (f.includes("electric")) return ["ev"];
  if (f.includes("hybrid")) return ["hybrid"];
  if (f.includes("gasoline") || f.includes("unleaded")) return ["gas"];
  return ["gas"];
}

function toFuelField(fuelType: string): "gas" | "hybrid" | "ev" {
  const f = fuelType.toLowerCase();
  if (f.includes("electric")) return "ev";
  if (f.includes("hybrid") || f.includes("plug")) return "hybrid";
  return "gas";
}

// --- Family size ---

const SEDAN_COMPACT = ["forte", "k4", "rio", "niro"];
const MID_SUV = ["sportage", "seltos", "tucson", "rav4", "cr-v"];
const THREE_ROW = ["telluride", "sorento", "carnival", "highlander", "pilot"];

function toFamilySizeTags(model: string, bodyStyle: string): string[] {
  const m = model.toLowerCase();
  const b = bodyStyle.toLowerCase();

  if (SEDAN_COMPACT.some((s) => m.includes(s))) return ["solo_couple"];
  if (m.includes("k5")) return ["solo_couple", "small_family"];
  if (MID_SUV.some((s) => m.includes(s))) return ["solo_couple", "small_family"];
  if (THREE_ROW.some((s) => m.includes(s))) return ["small_family", "large_family"];
  if (b.includes("truck")) return ["solo_couple"];

  // Fallback based on bodyStyle
  if (b.includes("sedan") || b.includes("coupe")) return ["solo_couple"];
  if (b.includes("suv") || b.includes("crossover")) return ["solo_couple", "small_family"];
  return ["solo_couple"];
}

// --- Driving environment ---

function toDrivingEnvTags(
  model: string,
  bodyStyle: string,
  fuelType: string
): string[] {
  const m = model.toLowerCase();
  const b = bodyStyle.toLowerCase();
  const isEV = fuelType.toLowerCase().includes("electric");

  // EV override
  if (isEV) return ["suburban", "highway"];

  // Large SUV
  if (m.includes("telluride") || m.includes("sorento"))
    return ["suburban", "rural"];

  // Truck
  if (b.includes("truck")) return ["rural", "highway"];

  // SUV
  if (b.includes("suv") || b.includes("crossover")) return ["suburban", "city"];

  // Sedan
  if (b.includes("sedan") || b.includes("coupe")) return ["city", "highway"];

  return ["city", "suburban"];
}

// --- Feel ---

const BASE_TRIMS = ["lx", "l", "le", "s", "lxs"];
const MID_TRIMS = ["ex", "se", "xle", "sel"];
const SPORT_TRIMS = ["gt-line", "gt", "sx turbo", "trd", "n line"];
const PREMIUM_TRIMS = ["sx", "sx prestige", "limited", "platinum"];

function toFeelTags(model: string, trim: string): string[] {
  const t = trim.toLowerCase();
  const m = model.toLowerCase();
  const tags: string[] = [];

  if (SPORT_TRIMS.some((s) => t.includes(s))) {
    tags.push("sporty");
  } else if (PREMIUM_TRIMS.some((s) => t === s || t.startsWith(s))) {
    tags.push("luxury");
  } else {
    tags.push("practical");
  }

  if (m.includes("telluride")) tags.push("rugged");

  return tags;
}

// --- Features ---

const KIA_BASE_FEATURES = [
  "apple_carplay",
  "android_auto",
  "backup_camera",
  "keyless_entry",
];

const TRIM_FEATURES: Record<string, string[]> = {
  lx: ["lane_assist", "blind_spot"],
  lxs: ["lane_assist", "blind_spot"],
  s: ["lane_assist", "blind_spot"],
  ex: [
    "heated_seats",
    "heated_steering",
    "wireless_charging",
    "power_liftgate",
    "adaptive_cruise",
  ],
  sx: [
    "cooled_seats",
    "sunroof",
    "leather",
    "premium_audio",
    "digital_dash",
    "parking_sensors",
    "remote_start",
    "ventilated_seats",
  ],
  "sx prestige": [
    "cooled_seats",
    "sunroof",
    "leather",
    "premium_audio",
    "digital_dash",
    "parking_sensors",
    "remote_start",
    "ventilated_seats",
  ],
  "gt-line": [
    "sunroof",
    "leather",
    "heated_seats",
    "premium_audio",
    "digital_dash",
    "adaptive_cruise",
  ],
  gt: [
    "sunroof",
    "leather",
    "heated_seats",
    "premium_audio",
    "digital_dash",
    "adaptive_cruise",
  ],
};

function toFeatureTags(
  make: string,
  model: string,
  trim: string,
  year: number
): string[] {
  const m = model.toLowerCase();
  const t = trim.toLowerCase();
  const isKia = make.toLowerCase() === "kia";

  // Non-Kia: conservative base features only
  if (!isKia) {
    const features = [...KIA_BASE_FEATURES];
    if (t.includes("awd") || t.includes("4wd") || t.includes("4x4")) {
      features.push("awd");
    }
    return features;
  }

  // Kia: start with base features (2024+ standard)
  const features = new Set<string>(KIA_BASE_FEATURES);

  // Add trim-level features
  for (const [trimKey, trimFeatures] of Object.entries(TRIM_FEATURES)) {
    if (t === trimKey || t.startsWith(trimKey + " ") || t.includes(trimKey)) {
      for (const f of trimFeatures) features.add(f);
    }
  }

  // Also add lower-tier features for higher trims
  if (t.includes("ex") || t.includes("sx") || t.includes("gt")) {
    features.add("lane_assist");
    features.add("blind_spot");
  }
  if (t.includes("sx")) {
    // SX gets EX features too
    features.add("heated_seats");
    features.add("heated_steering");
    features.add("wireless_charging");
    features.add("power_liftgate");
    features.add("adaptive_cruise");
  }

  // Model-specific features
  if (m.includes("telluride")) {
    features.add("third_row");
    features.add("tow_package");
    features.add("awd");
  }
  if (m.includes("sorento")) {
    features.add("third_row");
  }
  if (m.includes("carnival")) {
    features.add("third_row");
    features.add("power_liftgate");
  }
  if (m.includes("ev6") || m.includes("ev9")) {
    features.add("awd");
    features.add("digital_dash");
    features.add("adaptive_cruise");
  }
  // Sportage EX+
  if (
    m.includes("sportage") &&
    (t.includes("ex") || t.includes("sx") || t.includes("gt"))
  ) {
    features.add("awd");
  }

  return Array.from(features);
}

// --- Main mapping ---

export function mapDealerToQuizVehicle(dealer: DealerVehicle): Vehicle {
  const price = parsePrice(dealer);

  return {
    id: dealer.vin,
    title: `${dealer.year} ${dealer.make} ${dealer.model} ${dealer.trim}`,
    type: dealer.type,
    price,
    year: dealer.year,
    make: dealer.make,
    model: dealer.model,
    trim: dealer.trim,
    bodyStyle: dealer.bodyStyle,
    fuel: toFuelField(dealer.fuelType),
    mileage: dealer.mileage,
    photoUrls: dealer.images.map((img) => img.url),
    descriptionEn: "",
    descriptionKo: "",
    lifestyleTags: {
      budget: toBudgetTag(price),
      fuel: toFuelTags(dealer.fuelType),
      familySize: toFamilySizeTags(dealer.model, dealer.bodyStyle),
      drivingEnv: toDrivingEnvTags(
        dealer.model,
        dealer.bodyStyle,
        dealer.fuelType
      ),
      feel: toFeelTags(dealer.model, dealer.trim),
      features: toFeatureTags(
        dealer.make,
        dealer.model,
        dealer.trim,
        dealer.year
      ),
      commute: [],
    },
    status: "available",
    createdAt: dealer.syncedAt,
    updatedAt: dealer.syncedAt,
  };
}

export function mapDealerInventoryToQuiz(dealers: DealerVehicle[]): Vehicle[] {
  return dealers.map(mapDealerToQuizVehicle);
}
