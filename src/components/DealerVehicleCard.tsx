"use client";

import { DealerVehicle } from "@/lib/dealer-api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Car, ExternalLink } from "lucide-react";

// Human-readable feature labels (same as VehicleCard)
const FEATURE_LABELS: Record<string, string> = {
  apple_carplay: "CarPlay",
  android_auto: "Android Auto",
  heated_seats: "Heated Seats",
  cooled_seats: "Cooled Seats",
  heated_steering: "Heated Wheel",
  sunroof: "Sunroof",
  leather: "Leather",
  awd: "AWD",
  backup_camera: "Backup Cam",
  blind_spot: "Blind Spot",
  lane_assist: "Lane Assist",
  adaptive_cruise: "Smart Cruise",
  parking_sensors: "Park Sensors",
  remote_start: "Remote Start",
  keyless_entry: "Push Start",
  wireless_charging: "Wireless Charge",
  premium_audio: "Premium Audio",
  third_row: "3rd Row",
  tow_package: "Tow Package",
  roof_rack: "Roof Rack",
  heads_up: "Heads-Up",
  digital_dash: "Digital Dash",
  power_liftgate: "Power Liftgate",
  ventilated_seats: "Ventilated Seats",
};

export function DealerVehicleCard({ vehicle, features, matchedFeatures }: { vehicle: DealerVehicle; features?: string[]; matchedFeatures?: string[] }) {
  const hasImages = vehicle.images.length > 0;
  const mainImage = hasImages ? vehicle.images[0] : null;

  // Parse price number from string like "$22,687"
  const priceNum = vehicle.salePrice
    ? parseInt(vehicle.salePrice.replace(/[$,]/g, ""))
    : vehicle.msrp
      ? parseInt(vehicle.msrp.replace(/[$,]/g, ""))
      : 0;
  const monthlyPayment = Math.round((priceNum / 1000) * 20);

  const hasDiscount = vehicle.discounts.length > 0;
  const hasIncentives = vehicle.incentives.length > 0;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image — links to detail page */}
      <Link href={`/inventory/${vehicle.vin}`} className="block relative aspect-[16/10] bg-muted">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Car className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
        {/* Type badge */}
        <span
          className={`absolute top-2 left-2 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white ${
            vehicle.type === "new" ? "bg-emerald-500" : "bg-amber-500"
          }`}
        >
          {vehicle.type === "new" ? "NEW" : "USED"}
        </span>
        {/* Certified badge */}
        {vehicle.certified && (
          <span className="absolute top-2 right-2 rounded-md bg-blue-500 px-2 py-1 text-xs font-bold text-white">
            CPO
          </span>
        )}
        {/* Image count */}
        {vehicle.images.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
            {vehicle.images.length} photos
          </span>
        )}
      </Link>

      <CardContent className="p-4">
        {/* Title */}
        <Link href={`/inventory/${vehicle.vin}`} className="hover:text-sky-600 transition-colors">
          <h3 className="mb-1 font-semibold leading-tight">
            {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
          </h3>
        </Link>

        {/* Color & details */}
        <p className="mb-2 text-xs text-muted-foreground">
          {vehicle.exteriorColor}
          {vehicle.mileage > 0 && ` · ${vehicle.mileage.toLocaleString()} mi`}
          {vehicle.engine && ` · ${vehicle.engine}`}
        </p>

        {/* Pricing */}
        <div className="mb-3 space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xl font-bold text-sky-600">
              {vehicle.salePrice || vehicle.retailPrice || vehicle.msrp || "Call for Price"}
            </span>
            {priceNum > 0 && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                ~${monthlyPayment.toLocaleString()}/mo
              </span>
            )}
          </div>
          {vehicle.msrp && vehicle.salePrice && vehicle.msrp !== vehicle.salePrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground line-through">
                {vehicle.msrp}
              </span>
              <span className="text-xs font-medium text-emerald-600">Save {(() => {
                const msrpNum = parseInt(vehicle.msrp!.replace(/[$,]/g, "")) || 0;
                const saleNum = parseInt(vehicle.salePrice!.replace(/[$,]/g, "")) || 0;
                const diff = msrpNum - saleNum;
                return diff > 0 ? `$${diff.toLocaleString()}` : "";
              })()}</span>
            </div>
          )}
        </div>

        {/* Discounts & Rebates */}
        {(hasDiscount || hasIncentives) && (
          <div className="mb-2 space-y-0.5">
            {vehicle.discounts.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-green-600 font-medium">{d.label}</span>
                <span className="text-green-600 font-bold">-{d.value}</span>
              </div>
            ))}
            {vehicle.incentives.map((inc, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-orange-600 font-medium">{inc.label}</span>
                <span className="text-orange-600 font-bold">-{inc.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Military discount note for new cars */}
        {vehicle.type === "new" && (
          <p className="mb-2 text-xs text-blue-600 font-medium">
            🎖️ Military discount available — ask Jae!
          </p>
        )}

        {/* Carfax for used */}
        {vehicle.type === "used" && vehicle.hasCarfax && vehicle.carfaxUrl && (
          <a
            href={vehicle.carfaxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            View CARFAX Report <ExternalLink className="h-3 w-3" />
          </a>
        )}

        {/* Features */}
        {features && features.length > 0 && (() => {
          const matchedSet = new Set(matchedFeatures ?? []);
          // Sort so matched features appear first
          const sorted = [...features].sort((a, b) => {
            const aMatch = matchedSet.has(a) ? 0 : 1;
            const bMatch = matchedSet.has(b) ? 0 : 1;
            return aMatch - bMatch;
          });
          return (
            <div className="mb-2 flex flex-wrap gap-1">
              {sorted.slice(0, 6).map((tag) => (
                <Badge
                  key={tag}
                  variant={matchedSet.has(tag) ? "default" : "outline"}
                  className={
                    matchedSet.has(tag)
                      ? "bg-sky-500 text-white text-xs hover:bg-sky-500"
                      : "text-xs"
                  }
                >
                  {FEATURE_LABELS[tag] || tag.replace(/_/g, " ")}
                </Badge>
              ))}
              {sorted.length > 6 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{sorted.length - 6} more
                </Badge>
              )}
            </div>
          );
        })()}

        {/* Stock # and VIN */}
        <p className="mb-3 text-xs text-muted-foreground">
          Stock #{vehicle.stockNumber} · VIN: {vehicle.vin.slice(-8)}
        </p>

        {/* CTA */}
        <Link
          href={`/contact?vehicle=${encodeURIComponent(`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`)}&vin=${vehicle.vin}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
        >
          Contact About This Car
        </Link>
      </CardContent>
    </Card>
  );
}
