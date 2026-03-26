import { DealerVehicle, fetchAllInventory } from "./dealer-api";

interface InventoryCache {
  vehicles: DealerVehicle[];
  newCars: DealerVehicle[];
  usedCars: DealerVehicle[];
  syncedAt: string;
  totalNew: number;
  totalUsed: number;
  total: number;
}

let cache: InventoryCache | null = null;
let syncing = false;

export function getCachedInventory(): InventoryCache | null {
  return cache;
}

export function isSyncing(): boolean {
  return syncing;
}

export async function syncInventory(): Promise<InventoryCache> {
  if (syncing) {
    // Already syncing — wait for it or return current cache
    if (cache) return cache;
    // No cache yet, wait for sync to complete (poll)
    while (syncing) {
      await new Promise(r => setTimeout(r, 2000));
      if (cache) return cache;
    }
    return cache!;
  }

  syncing = true;
  try {
    console.log("[inventory-cache] Starting sync...");
    const { newCars, usedCars, syncedAt } = await fetchAllInventory();
    const vehicles = [...newCars, ...usedCars];

    cache = {
      vehicles,
      newCars,
      usedCars,
      syncedAt,
      totalNew: newCars.length,
      totalUsed: usedCars.length,
      total: vehicles.length,
    };

    console.log(`[inventory-cache] Sync complete: ${cache.total} vehicles (${cache.totalNew} new, ${cache.totalUsed} used)`);
    return cache;
  } finally {
    syncing = false;
  }
}

// Try to load from filesystem cache on startup
export async function loadFromDisk(): Promise<boolean> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "src", "data", "inventory.json");
    const data = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);
    if (parsed.vehicles && parsed.vehicles.length > 0) {
      cache = parsed;
      console.log(`[inventory-cache] Loaded ${cache!.total} vehicles from disk cache`);
      return true;
    }
  } catch {
    // No disk cache, that's OK
  }
  return false;
}

export async function saveToDisk(): Promise<void> {
  if (!cache) return;
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const dirPath = path.join(process.cwd(), "src", "data");
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(
      path.join(dirPath, "inventory.json"),
      JSON.stringify(cache, null, 2)
    );
    console.log("[inventory-cache] Saved to disk");
  } catch (err) {
    console.error("[inventory-cache] Failed to save to disk:", err);
  }
}
