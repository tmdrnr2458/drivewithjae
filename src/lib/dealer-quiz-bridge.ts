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
  if (f === "none" || f === "") return ["gas"];
  if (f.includes("bev") || f.includes("battery electric")) return ["ev"];
  if (f.includes("plug")) return ["hybrid", "ev"];
  if (f.includes("electric")) return ["ev"];
  if (f.includes("mhev")) return ["hybrid"];
  if (f.includes("hybrid")) return ["hybrid"];
  return ["gas"];
}

function toFuelField(fuelType: string): "gas" | "hybrid" | "ev" {
  const f = fuelType.toLowerCase();
  if (f === "none" || f === "") return "gas";
  if (f.includes("bev") || f.includes("battery electric")) return "ev";
  if (f.includes("electric")) return "ev";
  if (f.includes("mhev")) return "hybrid";
  if (f.includes("hybrid") || f.includes("plug")) return "hybrid";
  return "gas";
}

// --- Family size ---

const THREE_ROW_MODELS = [
  "telluride", "sorento", "carnival",
  "highlander", "grand highlander", "sequoia", "sienna",
  "pilot", "odyssey",
  "palisade",
  "pathfinder",
  "tahoe", "suburban", "traverse", "equinox ev",
  "atlas",
  "cx-90", "cx-9",
  "ascent",
  "grand cherokee l", "wagoneer", "grand wagoneer",
  "expedition", "explorer",
  "durango",
  "enclave",
  "x7",
  "gx", "lx", "tx",
];

function toFamilySizeTags(model: string, bodyStyle: string): string[] {
  const m = model.toLowerCase();
  const b = bodyStyle.toLowerCase();

  if (THREE_ROW_MODELS.some((s) => m.includes(s))) return ["small_family", "large_family"];
  if (b.includes("minivan") || b.includes("van")) return ["small_family", "large_family"];
  if (b.includes("truck")) return ["solo_couple", "small_family"];
  if (b.includes("sedan") || b.includes("coupe") || b.includes("hatchback")) return ["solo_couple"];

  // Mid-size SUVs
  if (b.includes("suv") || b.includes("crossover")) return ["solo_couple", "small_family"];
  return ["solo_couple"];
}

// --- Driving environment ---

function toDrivingEnvTags(model: string, bodyStyle: string, fuelType: string): string[] {
  const m = model.toLowerCase();
  const b = bodyStyle.toLowerCase();
  const isEV = fuelType.toLowerCase().includes("electric") || fuelType.toLowerCase().includes("bev");

  if (isEV) return ["suburban", "highway"];
  if (THREE_ROW_MODELS.some((s) => m.includes(s))) return ["suburban", "rural"];
  if (b.includes("truck")) return ["rural", "highway"];
  if (b.includes("suv") || b.includes("crossover")) return ["suburban", "city"];
  if (b.includes("sedan") || b.includes("coupe")) return ["city", "highway"];
  return ["city", "suburban"];
}

// --- Feel ---

function toFeelTags(model: string, trim: string): string[] {
  const t = trim.toLowerCase();
  const m = model.toLowerCase();
  const tags: string[] = [];

  // Sport trims
  if (
    t.includes("gt-line") || t.includes("gt ") || t === "gt" ||
    t.includes("turbo") || t.includes("trd") || t.includes("n line") ||
    t.includes("sport") || t.includes("se ") || t.includes("xse") ||
    t.includes("type r") || t.includes("si") || t.includes("nismo")
  ) {
    tags.push("sporty");
  }
  // Premium trims
  else if (
    t.includes("sx") || t.includes("prestige") || t.includes("limited") ||
    t.includes("platinum") || t.includes("premium") || t.includes("touring") ||
    t.includes("denali") || t.includes("calligraphy") || t.includes("pinnacle")
  ) {
    tags.push("luxury");
  }
  // Everything else
  else {
    tags.push("practical");
  }

  if (m.includes("telluride") || m.includes("4runner") || m.includes("wrangler") || m.includes("bronco")) {
    tags.push("rugged");
  }

  return tags;
}

// ============================================================
// FEATURE MAPPING — comprehensive trim-level lookup
// ============================================================

// Universal base features (most 2020+ cars)
const UNIVERSAL_BASE = ["backup_camera", "keyless_entry"];

// Kia base (all 2024+ Kia models)
const KIA_BASE = [...UNIVERSAL_BASE, "apple_carplay", "android_auto", "lane_assist", "blind_spot"];

// Trim tier definitions — cumulative (higher tiers include lower)
const KIA_TIER_BASE = [] as string[]; // LX, L — already covered by KIA_BASE
const KIA_TIER_MID = ["heated_seats", "heated_steering", "wireless_charging", "adaptive_cruise", "remote_start"];
const KIA_TIER_UPPER = [...KIA_TIER_MID, "sunroof", "leather", "power_liftgate", "premium_audio", "digital_dash", "parking_sensors"];
const KIA_TIER_TOP = [...KIA_TIER_UPPER, "cooled_seats", "ventilated_seats", "heads_up"];

// Kia trim → tier mapping
function kiaFeatureTier(trim: string): string[] {
  const t = trim.toLowerCase();

  // Top tier — must come before upper so "prestige" variants don't fall through
  if (t.includes("sx prestige") || t.includes("sx-p") || t.includes("prestige") ||
      t.includes("gt ") || t === "gt" ||
      t.includes("gt-line turbo") || t.includes("wolf")) {
    return KIA_TIER_TOP;
  }
  // Upper tier
  if (t.includes("sx") || t.includes("gt-line") || t.includes("x-line") ||
      t.includes("x-pro") || t.includes("land")) {
    return KIA_TIER_UPPER;
  }
  // Mid tier
  if (t.includes("ex") || t.includes("ex premium") || t.includes("wind") ||
      t.includes("sel") || t.includes("s ") || t === "s" || t.includes("light")) {
    return KIA_TIER_MID;
  }
  // Base tier
  return KIA_TIER_BASE;
}

// Model-specific features
function kiaModelFeatures(model: string): string[] {
  const m = model.toLowerCase();
  const features: string[] = [];

  if (m.includes("telluride")) { features.push("third_row", "tow_package", "awd", "roof_rack"); }
  if (m.includes("sorento")) { features.push("third_row", "awd"); }
  if (m.includes("carnival")) { features.push("third_row", "power_liftgate"); }
  if (m.includes("ev6")) { features.push("awd", "digital_dash", "adaptive_cruise"); }
  if (m.includes("ev9")) { features.push("awd", "digital_dash", "adaptive_cruise", "third_row"); }
  if (m.includes("sportage") || m.includes("seltos")) { features.push("awd"); }

  return features;
}

// Toyota trim → features
function toyotaFeatures(model: string, trim: string): string[] {
  const t = trim.toLowerCase();
  const m = model.toLowerCase();
  const features: string[] = [...UNIVERSAL_BASE, "apple_carplay", "android_auto"];

  // Safety (standard on most 2020+ Toyota)
  features.push("lane_assist", "adaptive_cruise", "blind_spot");

  // Trim tiers
  if (t.includes("limited") || t.includes("platinum") || t.includes("nightshade") || t.includes("trd pro")) {
    features.push("heated_seats", "cooled_seats", "leather", "sunroof", "premium_audio",
      "digital_dash", "wireless_charging", "power_liftgate", "parking_sensors", "remote_start",
      "heated_steering", "ventilated_seats");
  } else if (t.includes("xle") || t.includes("xse") || t.includes("se") || t.includes("xle premium") ||
             t.includes("adventure") || t.includes("sr5") ||
             (t.includes("trd") && !t.includes("trd pro"))) {
    features.push("heated_seats", "sunroof", "wireless_charging", "remote_start", "heated_steering");
  } else if (t.includes("le") || t.includes("l ") || t === "l") {
    // base — just safety features above
  }

  // Adventure extras
  if (t.includes("adventure")) features.push("roof_rack", "awd");

  // TRD
  if (t.includes("trd")) features.push("roof_rack");

  // Model-specific
  if (m.includes("highlander") || m.includes("sequoia") || m.includes("sienna")) features.push("third_row");
  if (m.includes("4runner") || m.includes("tacoma") || m.includes("tundra")) {
    features.push("awd", "tow_package", "roof_rack");
  }
  if (m.includes("rav4") || m.includes("venza") || m.includes("highlander")) features.push("awd");
  if (m.includes("prius") || m.includes("camry hybrid") || m.includes("rav4 hybrid")) {
    // hybrid already handled by fuel type
  }

  return features;
}

// Honda trim → features
function hondaFeatures(model: string, trim: string): string[] {
  const t = trim.toLowerCase();
  const features: string[] = [...UNIVERSAL_BASE, "apple_carplay", "android_auto", "lane_assist", "adaptive_cruise"];

  if (t.includes("touring") || t.includes("elite") || t.includes("type r") ||
      t.includes("rtl") || t.includes("black edition")) {
    features.push("heated_seats", "cooled_seats", "leather", "sunroof", "premium_audio",
      "wireless_charging", "power_liftgate", "parking_sensors", "blind_spot", "digital_dash",
      "heated_steering", "remote_start");
  } else if (t.includes("ex-l") || t.includes("exl") || t.includes("ex ") || t === "ex") {
    features.push("heated_seats", "sunroof", "leather", "blind_spot", "wireless_charging", "remote_start");
  } else if (t.includes("sport")) {
    features.push("heated_seats", "blind_spot", "remote_start");
  }

  const m = model.toLowerCase();
  if (m.includes("pilot") || m.includes("odyssey")) features.push("third_row");
  if (m.includes("cr-v") || m.includes("pilot") || m.includes("passport")) features.push("awd");

  return features;
}

// Hyundai trim → features
function hyundaiFeatures(model: string, trim: string): string[] {
  const t = trim.toLowerCase();
  const features: string[] = [...UNIVERSAL_BASE, "apple_carplay", "android_auto", "lane_assist", "blind_spot", "adaptive_cruise"];

  if (t.includes("limited") || t.includes("calligraphy")) {
    features.push("heated_seats", "cooled_seats", "leather", "sunroof", "premium_audio",
      "digital_dash", "wireless_charging", "power_liftgate", "parking_sensors",
      "remote_start", "heated_steering", "ventilated_seats", "heads_up");
  } else if (t.includes("sel") || t.includes("se") || t.includes("xrt")) {
    features.push("heated_seats", "sunroof", "wireless_charging", "remote_start");
  } else if (t.includes("n line") || t.includes("n ")) {
    features.push("heated_seats", "sunroof", "leather", "premium_audio", "digital_dash");
  }

  const m = model.toLowerCase();
  if (m.includes("palisade")) features.push("third_row", "awd", "tow_package");
  if (m.includes("tucson") || m.includes("santa")) features.push("awd");

  return features;
}

// Generic features for all other makes
function genericFeatures(model: string, trim: string, year: number): string[] {
  const t = trim.toLowerCase();
  const m = model.toLowerCase();
  const features: string[] = [...UNIVERSAL_BASE];

  // Most 2018+ cars have CarPlay/Android Auto
  if (year >= 2018) {
    features.push("apple_carplay", "android_auto");
  }
  // Most 2020+ have safety features
  if (year >= 2020) {
    features.push("lane_assist", "blind_spot", "adaptive_cruise");
  }

  // AWD inference from trim name
  if (t.includes("awd") || t.includes("4wd") || t.includes("4x4") ||
      t.includes("4matic") || t.includes("xdrive") || t.includes("quattro") ||
      t.includes("sh-awd") || t.includes("symmetrical")) {
    features.push("awd");
  }

  // Premium trim inference
  if (t.includes("limited") || t.includes("platinum") || t.includes("touring") ||
      t.includes("prestige") || t.includes("ultimate") || t.includes("pinnacle") ||
      t.includes("denali") || t.includes("overland") ||
      t.includes("lariat") || t.includes("high country") || t.includes("laramie") ||
      t.includes("slt") || t.includes("king ranch")) {
    features.push("heated_seats", "cooled_seats", "leather", "sunroof",
      "premium_audio", "wireless_charging", "power_liftgate", "parking_sensors",
      "remote_start", "heated_steering", "digital_dash");
  }
  // Mid trim inference
  else if (t.includes("sel") || t.includes("xle") || t.includes("ex") ||
           t.includes("sport") || t.includes("preferred") || t.includes("premium") ||
           t.includes("sv") || t.includes("sxt") || t.includes("big horn") || t.includes("lone star")) {
    features.push("heated_seats", "remote_start");
  }

  // SUV with 3 rows
  if (THREE_ROW_MODELS.some((s) => m.includes(s))) {
    features.push("third_row");
  }

  // Truck features
  if (m.includes("tacoma") || m.includes("tundra") || m.includes("frontier") ||
      m.includes("f-150") || m.includes("silverado") || m.includes("ram") ||
      m.includes("colorado") || m.includes("ranger") || m.includes("ridgeline")) {
    features.push("tow_package");
  }

  return features;
}

// === MAIN FEATURE FUNCTION ===

function toFeatureTags(make: string, model: string, trim: string, year: number): string[] {
  const mk = make.toLowerCase();
  const features = new Set<string>();

  let rawFeatures: string[];

  if (mk === "kia") {
    rawFeatures = [...KIA_BASE, ...kiaFeatureTier(trim), ...kiaModelFeatures(model)];
  } else if (mk === "toyota") {
    rawFeatures = toyotaFeatures(model, trim);
  } else if (mk === "honda") {
    rawFeatures = hondaFeatures(model, trim);
  } else if (mk === "hyundai" || mk === "genesis") {
    rawFeatures = hyundaiFeatures(model, trim);
  } else if (mk === "lexus") {
    // Lexus = premium Toyota
    rawFeatures = toyotaFeatures(model, trim);
    rawFeatures.push("leather", "premium_audio", "heated_seats", "cooled_seats");
  } else if (mk === "acura") {
    // Acura = premium Honda
    rawFeatures = hondaFeatures(model, trim);
    rawFeatures.push("leather", "premium_audio", "heated_seats");
  } else if (mk === "bmw" || mk === "mercedes-benz" || mk === "audi" ||
             mk === "genesis" || mk === "lincoln" || mk === "cadillac") {
    // Luxury makes — generic base + luxury defaults
    rawFeatures = genericFeatures(model, trim, year);
    rawFeatures.push("leather", "premium_audio", "heated_seats");
  } else {
    rawFeatures = genericFeatures(model, trim, year);
  }

  for (const f of rawFeatures) features.add(f);

  // Subaru — always AWD (Symmetrical AWD standard on all models)
  if (mk === "subaru") features.add("awd");
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
      drivingEnv: toDrivingEnvTags(dealer.model, dealer.bodyStyle, dealer.fuelType),
      feel: toFeelTags(dealer.model, dealer.trim),
      features: toFeatureTags(dealer.make, dealer.model, dealer.trim, dealer.year),
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
