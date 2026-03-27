"use client";

import { Vehicle } from "@/lib/inventory-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Car } from "lucide-react";

// Human-readable feature labels
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

export function VehicleCard({ vehicle, locale }: { vehicle: Vehicle; locale: string }) {
  const description = locale === "ko" ? vehicle.descriptionKo : vehicle.descriptionEn;
  const features = vehicle.lifestyleTags.features;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] bg-muted flex items-center justify-center">
        <Car className="h-16 w-16 text-muted-foreground/30" />
        <span
          className={`absolute top-2 left-2 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white ${
            vehicle.type === "new" ? "bg-emerald-500" : "bg-amber-500"
          }`}
        >
          {vehicle.type === "new" ? "NEW" : "USED"}
        </span>
        {vehicle.mileage > 0 && (
          <span className="absolute top-2 right-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
            {vehicle.mileage.toLocaleString()} mi
          </span>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 font-semibold leading-tight">{vehicle.title}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-lg font-bold text-sky-600">
            ${vehicle.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">
            ~${Math.round(vehicle.price / 1000 * 20).toLocaleString()}/mo
          </span>
        </div>
        <div className="mb-3 flex flex-wrap gap-1">
          {features.slice(0, 6).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {FEATURE_LABELS[tag] || tag.replace(/_/g, " ")}
            </Badge>
          ))}
          {features.length > 6 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{features.length - 6} more
            </Badge>
          )}
        </div>
        <Link
          href={`/contact?vehicle=${encodeURIComponent(vehicle.title)}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
        >
          Contact About This Car
        </Link>
      </CardContent>
    </Card>
  );
}
