"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-muted/30 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="mb-2 font-semibold">
              Drive with <span className="text-sky-500">Jae</span>
            </h3>
            <p className="text-sm text-muted-foreground">{t("location")}</p>
            <p className="text-sm text-muted-foreground">{t("hours")}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">{t("quickLinks")}</h3>
            <nav className="flex flex-col gap-1">
              <Link href="/inventory" className="text-sm text-muted-foreground hover:text-foreground">{t("inventory")}</Link>
              <Link href="/quiz" className="text-sm text-muted-foreground hover:text-foreground">{t("findYourCar")}</Link>
              <Link href="/guide" className="text-sm text-muted-foreground hover:text-foreground">{t("buyingGuide")}</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">{t("contact")}</Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">{t("contactTitle")}</h3>
            <p className="text-sm text-muted-foreground">
              <a href="tel:+19842421715" className="hover:text-foreground">984-242-1715</a>
            </p>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:sjae@anderson-auto.net" className="hover:text-foreground">sjae@anderson-auto.net</a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
