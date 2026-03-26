"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Upload, Loader2 } from "lucide-react";

export function TradeInForm() {
  const t = useTranslations("tradeIn");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name") || "Trade-In Customer",
          phone: formData.get("phone") || "",
          email: formData.get("email") || "",
          formType: "trade-in",
          tradeYear: formData.get("year"),
          tradeMake: formData.get("make"),
          tradeModel: formData.get("model"),
          tradeMileage: formData.get("mileage"),
          tradeVin: formData.get("vin"),
          condition: formData.get("condition"),
          notes: formData.get("notes"),
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Failed to submit. Please call or text me at 984-242-1715!");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card>
        <CardContent className="p-6">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
              <p className="text-lg font-medium">Submitted! I&apos;ll review and get back to you soon.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Want a faster response? Text me at <a href="sms:+19842421715" className="font-medium text-sky-600">984-242-1715</a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input id="email" name="email" type="email" />
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-3 font-semibold">Your Vehicle</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="vin">{t("vin")}</Label>
                  <Input id="vin" name="vin" placeholder="e.g. 1HGBH41JXMN109186" />
                </div>
                <div>
                  <Label htmlFor="year">{t("year")} *</Label>
                  <Input id="year" name="year" type="number" required min={1990} max={2027} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="make">{t("make")} *</Label>
                  <Input id="make" name="make" required placeholder="e.g. Toyota" />
                </div>
                <div>
                  <Label htmlFor="model">{t("model")} *</Label>
                  <Input id="model" name="model" required placeholder="e.g. Camry" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="mileage">{t("mileage")} *</Label>
                  <Input id="mileage" name="mileage" type="number" required />
                </div>
                <div>
                  <Label htmlFor="condition">{t("condition")} *</Label>
                  <select
                    id="condition"
                    name="condition"
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="">{t("condition")}</option>
                    <option value="excellent">{t("conditionExcellent")}</option>
                    <option value="good">{t("conditionGood")}</option>
                    <option value="fair">{t("conditionFair")}</option>
                    <option value="poor">{t("conditionPoor")}</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="photos">{t("photos")}</Label>
                <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8">
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{t("photosHint")}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Or text photos directly to <a href="sms:+19842421715" className="font-medium text-sky-600">984-242-1715</a>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">{t("notes")}</Label>
                <Textarea id="notes" name="notes" rows={3} />
              </div>
              <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-sky-500 text-white hover:bg-sky-600"
                disabled={sending}
              >
                {sending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                ) : (
                  t("submit")
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
