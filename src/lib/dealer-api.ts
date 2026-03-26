const SITE_ID = "fredandersonkia";
const API_URL = "https://www.kiaofraleigh.com/api/widget/ws-inv-data/getInventory";

const DISPLAY_ATTRS =
  "year,internetPrice,askingPrice,msrp,exteriorColor,interiorColor,transmission,engine,fuelType,odometer,stockNumber,vin,certified,incentives,trim,bodyStyle,model,make,images,carfaxUrl,carfaxIconUrl,hasCarFaxReport,daysOnLot";

const BROWSER_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Referer: "https://www.kiaofraleigh.com/",
  Origin: "https://www.kiaofraleigh.com",
  "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131"',
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
};

const KIA_MODELS = [
  "K4", "K5", "EV6", "EV9", "Forte", "Seltos",
  "Sportage", "Sportage Hybrid", "Sportage Plug-In Hybrid",
  "Sorento", "Sorento Hybrid", "Telluride",
  "Carnival", "Carnival Hybrid", "Niro",
];

const USED_MAKES = [
  "Kia", "Toyota", "Honda", "Hyundai", "Nissan", "Ford", "Chevrolet",
  "Jeep", "BMW", "Lexus", "Subaru", "Mercedes-Benz", "Mazda",
  "Volkswagen", "Ram", "GMC", "Dodge", "Acura", "Infiniti", "Audi",
  "Volvo", "Lincoln", "Cadillac", "Buick", "Chrysler", "Genesis",
  "Land Rover", "Porsche", "MINI", "Mitsubishi", "Fiat",
];

interface DealerRequestBody {
  siteId: string;
  locale: string;
  device: string;
  pageAlias: string;
  pageId: string;
  windowId: string;
  widgetName: string;
  inventoryParameters: Record<string, string>;
  preferences: Record<string, string>;
  includePricing: boolean;
  flags: Record<string, boolean>;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildNewCarsRequest(model?: string): DealerRequestBody {
  const inventoryParameters: Record<string, string> = {
    reset: "InventoryListing",
    make: "Kia",
  };
  if (model) {
    inventoryParameters.model = model;
  }

  return {
    siteId: SITE_ID,
    locale: "en_US",
    device: "DESKTOP",
    pageAlias: "INVENTORY_LISTING_DEFAULT_AUTO_NEW",
    pageId: `${SITE_ID}_SITEBUILDER_INVENTORY_SEARCH_RESULTS_AUTO_NEW_V1_1`,
    windowId: "inventory-data-bus2",
    widgetName: "ws-inv-data",
    inventoryParameters,
    preferences: {
      pageSize: "500",
      "listing.config.id": "auto-new",
      "required.display.sets": "TITLE,IMAGE_ALT,IMAGE_TITLE,PRICE,FEATURED_ITEMS",
      "required.display.attributes": DISPLAY_ATTRS,
      "image.count": "50",
      sorts: "internetPrice",
      sortsTitles: "PRICE",
    },
    includePricing: true,
    flags: { "ws-inv-data-use-wis": true },
  };
}

function buildUsedCarsRequest(make?: string, model?: string): DealerRequestBody {
  const inventoryParameters: Record<string, string> = {
    reset: "InventoryListing",
    accountId: "fredandersonkia&accountId=toyotaraleigh",
  };
  if (make) {
    inventoryParameters.make = make;
  }
  if (model) {
    inventoryParameters.model = model;
  }

  return {
    siteId: SITE_ID,
    locale: "en_US",
    device: "DESKTOP",
    pageAlias: "INVENTORY_LISTING_DEFAULT_AUTO_USED",
    pageId: `${SITE_ID}_SITEBUILDER_INVENTORY_SEARCH_RESULTS_AUTO_USED_V1_1`,
    windowId: "inventory-data-bus2",
    widgetName: "ws-inv-data",
    inventoryParameters,
    preferences: {
      pageSize: "500",
      "listing.config.id": "auto-used",
      "required.display.sets": "TITLE,IMAGE_ALT,IMAGE_TITLE,PRICE,FEATURED_ITEMS",
      "required.display.attributes": DISPLAY_ATTRS,
      "image.count": "50",
      sorts: "internetPrice",
      sortsTitles: "PRICE",
    },
    includePricing: true,
    flags: { "ws-inv-data-use-wis": true },
  };
}

export interface DealerVehicle {
  vin: string;
  stockNumber: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  bodyStyle: string;
  condition: string;
  type: "new" | "used";
  accountId: string;
  // Pricing
  msrp: string | null;
  salePrice: string | null;
  retailPrice: string | null;
  discounts: PriceItem[];
  incentives: PriceItem[];
  // Details
  mileage: number;
  exteriorColor: string;
  interiorColor: string;
  transmission: string;
  engine: string;
  fuelType: string;
  certified: boolean;
  daysOnLot: number;
  // Images — ALL photos from dealer
  images: VehicleImage[];
  // Carfax
  carfaxUrl: string | null;
  carfaxIconUrl: string | null;
  hasCarfax: boolean;
  // Links
  detailUrl: string | null;
  dealerPageUrl: string;
  // Meta
  syncedAt: string;
}

export interface PriceItem {
  label: string;
  value: string;
  type: string;
}

export interface VehicleImage {
  url: string;
  alt: string;
}

function getTrackingAttr(vehicle: any, name: string): string {
  const attrs = vehicle.trackingAttributes || [];
  const found = attrs.find((a: any) => a.name === name);
  return found?.value || "";
}

function getHighlightedAttr(vehicle: any, name: string): string {
  const attrs = vehicle.highlightedAttributes || [];
  const found = attrs.find((a: any) => a.name === name);
  return found?.value || "";
}

function getAttribute(vehicle: any, name: string): string {
  const attrs = vehicle.attributes || [];
  const found = attrs.find((a: any) => a.name === name);
  return found?.value || "";
}

function parseVehicle(raw: any, type: "new" | "used"): DealerVehicle {
  const pricing = raw.pricing || {};
  const dprice = pricing.dprice || [];

  const msrpItem = dprice.find((p: any) => p.typeClass === "msrp");
  const salePriceItem = dprice.find((p: any) => p.isFinalPrice);
  const discountItems = dprice.filter((p: any) => p.isDiscount);
  const incentiveItems = dprice.filter(
    (p: any) => p.type === "SICCI" || p.type === "INCENTIVE"
  );

  // Get ALL images — not just the first one
  const images: VehicleImage[] = (raw.images || [])
    .filter((img: any) => img.uri && !img.uri.includes("no-photo"))
    .map((img: any) => ({
      url: img.uri.startsWith("http")
        ? img.uri
        : `https://pictures.dealer.com${img.uri}`,
      alt: img.alt || `${raw.year} ${raw.make} ${raw.model}`,
    }));

  // Carfax — check both attributes and top-level
  let carfaxUrl = getAttribute(raw, "carfaxUrl") || null;
  let carfaxIconUrl = getAttribute(raw, "carfaxIconUrl") || null;
  let hasCarfax = getAttribute(raw, "hasCarFaxReport") === "true";
  if (raw.carfaxUrl) { carfaxUrl = raw.carfaxUrl; hasCarfax = true; }
  if (raw.carfaxIconUrl) carfaxIconUrl = raw.carfaxIconUrl;

  // Build dealer page URL
  const slug = raw.link || "";
  const dealerPageUrl = slug
    ? `https://www.kiaofraleigh.com${slug}`
    : `https://www.kiaofraleigh.com/${type === "new" ? "new" : "used"}/${raw.make}/${raw.year}-${raw.make}-${raw.model}-${raw.uuid || ""}.htm`;

  return {
    vin: raw.vin || "",
    stockNumber: raw.stockNumber || "",
    year: raw.year || 0,
    make: raw.make || "",
    model: raw.model || "",
    trim: raw.trim || "",
    bodyStyle: raw.bodyStyle || "",
    condition: raw.condition || (type === "new" ? "New" : "Pre-Owned"),
    type,
    accountId: raw.accountId || SITE_ID,
    msrp: msrpItem?.value || pricing.retailPrice || null,
    salePrice: salePriceItem?.value || null,
    retailPrice: pricing.retailPrice || null,
    discounts: discountItems.map((d: any) => ({
      label: d.label,
      value: d.value,
      type: d.typeClass,
    })),
    incentives: incentiveItems.map((i: any) => ({
      label: i.label,
      value: i.value,
      type: i.typeClass,
    })),
    mileage: parseInt(getTrackingAttr(raw, "odometer")) || 0,
    exteriorColor: getTrackingAttr(raw, "exteriorColor"),
    interiorColor: getTrackingAttr(raw, "interiorColor"),
    transmission: getTrackingAttr(raw, "transmission"),
    engine: getTrackingAttr(raw, "engine"),
    fuelType: getTrackingAttr(raw, "fuelType"),
    certified: raw.certified || false,
    daysOnLot: parseInt(getHighlightedAttr(raw, "daysOnLot")) || 0,
    images,
    carfaxUrl,
    carfaxIconUrl,
    hasCarfax,
    detailUrl: slug || null,
    dealerPageUrl,
    syncedAt: new Date().toISOString(),
  };
}

async function fetchWithRetry(body: DealerRequestBody, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: BROWSER_HEADERS,
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return res.json();
    }

    if (res.status === 403 && i < retries - 1) {
      // Rate limited — wait and retry
      await new Promise((r) => setTimeout(r, 5000 * (i + 1)));
      continue;
    }

    throw new Error(`Dealer API error: ${res.status} ${res.statusText}`);
  }
}

function dedupeByVin(vehicles: DealerVehicle[]): DealerVehicle[] {
  const seen = new Set<string>();
  return vehicles.filter((v) => {
    if (!v.vin || seen.has(v.vin)) return false;
    seen.add(v.vin);
    return true;
  });
}

export async function fetchNewCars(): Promise<DealerVehicle[]> {
  // API caps at 100 results per request, so fetch each model separately
  const allVehicles: DealerVehicle[] = [];

  for (const model of KIA_MODELS) {
    console.log(`[dealer-api] Fetching new Kia ${model}...`);
    try {
      const data = await fetchWithRetry(buildNewCarsRequest(model));
      const inventory = data.inventory || [];
      console.log(`[dealer-api] Got ${inventory.length} new ${model}`);
      const parsed = inventory.map((v: any) => parseVehicle(v, "new"));
      allVehicles.push(...parsed);
    } catch (err) {
      console.error(`[dealer-api] Failed to fetch new ${model}:`, err);
    }
    await delay(3000);
  }

  const deduped = dedupeByVin(allVehicles);
  console.log(`[dealer-api] Total new cars: ${deduped.length} (before dedupe: ${allVehicles.length})`);
  return deduped;
}

export async function fetchUsedCars(): Promise<DealerVehicle[]> {
  // API caps at 100 results per request, so fetch each make separately
  const allVehicles: DealerVehicle[] = [];

  for (const make of USED_MAKES) {
    console.log(`[dealer-api] Fetching used ${make}...`);
    try {
      const data = await fetchWithRetry(buildUsedCarsRequest(make));
      const inventory = data.inventory || [];
      console.log(`[dealer-api] Got ${inventory.length} used ${make}`);

      if (inventory.length >= 100) {
        // Hit the cap — sub-fetch by model to get all vehicles for this make
        console.log(`[dealer-api] ${make} hit 100 cap, sub-fetching by model...`);
        const models = new Set<string>(
          inventory.map((v: any) => v.model).filter(Boolean)
        );

        const subVehicles: any[] = [];
        for (const model of models) {
          await delay(3000);
          console.log(`[dealer-api] Fetching used ${make} ${model}...`);
          try {
            const subData = await fetchWithRetry(buildUsedCarsRequest(make, model));
            const subInventory = subData.inventory || [];
            console.log(`[dealer-api] Got ${subInventory.length} used ${make} ${model}`);
            subVehicles.push(...subInventory);
          } catch (err) {
            console.error(`[dealer-api] Failed to fetch used ${make} ${model}:`, err);
          }
        }
        // Use sub-fetched results instead of the capped initial results
        const parsed = subVehicles.map((v: any) => parseVehicle(v, "used"));
        allVehicles.push(...parsed);
      } else {
        const parsed = inventory.map((v: any) => parseVehicle(v, "used"));
        allVehicles.push(...parsed);
      }
    } catch (err) {
      console.error(`[dealer-api] Failed to fetch used ${make}:`, err);
    }
    await delay(3000);
  }

  // Client-side filter: only keep fredandersonkia and toyotaraleigh
  const filtered = allVehicles.filter(
    (v) =>
      v.accountId === "fredandersonkia" ||
      v.accountId === "toyotaraleigh"
  );

  const deduped = dedupeByVin(filtered);
  console.log(`[dealer-api] Total used cars: ${deduped.length} (before dedupe: ${filtered.length}, before filter: ${allVehicles.length})`);
  return deduped;
}

export async function fetchAllInventory(): Promise<{
  newCars: DealerVehicle[];
  usedCars: DealerVehicle[];
  syncedAt: string;
}> {
  // Fetch sequentially to avoid rate limiting
  const newCars = await fetchNewCars();
  // Delay between new and used fetches
  await delay(3000);
  const usedCars = await fetchUsedCars();

  return {
    newCars,
    usedCars,
    syncedAt: new Date().toISOString(),
  };
}
