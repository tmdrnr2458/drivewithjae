import { NextResponse } from "next/server";
import { getCachedInventory, isSyncing, syncInventory, loadFromDisk } from "@/lib/inventory-cache";

export const maxDuration = 300; // 5 min max for Vercel

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // Try memory cache first
  let data = getCachedInventory();

  // If no memory cache, try disk
  if (!data) {
    await loadFromDisk();
    data = getCachedInventory();
  }

  // If still no cache, check if already syncing
  if (!data && isSyncing()) {
    return NextResponse.json({
      vehicles: [],
      total: 0,
      syncedAt: null,
      syncing: true,
      message: "Inventory is syncing for the first time. This takes 2-3 minutes. Please refresh shortly.",
    });
  }

  // If no cache and not syncing, trigger background sync and return empty
  if (!data) {
    // Fire and forget — don't await
    syncInventory().catch(console.error);

    return NextResponse.json({
      vehicles: [],
      total: 0,
      syncedAt: null,
      syncing: true,
      message: "Inventory sync started. This takes 2-3 minutes. Please refresh shortly.",
    });
  }

  // We have cached data — return it instantly
  let vehicles = data.vehicles;
  if (type === "new") vehicles = data.newCars;
  if (type === "used") vehicles = data.usedCars;

  return NextResponse.json({
    vehicles,
    total: vehicles.length,
    syncedAt: data.syncedAt,
    syncing: false,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
