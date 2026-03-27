"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/inventory/new", label: t("inventoryNew") },
    { href: "/inventory/used", label: t("inventoryUsed") },
    { href: "/quiz", label: t("quiz") },
    { href: "/guide", label: t("guide") },
    { href: "/financing", label: t("financing") },
    { href: "/trade-in", label: t("tradeIn") },
    { href: "/contact", label: t("contact") },
  ];

  function toggleLocale() {
    const newLocale = locale === "en" ? "ko" : "en";
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            Drive with <span className="text-sky-500">Jae</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleLocale}
            className="ml-2 flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <Globe className="h-4 w-4" />
            {locale === "en" ? "한국어" : "English"}
          </button>
        </nav>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 rounded-md border px-2 py-1.5 text-sm"
          >
            <Globe className="h-4 w-4" />
            {locale === "en" ? "KO" : "EN"}
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent ${
                      pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
