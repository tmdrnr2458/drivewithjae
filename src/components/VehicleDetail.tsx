"use client";

import { useState, useEffect } from "react";
import { DealerVehicle } from "@/lib/dealer-api";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Phone,
  MessageCircle,
  Car,
  Loader2,
  X,
} from "lucide-react";

export function VehicleDetail({ vin }: { vin: string }) {
  const [vehicle, setVehicle] = useState<DealerVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/inventory");
        const data = await res.json();
        const found = (data.vehicles || []).find(
          (v: DealerVehicle) => v.vin === vin
        );
        setVehicle(found || null);
      } catch {
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [vin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <Car className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="mb-2 text-2xl font-bold">Vehicle Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          This vehicle may have been sold or is no longer available.
        </p>
        <Link
          href="/inventory"
          className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-sky-600"
        >
          Browse All Inventory
        </Link>
      </div>
    );
  }

  const images = vehicle.images;
  const hasImages = images.length > 0;
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;
  const priceNum = vehicle.salePrice
    ? parseInt(vehicle.salePrice.replace(/[$,]/g, ""))
    : vehicle.msrp
      ? parseInt(vehicle.msrp.replace(/[$,]/g, ""))
      : 0;
  const monthlyPayment = Math.round((priceNum / 1000) * 20);

  function nextImage() {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }
  function prevImage() {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <>
      {/* Lightbox */}
      {lightboxOpen && hasImages && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={images[currentImage].url}
            alt={images[currentImage].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            onClick={nextImage}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="absolute bottom-4 text-sm text-white/70">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Back button */}
        <Link
          href="/inventory"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Inventory
        </Link>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Photos */}
          <div className="lg:col-span-3">
            {/* Main image */}
            <div
              className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg bg-muted"
              onClick={() => {
                if (hasImages) setLightboxOpen(true);
              }}
            >
              {hasImages ? (
                <img
                  src={images[currentImage].url}
                  alt={images[currentImage].alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Car className="h-20 w-20 text-muted-foreground/30" />
                </div>
              )}
              {/* Type badge */}
              <span
                className={`absolute top-3 left-3 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white ${
                  vehicle.type === "new" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              >
                {vehicle.type === "new" ? "NEW" : "USED"}
              </span>
              {vehicle.certified && (
                <span className="absolute top-3 right-3 rounded-md bg-blue-500 px-3 py-1.5 text-xs font-bold text-white">
                  Certified Pre-Owned
                </span>
              )}
              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                    {currentImage + 1} / {images.length}
                  </div>
                </>
              )}
              {hasImages && (
                <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                  Click to enlarge
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                      i === currentImage
                        ? "border-sky-500"
                        : "border-transparent hover:border-sky-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="h-16 w-24 object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2">
            <h1 className="mb-1 text-2xl font-bold">{title}</h1>
            <p className="mb-4 text-sm text-muted-foreground">
              {vehicle.exteriorColor} · {vehicle.bodyStyle}
              {vehicle.mileage > 0 && ` · ${vehicle.mileage.toLocaleString()} miles`}
            </p>

            {/* Pricing card */}
            <Card className="mb-4">
              <CardContent className="p-4 space-y-2">
                {vehicle.msrp && vehicle.salePrice && vehicle.msrp !== vehicle.salePrice && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">MSRP</span>
                    <span className="line-through text-muted-foreground">{vehicle.msrp}</span>
                  </div>
                )}
                {vehicle.discounts.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-green-600">{d.label}</span>
                    <span className="font-medium text-green-600">-{d.value}</span>
                  </div>
                ))}
                {vehicle.incentives.map((inc, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-orange-600">{inc.label}</span>
                    <span className="font-medium text-orange-600">-{inc.value}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {vehicle.salePrice ? "Sale Price" : "Price"}
                  </span>
                  <span className="text-2xl font-bold text-sky-600">
                    {vehicle.salePrice || vehicle.retailPrice || vehicle.msrp || "Call"}
                  </span>
                </div>
                {priceNum > 0 && (
                  <p className="text-right text-xs text-muted-foreground">
                    Est. ~${monthlyPayment}/mo ($1,000 = $20/mo)
                  </p>
                )}
                {vehicle.type === "new" && (
                  <p className="text-xs text-blue-600 font-medium">
                    🎖️ Military & first responder discounts available — ask Jae!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Carfax */}
            {vehicle.hasCarfax && vehicle.carfaxUrl && (
              <a
                href={vehicle.carfaxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                {vehicle.carfaxIconUrl ? (
                  <img src={vehicle.carfaxIconUrl} alt="CARFAX" className="h-6" />
                ) : (
                  <span className="text-sm font-bold text-blue-600">CARFAX</span>
                )}
                <span className="text-sm">View Vehicle History Report</span>
                <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
              </a>
            )}

            {/* Specs */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <h3 className="mb-3 font-semibold">Vehicle Details</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Year</span>
                    <p className="font-medium">{vehicle.year}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Make</span>
                    <p className="font-medium">{vehicle.make}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Model</span>
                    <p className="font-medium">{vehicle.model}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Trim</span>
                    <p className="font-medium">{vehicle.trim || "—"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Body Style</span>
                    <p className="font-medium">{vehicle.bodyStyle}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Exterior</span>
                    <p className="font-medium">{vehicle.exteriorColor || "—"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Interior</span>
                    <p className="font-medium">{vehicle.interiorColor || "—"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Engine</span>
                    <p className="font-medium">{vehicle.engine || "—"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transmission</span>
                    <p className="font-medium">{vehicle.transmission || "—"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel Type</span>
                    <p className="font-medium">{vehicle.fuelType || "—"}</p>
                  </div>
                  {vehicle.mileage > 0 && (
                    <div>
                      <span className="text-muted-foreground">Mileage</span>
                      <p className="font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">VIN</span>
                    <p className="font-medium text-xs">{vehicle.vin}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stock #</span>
                    <p className="font-medium">{vehicle.stockNumber}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Condition</span>
                    <p className="font-medium">{vehicle.condition}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <div className="space-y-2">
              <Link
                href={`/contact?vehicle=${encodeURIComponent(title)}&vin=${vehicle.vin}`}
                className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-3 text-base font-medium text-white transition-colors hover:bg-sky-600"
              >
                Contact Jae About This Car
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+19842421715"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a
                  href="https://wa.me/19842421715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* View on dealer site */}
            {vehicle.dealerPageUrl && (
              <a
                href={vehicle.dealerPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                View on dealer website <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
