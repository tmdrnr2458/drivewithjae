"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const vehicleParam = searchParams.get("vehicle") || "";
  const vinParam = searchParams.get("vin") || "";

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
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          language: formData.get("language"),
          message: formData.get("message"),
          appointment: formData.get("appointment") === "on",
          vehicle: vehicleParam,
          vin: vinParam,
          formType: "contact",
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Failed to send message. Please call or text me directly!");
    } finally {
      setSending(false);
    }
  }

  const contactMethods = [
    { icon: Phone, label: t("callMe"), href: "tel:+19842421715", detail: "984-242-1715", color: "bg-sky-500" },
    { icon: MessageCircle, label: t("textMe"), href: "sms:+19842421715", detail: "984-242-1715", color: "bg-green-500" },
    { icon: Mail, label: t("emailMe"), href: "mailto:sjae@anderson-auto.net", detail: "sjae@anderson-auto.net", color: "bg-violet-500" },
    { icon: MapPin, label: t("visitMe"), href: "https://maps.google.com/?q=Fred+Anderson+Kia+Raleigh", detail: "7001 Capital Blvd", color: "bg-rose-500" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Quick Contact Buttons */}
      <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {contactMethods.map((m) => (
          <a
            key={m.label}
            href={m.href}
            target={m.href.startsWith("http") ? "_blank" : undefined}
            rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors hover:bg-accent"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${m.color}`}>
              <m.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{m.label}</span>
            <span className="text-xs text-muted-foreground">{m.detail}</span>
          </a>
        ))}
      </div>

      {/* Vehicle context banner */}
      {vehicleParam && (
        <div className="mb-6 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm">
          Inquiring about: <strong>{vehicleParam}</strong>
          {vinParam && <span className="text-muted-foreground"> · VIN: {vinParam}</span>}
        </div>
      )}

      {/* Contact Form */}
      <Card>
        <CardContent className="p-6">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
              <p className="text-lg font-medium">{t("success")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                You can also text me directly at <a href="sms:+19842421715" className="font-medium text-sky-600">984-242-1715</a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">{t("name")} *</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="phone">{t("phone")} *</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" name="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="language">{t("language")}</Label>
                  <select
                    id="language"
                    name="language"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="en">English</option>
                    <option value="ko">한국어</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="message">{t("message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  defaultValue={vehicleParam ? `I'm interested in the ${vehicleParam}.` : ""}
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="appointment" name="appointment" className="h-4 w-4" />
                <Label htmlFor="appointment" className="text-sm font-normal">
                  {t("appointment")}
                </Label>
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-sky-500 text-white hover:bg-sky-600"
                disabled={sending}
              >
                {sending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                  t("submit")
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Address */}
      <div className="mt-8 text-center">
        <p className="whitespace-pre-line text-sm text-muted-foreground">{t("address")}</p>
      </div>
    </div>
  );
}
