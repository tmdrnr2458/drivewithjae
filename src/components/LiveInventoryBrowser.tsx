"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { DealerVehicle } from "@/lib/dealer-api";
import { DealerVehicleCard } from "./DealerVehicleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, RefreshCw } from "lucide-react";

export function LiveInventoryBrowser() {
  const t = useTranslations("inventory");
  const [vehicles, setVehicles] = useState<DealerVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [filter, setFilter] = useState<"all" | "new" | "used">("all");
  const [search, setSearch] = useState("");
  const [bodyFilter, setBodyFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");

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

  const filtered = vehicles.filter((v) => {
    if (filter !== "all" && v.type !== filter) return false;
    if (bodyFilter !== "all" && v.bodyStyle.toLowerCase() !== bodyFilter) return false;
    if (modelFilter !== "all" && v.model.toLowerCase() !== modelFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        `${v.year} ${v.make} ${v.model} ${v.trim}`.toLowerCase().includes(q) ||
        v.vin.toLowerCase().includes(q) ||
        v.exteriorColor.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const bodyStyles = [...new Set(vehicles.map((v) => v.bodyStyle.toLowerCase()))].sort();
  const models = [...new Set(vehicles.map((v) => v.model.toLowerCase()))].sort();

  const newCount = vehicles.filter((v) => v.type === "new").length;
  const usedCount = vehicles.filter((v) => v.type === "used").length;

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">
          {vehicles.length} vehicles · {newCount} new · {usedCount} used
        </p>
        {syncedAt && (
          <p className="mt-1 text-xs text-muted-foreground">
            Last synced: {new Date(syncedAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        {/* Type filter */}
        <div className="flex flex-wrap gap-2">
          {(["all", "new", "used"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? `${t("filterAll")} (${vehicles.length})`
                : f === "new" ? `${t("filterNew")} (${newCount})`
                : `${t("filterUsed")} (${usedCount})`}
            </Button>
          ))}
        </div>

        {/* Model & body filters + search */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            <select
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="all">All Models</option>
              {models.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={bodyFilter}
              onChange={(e) => setBodyFilter(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="all">All Body Styles</option>
              {bodyStyles.map((bs) => (
                <option key={bs} value={bs}>
                  {bs.charAt(0).toUpperCase() + bs.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by model, color, VIN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {vehicles.length} vehicles
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((vehicle) => (
            <DealerVehicleCard key={vehicle.vin} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-muted-foreground">{t("noResults")}</p>
      )}
    </div>
  );
}
