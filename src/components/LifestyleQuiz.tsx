"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getQuizResults, QuizAnswers } from "@/lib/quiz-scoring";
import { mapDealerInventoryToQuiz } from "@/lib/dealer-quiz-bridge";
import { DealerVehicle } from "@/lib/dealer-api";
import { Vehicle } from "@/lib/inventory-data";
import { DealerVehicleCard } from "./DealerVehicleCard";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, Sparkles, Check, Loader2 } from "lucide-react";

const QUESTION_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const;
const ANSWER_KEYS = ["a1", "a2", "a3", "a4"] as const;

const FEATURE_KEYS = [
  "apple_carplay", "android_auto", "heated_seats", "cooled_seats",
  "heated_steering", "sunroof", "leather", "awd",
  "backup_camera", "blind_spot", "lane_assist", "adaptive_cruise",
  "parking_sensors", "remote_start", "keyless_entry", "wireless_charging",
  "premium_audio", "third_row", "tow_package", "roof_rack",
  "heads_up", "digital_dash", "power_liftgate", "ventilated_seats",
];

export function LifestyleQuiz() {
  const t = useTranslations("quiz");
  const locale = useLocale();
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [results, setResults] = useState<{ quizVehicles: Vehicle[]; dealerVehicles: DealerVehicle[] } | null>(null);
  const [dealerVehicles, setDealerVehicles] = useState<DealerVehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch live dealer inventory on mount, retrying while syncing
  useEffect(() => {
    let cancelled = false;
    let retryCount = 0;

    async function fetchInventory() {
      try {
        const res = await fetch("/api/inventory");
        if (!res.ok) throw new Error("Failed to fetch inventory");
        const data = await res.json();

        if (cancelled) return;

        if (data.syncing && retryCount < 20) {
          retryCount++;
          setTimeout(fetchInventory, 15000);
          return; // keep loading=true while retrying
        }

        const allVehicles: DealerVehicle[] = data.vehicles || [];
        setDealerVehicles(allVehicles);
      } catch (err) {
        console.error("Failed to load dealer inventory:", err);
      }
      if (!cancelled) setLoading(false);
    }
    fetchInventory();

    return () => { cancelled = true; };
  }, []);

  function selectAnswer(answerIndex: number) {
    const newAnswers = [...answers];
    newAnswers[step] = answerIndex;
    setAnswers(newAnswers);

    if (step < QUESTION_KEYS.length - 1) {
      setStep(step + 1);
    }
  }

  function toggleFeature(feature: string) {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  }

  function showResults() {
    const quizAnswers: QuizAnswers = {
      driving: answers[0] ?? 0,
      passengers: answers[1] ?? 0,
      hobbies: answers[2] ?? 0,
      vibe: answers[3] ?? 0,
      fuel: answers[4] ?? 0,
      selectedFeatures,
      budget: answers[6] ?? 0,
    };
    const quizVehicles = mapDealerInventoryToQuiz(dealerVehicles);
    const matched = getQuizResults(quizVehicles, quizAnswers);

    // Build a lookup from VIN to DealerVehicle for results display
    const dealerByVin = new Map(dealerVehicles.map((d) => [d.vin, d]));
    const matchedDealers = matched
      .map((v) => dealerByVin.get(v.id))
      .filter((d): d is DealerVehicle => d !== undefined);

    setResults({ quizVehicles: matched, dealerVehicles: matchedDealers });
  }

  // Intro screen
  if (step === -1) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <Sparkles className="mx-auto mb-6 h-12 w-12 text-sky-500" />
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        {!loading && dealerVehicles.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-destructive">
              Inventory unavailable — please try again later
            </p>
            <Button
              size="lg"
              className="bg-sky-500 text-white hover:bg-sky-600 px-8 text-base"
              onClick={() => { setLoading(true); window.location.reload(); }}
            >
              Retry
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="bg-sky-500 text-white hover:bg-sky-600 px-8 text-base"
            onClick={() => setStep(0)}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading inventory...
              </>
            ) : (
              t("start")
            )}
          </Button>
        )}
      </div>
    );
  }

  // Results screen
  if (results !== null) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <Sparkles className="mx-auto mb-4 h-10 w-10 text-sky-500" />
          <h1 className="mb-2 text-3xl font-bold">{t("resultsTitle")}</h1>
          <p className="text-muted-foreground">{t("resultsSubtitle")}</p>
        </div>
        {results.dealerVehicles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.dealerVehicles.map((vehicle) => (
              <DealerVehicleCard key={vehicle.vin} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="mb-6 text-lg text-muted-foreground">{t("noMatch")}</p>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-600">
              {t("contactMe")}
            </Link>
          </div>
        )}
        {results.dealerVehicles.length > 0 && results.dealerVehicles.length < 3 && (
          <p className="mt-6 text-center text-muted-foreground">{t("closeMatch")}</p>
        )}
      </div>
    );
  }

  // Question screen
  const qKey = QUESTION_KEYS[step];
  const isMultiSelect = step === 5; // Q6 is multi-select features

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm text-muted-foreground">
          <span>{step + 1} / {QUESTION_KEYS.length}</span>
        </div>
        <div className="h-2 rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-sky-500 transition-all"
            style={{ width: `${((step + 1) / QUESTION_KEYS.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="mb-2 text-2xl font-bold">{t(`${qKey}.question`)}</h2>
      {t.has(`${qKey}.hint`) && (
        <p className="mb-6 rounded-lg bg-sky-50 px-4 py-2.5 text-sm text-sky-700">
          💡 {t(`${qKey}.hint`)}
        </p>
      )}
      {!t.has(`${qKey}.hint`) && <div className="mb-4" />}

      {isMultiSelect ? (
        /* Q6: Multi-select feature grid */
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {FEATURE_KEYS.map((feature) => {
              const selected = selectedFeatures.includes(feature);
              return (
                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-border hover:border-sky-300 hover:bg-sky-50/50"
                  }`}
                >
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    selected ? "border-sky-500 bg-sky-500" : "border-muted-foreground/30"
                  }`}>
                    {selected && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>
                  <span className="leading-tight">
                    {t(`q6.options.${feature}`)}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedFeatures.length > 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              {selectedFeatures.length} selected
            </p>
          )}
        </>
      ) : (
        /* Regular single-select questions */
        <div className="space-y-3">
          {ANSWER_KEYS.map((aKey, i) => (
            <button
              key={aKey}
              onClick={() => selectAnswer(i)}
              className={`w-full rounded-lg border-2 p-4 text-left text-base transition-colors hover:border-sky-500 hover:bg-sky-50 ${
                answers[step] === i ? "border-sky-500 bg-sky-50" : "border-border"
              }`}
            >
              {t(`${qKey}.${aKey}`)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep(Math.max(-1, step - 1))}
          disabled={step === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {t("back")}
        </Button>

        {/* Q6: Next button (multi-select needs explicit next) */}
        {isMultiSelect && (
          <Button
            className="bg-sky-500 text-white hover:bg-sky-600"
            onClick={() => setStep(step + 1)}
          >
            {t("next")}
          </Button>
        )}

        {/* Q7: See results */}
        {step === QUESTION_KEYS.length - 1 && answers[step] !== undefined ? (
          <Button
            className="bg-sky-500 text-white hover:bg-sky-600"
            onClick={showResults}
          >
            {t("seeResults")}
            <Sparkles className="ml-1 h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
