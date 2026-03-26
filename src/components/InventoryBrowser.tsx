"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getInventory } from "@/lib/inventory-data";
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export function InventoryBrowser() {
  const t = useTranslations("inventory");
  const locale = useLocale();
  const inventory = getInventory();

  const [filter, setFilter] = useState<"all" | "new" | "used">("all");
  const [search, setSearch] = useState("");
  const [bodyFilter, setBodyFilter] = useState<string>("all");

  const filtered = inventory.filter((v) => {
    if (filter !== "all" && v.type !== filter) return false;
    if (bodyFilter !== "all" && v.bodyStyle.toLowerCase() !== bodyFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        v.title.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const bodyStyles = [...new Set(inventory.map((v) => v.bodyStyle.toLowerCase()))];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {(["all", "new", "used"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? t("filterAll") : f === "new" ? t("filterNew") : t("filterUsed")}
            </Button>
          ))}
          {bodyStyles.map((bs) => (
            <Button
              key={bs}
              variant={bodyFilter === bs ? "default" : "outline"}
              size="sm"
              onClick={() => setBodyFilter(bodyFilter === bs ? "all" : bs)}
            >
              {bs.charAt(0).toUpperCase() + bs.slice(1)}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-muted-foreground">{t("noResults")}</p>
      )}
    </div>
  );
}
