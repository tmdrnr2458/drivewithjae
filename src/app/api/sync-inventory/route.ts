import { NextResponse } from "next/server";
import { syncInventory, saveToDisk } from "@/lib/inventory-cache";

export const maxDuration = 300; // 5 min max for Vercel

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (process.env.SYNC_SECRET && key !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await syncInventory();

    // Also save to disk for persistence across restarts
    await saveToDisk();

    return NextResponse.json({
      success: true,
      totalNew: data.totalNew,
      totalUsed: data.totalUsed,
      total: data.total,
      syncedAt: data.syncedAt,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Sync failed" },
      { status: 500 }
    );
  }
}
