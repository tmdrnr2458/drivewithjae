"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Globe, User } from "lucide-react";

export default function HomePage() {
  const t = useTranslations();

  const values = [
    { icon: Shield, title: t("story.values.honest"), desc: t("story.values.honestDesc") },
    { icon: Heart, title: t("story.values.noPressure"), desc: t("story.values.noPressureDesc") },
    { icon: Globe, title: t("story.values.bilingual"), desc: t("story.values.bilingualDesc") },
    { icon: User, title: t("story.values.personal"), desc: t("story.values.personalDesc") },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sky-400">
                Fred Anderson Kia of Raleigh
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {t("hero.greeting")}
              </h1>
              <p className="mb-2 text-xl text-slate-300 sm:text-2xl">
                {t("hero.tagline")}
              </p>
              <p className="mb-8 text-lg text-slate-400">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-sky-600"
                >
                  {t("hero.cta")}
                </Link>
                <Link
                  href="/inventory"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-8 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-slate-700"
                >
                  {t("hero.ctaInventory")}
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-80 w-64 rounded-2xl bg-gradient-to-br from-sky-400/20 to-sky-600/20 p-1.5 lg:h-[28rem] lg:w-80">
                <img
                  src="/images/seungkook-jae.jpg"
                  alt="Seungkook Jae — Your honest car advisor"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("story.title")}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t("story.content")}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            {t("story.values.title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">{t("quiz.title")}</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            {t("quiz.subtitle")}
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-sky-600"
          >
            {t("quiz.start")}
          </Link>
        </div>
      </section>
    </div>
  );
}
