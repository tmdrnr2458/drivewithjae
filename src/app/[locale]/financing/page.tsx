"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import {
  Clock,
  Car,
  Calculator,
  FileText,
  KeyRound,
  ShieldCheck,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Heart,
  HandshakeIcon,
  Phone,
  DollarSign,
  HelpCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Timeline Data                                                      */
/* ------------------------------------------------------------------ */

const timelineSteps = [
  {
    icon: HandshakeIcon,
    timeEn: "5 min",
    timeKo: "5분",
    titleEn: "Walk In & Meet",
    titleKo: "방문 & 인사",
    descEn: "I'll greet you, ask what you're looking for. No pressure.",
    descKo: "인사드리고, 어떤 차를 찾으시는지 여쭤볼게요. 부담 없이.",
  },
  {
    icon: Car,
    timeEn: "20-40 min",
    timeKo: "20-40분",
    titleEn: "Browse & Test Drive",
    titleKo: "둘러보기 & 시승",
    descEn: "Drive as many cars as you want. Bring your family.",
    descKo: "원하시는 만큼 시승하세요. 가족도 함께 오세요.",
  },
  {
    icon: Calculator,
    timeEn: "15-20 min",
    timeKo: "15-20분",
    titleEn: "Talk Numbers",
    titleKo: "가격 상담",
    descEn: "I'll show you every number. Ask me anything.",
    descKo: "모든 숫자를 보여드릴게요. 뭐든 물어보세요.",
  },
  {
    icon: FileText,
    timeEn: "20-30 min",
    timeKo: "20-30분",
    titleEn: "F&I Paperwork",
    titleKo: "서류 작성",
    descEn: "I'll explain every document before you sign.",
    descKo: "서명 전에 모든 서류를 설명해 드릴게요.",
  },
  {
    icon: KeyRound,
    timeEn: "5 min",
    timeKo: "5분",
    titleEn: "Drive Home",
    titleKo: "집으로 출발",
    descEn: "Keys in hand, smile on face.",
    descKo: "열쇠를 받고, 미소와 함께 출발.",
  },
];

/* ------------------------------------------------------------------ */
/*  Fee Data                                                            */
/* ------------------------------------------------------------------ */

const fees = [
  {
    titleEn: "Documentation Fee (~$799)",
    titleKo: "서류 수수료 (~$799)",
    descEn:
      "This is a state-allowed dealer fee. Every dealer charges it.",
    descKo:
      "주 정부에서 허용한 딜러 수수료입니다. 모든 딜러가 부과합니다.",
  },
  {
    titleEn: "NC Sales Tax",
    titleKo: "노스캐롤라이나 판매세",
    descEn:
      "Wake County is 3%. This goes to the state, not us.",
    descKo: "Wake County는 3%입니다. 세금은 주 정부로 가며, 저희에게 오지 않습니다.",
  },
  {
    titleEn: "Tag & Title",
    titleKo: "등록 & 명의이전",
    descEn: "Registration with NC DMV.",
    descKo: "NC DMV 차량 등록 비용입니다.",
  },
];

const canNegotiate = [
  { en: "Vehicle price", ko: "차량 가격" },
  { en: "Trade-in value", ko: "트레이드인 가격" },
  { en: "Accessories", ko: "액세서리" },
  { en: "Interest rate", ko: "이자율" },
];

const cannotNegotiate = [
  { en: "Tax", ko: "세금" },
  { en: "DMV fees", ko: "DMV 수수료" },
  { en: "Doc fee (fixed)", ko: "서류 수수료 (고정)" },
];

/* ------------------------------------------------------------------ */
/*  Reviews Data                                                        */
/* ------------------------------------------------------------------ */

const reviewGroups = [
  {
    fearEn: "I was afraid of being pressured",
    fearKo: "압박받을까 봐 걱정했어요",
    color: "border-l-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    reviews: [
      {
        textEn:
          "Seungkook was the opposite of pushy. He let us take our time and never made us feel rushed.",
        textKo:
          "승국 씨는 전혀 강압적이지 않았어요. 천천히 고르게 해주셨고 절대 서두르지 않았습니다.",
        author: "Sarah M.",
      },
      {
        textEn:
          "No pressure at all. He actually told us to go home and think about it.",
        textKo:
          "전혀 부담이 없었어요. 오히려 집에 가서 생각해보라고 하시더라고요.",
        author: "David K.",
      },
    ],
  },
  {
    fearEn: "I was worried about hidden fees",
    fearKo: "숨겨진 비용이 있을까 봐 걱정했어요",
    color: "border-l-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    reviews: [
      {
        textEn:
          "Everything was explained clearly. No surprises at signing.",
        textKo:
          "모든 것이 명확하게 설명됐어요. 서명할 때 놀랄 일이 없었습니다.",
        author: "Jennifer L.",
      },
      {
        textEn:
          "He walked me through every single line on the contract.",
        textKo: "계약서의 모든 줄을 하나하나 설명해주셨어요.",
        author: "Michael R.",
      },
    ],
  },
  {
    fearEn: "I didn't speak much English",
    fearKo: "영어를 잘 못해서 걱정했어요",
    color: "border-l-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    reviews: [
      {
        textEn:
          "한국어로 설명해주셔서 너무 편했어요. 처음으로 딜러십에서 편안함을 느꼈습니다.",
        textKo:
          "한국어로 설명해주셔서 너무 편했어요. 처음으로 딜러십에서 편안함을 느꼈습니다.",
        author: "김민수",
      },
      {
        textEn:
          "He explained everything in Korean AND English so my wife could understand too.",
        textKo:
          "한국어와 영어 모두로 설명해주셔서 아내도 이해할 수 있었어요.",
        author: "James & Soyeon P.",
      },
    ],
  },
  {
    fearEn: "It was my first car ever",
    fearKo: "생애 첫 차 구매라 무서웠어요",
    color: "border-l-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    reviews: [
      {
        textEn:
          "As a first-time buyer I was terrified. Seungkook made it feel easy.",
        textKo:
          "첫 차 구매라 너무 무서웠는데, 승국 씨 덕분에 쉽게 느껴졌어요.",
        author: "Emily T.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Promises Data                                                       */
/* ------------------------------------------------------------------ */

const promises = [
  {
    en: "I will never pressure you to buy today.",
    ko: "오늘 사라고 절대 압박하지 않겠습니다.",
  },
  {
    en: "I will explain every number on every piece of paper.",
    ko: "모든 서류의 모든 숫자를 설명해 드리겠습니다.",
  },
  {
    en: "I will answer your texts and calls — even after the sale.",
    ko: "판매 후에도 문자와 전화에 답하겠습니다.",
  },
  {
    en: "If I can't get you a good deal, I'll tell you honestly.",
    ko: "좋은 딜을 못 드리면, 솔직하게 말씀드리겠습니다.",
  },
  {
    en: "I will treat you like family, not a transaction.",
    ko: "거래가 아닌, 가족처럼 대하겠습니다.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                            */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    qEn: "Can I see the invoice price?",
    qKo: "인보이스 가격을 볼 수 있나요?",
    aEn: "Yes. I'll show you.",
    aKo: "네, 보여드릴게요.",
  },
  {
    qEn: "What's your best out-the-door price?",
    qKo: "최종 출고 가격이 얼마인가요?",
    aEn: "Ask me this. I respect it.",
    aKo: "이 질문을 꼭 하세요. 저는 이런 질문을 존중합니다.",
  },
  {
    qEn: "Can I take the car to my mechanic?",
    qKo: "제 정비사에게 차를 가져가도 되나요?",
    aEn: "Absolutely. For used cars, I encourage it.",
    aKo: "물론이죠. 중고차의 경우 오히려 권장합니다.",
  },
  {
    qEn: "What if I change my mind?",
    qKo: "마음이 바뀌면 어떡하죠?",
    aEn: "Within reason, we'll work it out.",
    aKo: "합리적인 범위 안에서 해결해 드리겠습니다.",
  },
  {
    qEn: "Do you get commission on add-ons?",
    qKo: "추가 옵션에 커미션을 받나요?",
    aEn: "Yes, I'm honest about that. I'll tell you which ones are actually worth it.",
    aKo: "네, 솔직히 말씀드립니다. 실제로 가치 있는 것만 추천해 드릴게요.",
  },
  {
    qEn: "What if my credit isn't great?",
    qKo: "신용이 좋지 않으면 어떡하나요?",
    aEn: "We work with many lenders. I'll find the best option for your situation — honestly.",
    aKo: "여러 금융기관과 협력합니다. 고객님 상황에 맞는 최선의 옵션을 찾아드리겠습니다.",
  },
];

/* ------------------------------------------------------------------ */
/*  Expandable FAQ Component                                            */
/* ------------------------------------------------------------------ */

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Card
      className="cursor-pointer transition-all hover:ring-2 hover:ring-sky-500/30"
      onClick={() => setOpen(!open)}
    >
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <HelpCircle className="h-5 w-5 shrink-0 text-sky-500" />
          {question}
        </CardTitle>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </CardHeader>
      {open && (
        <CardContent>
          <p className="text-muted-foreground italic">&ldquo;{answer}&rdquo;</p>
        </CardContent>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                 */
/* ------------------------------------------------------------------ */

export default function FinancingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isKo = locale === "ko";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      {/* =========================================================== */}
      {/*  HERO                                                        */}
      {/* =========================================================== */}
      <section className="mb-16 text-center">
        <Badge variant="secondary" className="mb-4 text-sm">
          {isKo ? "드라이브 위드 재" : "Drive with Jae"}
        </Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("financing.title")}
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-xl font-semibold text-sky-600 dark:text-sky-400">
          &ldquo;{t("financing.subtitle")}&rdquo;
        </p>
        <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
          {isKo
            ? "저는 제승국입니다. 이 페이지는 딜러십에 오시기 전에 모든 것을 알려드리기 위해 만들었습니다. 놀랄 일이 없도록."
            : "I'm Seungkook Jae. I made this page so you know exactly what to expect before you ever step foot in the dealership. No surprises."}
        </p>
      </section>

      <Separator className="mb-16" />

      {/* =========================================================== */}
      {/*  SECTION 1: Visit Timeline                                    */}
      {/* =========================================================== */}
      <section className="mb-16">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          {isKo
            ? "방문하시면 실제로 이런 일이 일어납니다"
            : "What Will Actually Happen When You Visit"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "단계별로 정리했습니다. 예상 소요 시간 포함."
            : "Step by step, with estimated times. No mysteries."}
        </p>

        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-sky-200 dark:bg-sky-900 sm:left-8" />

          {timelineSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative flex gap-4 pb-8 sm:gap-6">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg sm:h-16 sm:w-16">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="pt-1 sm:pt-3">
                  <Badge variant="outline" className="mb-1 text-xs font-mono">
                    {isKo ? step.timeKo : step.timeEn}
                  </Badge>
                  <h3 className="text-lg font-semibold">
                    {isKo ? step.titleKo : step.titleEn}
                  </h3>
                  <p className="text-muted-foreground">
                    {isKo ? step.descKo : step.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Card className="border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30">
          <CardContent className="pt-4 text-center text-sm font-medium">
            {isKo
              ? "어떤 단계에서든 떠나실 수 있습니다. 죄책감 없이. 원하지 않으면 후속 전화도 없습니다."
              : "You can leave at ANY step. No guilt. No follow-up calls unless you want them."}
          </CardContent>
        </Card>
      </section>

      <Separator className="mb-16" />

      {/* =========================================================== */}
      {/*  SECTION 2: Fees Explained                                    */}
      {/* =========================================================== */}
      <section className="mb-16">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          {isKo
            ? "비용 설명 — 묻기 전에 알려드립니다"
            : "Fees Explained — Before You Ask"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "숨겨진 비용 없습니다. 보이는 그대로 내시는 겁니다."
            : "No hidden fees. What you see is what you pay."}
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {fees.map((fee, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <DollarSign className="h-4 w-4 text-sky-500" />
                  {isKo ? fee.titleKo : fee.titleEn}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isKo ? fee.descKo : fee.descEn}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-emerald-200 dark:border-emerald-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                {isKo ? "협상 가능한 것" : "What I CAN negotiate"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {canNegotiate.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    {isKo ? item.ko : item.en}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-red-700 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                {isKo ? "협상 불가능한 것" : "What I CANNOT negotiate"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {cannotNegotiate.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <XCircle className="h-3.5 w-3.5 text-red-400" />
                    {isKo ? item.ko : item.en}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* =========================================================== */}
      {/*  SECTION 3: Reviews by Fear                                   */}
      {/* =========================================================== */}
      <section className="mb-16">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          {isKo
            ? "걱정별로 정리한 실제 후기"
            : "Reviews Organized by Your Fear"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "다른 분들도 같은 걱정을 했습니다. 그분들의 이야기를 들어보세요."
            : "Other people had the same worries. Here's what they said."}
        </p>

        <div className="space-y-6">
          {reviewGroups.map((group, i) => (
            <Card key={i} className={`border-l-4 ${group.color} ${group.bgColor}`}>
              <CardHeader>
                <CardTitle className="text-base">
                  &ldquo;{isKo ? group.fearKo : group.fearEn}&rdquo;
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {group.reviews.map((review, j) => (
                  <div key={j}>
                    <p className="text-sm italic text-muted-foreground">
                      &ldquo;{isKo ? review.textKo : review.textEn}&rdquo;
                    </p>
                    <p className="mt-1 text-xs font-medium">— {review.author}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* =========================================================== */}
      {/*  SECTION 4: My Promise                                        */}
      {/* =========================================================== */}
      <section className="mb-16">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          {isKo ? "나의 약속" : "My Promise to You"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "제승국이 직접 드리는 약속입니다."
            : "Personal commitments from me, Seungkook, to you."}
        </p>

        <div className="space-y-4">
          {promises.map((promise, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{promise.en}</p>
                <p className="text-sm text-muted-foreground">{promise.ko}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* =========================================================== */}
      {/*  SECTION 5: FAQ                                               */}
      {/* =========================================================== */}
      <section className="mb-16">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          {isKo
            ? "더 많은 분들이 물어봤으면 하는 질문들"
            : "Questions I Wish More People Asked"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "솔직한 답변을 드리겠습니다."
            : "Honest answers from me. Tap to expand."}
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={isKo ? faq.qKo : faq.qEn}
              answer={isKo ? faq.aKo : faq.aEn}
            />
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* =========================================================== */}
      {/*  FINAL CTA                                                    */}
      {/* =========================================================== */}
      <section className="text-center">
        <Heart className="mx-auto mb-4 h-10 w-10 text-sky-500" />
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          {isKo ? "준비되셨나요?" : "Ready When You Are"}
        </h2>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          {isKo
            ? "아직 궁금한 점이 있으신가요? 편하게 연락주세요."
            : "Still have questions? Reach out. No commitment needed."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-sky-600"
          >
            <MessageCircle className="h-5 w-5" />
            {isKo ? "부담 없는 방문 예약" : "Schedule a No-Pressure Visit"}
          </Link>
          <a
            href="sms:+19842421715"
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500 px-8 py-3 font-semibold text-sky-600 transition-colors hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/30"
          >
            <Phone className="h-5 w-5" />
            {isKo ? "문자로 질문하기" : "Text Me Your Questions"}
          </a>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {isKo
            ? "아직 궁금한 점이 있으신가요? 편하게 연락주세요."
            : "Still have questions? Don\u2019t hesitate to reach out."}
        </p>
      </section>
    </div>
  );
}
