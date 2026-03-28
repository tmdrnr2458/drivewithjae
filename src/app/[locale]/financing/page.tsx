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
    titleKo: "방문 후 상담 시작",
    descEn: "I'll greet you, ask what you're looking for. No pressure.",
    descKo: "평소 운전 스타일, 가족 구성, 예산 같은 부분 여쭤보고 같이 맞는 차를 봅니다",
  },
  {
    icon: HelpCircle,
    timeEn: "10-15 min",
    timeKo: "10-15분",
    titleEn: "Find Your Match",
    titleKo: "맞는 차 찾기",
    descEn: "I'll ask about your lifestyle, needs, and budget to narrow down the perfect car for you — before we even look at the lot.",
    descKo: "생활 패턴, 가족 구성, 예산 등을 여쭤보고 딱 맞는 차를 추려드려요. 차를 보기 전에 먼저 어떤 게 맞는지 같이 찾아봐요.",
  },
  {
    icon: Car,
    timeEn: "20-40 min",
    timeKo: "20-40분",
    titleEn: "Browse & Test Drive",
    titleKo: "둘러보기 & 시승",
    descEn: "Drive as many cars as you want. Bring your family.",
    descKo: "마음에 드는 차 다 타보세요. 가족도 같이 오세요.",
  },
  {
    icon: Calculator,
    timeEn: "15-20 min",
    timeKo: "15-20분",
    titleEn: "Talk Numbers",
    titleKo: "금액은 하나씩 다 설명드릴게요",
    descEn: "I'll show you every number. Ask me anything.",
    descKo: "숫자 하나하나 다 보여드릴게요. 궁금한 거 다 물어보세요.",
  },
  {
    icon: FileText,
    timeEn: "20-30 min",
    timeKo: "20-30분",
    titleEn: "F&I Paperwork",
    titleKo: "서류 작성",
    descEn: "I'll explain every document before you sign.",
    descKo: "사인하기 전에 서류 하나하나 다 설명해 드릴게요.",
  },
  {
    icon: KeyRound,
    timeEn: "5 min",
    timeKo: "5분",
    titleEn: "Drive Home",
    titleKo: "차 받고 귀가",
    descEn: "Keys in hand, smile on face.",
    descKo: "차 키 받으시고 출발하시면 됩니다",
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
      "서류 수수료는 약 $799이고, 딜러십에서 공통으로 들어가는 비용입니다.",
  },
  {
    titleEn: "NC Sales Tax",
    titleKo: "노스캐롤라이나 판매세",
    descEn:
      "Wake County is 3%. This goes to the state, not us.",
    descKo: "Wake County는 3%예요. 이건 주 정부로 가는 거지 저희 주머니로 안 가요.",
  },
  {
    titleEn: "Tag & Title",
    titleKo: "등록 & 명의이전",
    descEn: "Registration with NC DMV.",
    descKo: "NC DMV에 차량 등록하는 비용이에요.",
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
    fearKo: "전혀 부담 주지 않으셨어요",
    color: "border-l-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    reviews: [
      {
        textEn:
          "Seungkook was the opposite of pushy. He let us take our time and never made us feel rushed.",
        textKo:
          "승국 씨는 전혀 안 밀어요. 천천히 고르게 해주시고 절대 서두르지 않았어요.",
        author: "Sarah M.",
      },
      {
        textEn:
          "No pressure at all. He actually told us to go home and think about it.",
        textKo:
          "부담 하나도 없었어요. 오히려 집에 가서 생각해보라고 하시더라고요.",
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
          "다 명확하게 설명해주셨어요. 사인할 때 놀랄 일이 하나도 없었어요.",
        author: "Jennifer L.",
      },
      {
        textEn:
          "He walked me through every single line on the contract.",
        textKo: "계약서 한 줄 한 줄 다 짚어서 설명해주셨어요.",
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
    fearKo: "첫 차라 많이 떨렸어요",
    color: "border-l-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    reviews: [
      {
        textEn:
          "As a first-time buyer I was terrified. Seungkook made it feel easy.",
        textKo:
          "첫 차라서 진짜 떨렸는데, 승국님 덕분에 편하게 샀어요.",
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
    ko: "오늘 당장 사라고 절대 압박하지 않겠습니다.",
  },
  {
    en: "I will explain every number on every piece of paper.",
    ko: "서류에 있는 숫자 하나하나 다 설명해 드리겠습니다.",
  },
  {
    en: "I will answer your texts and calls — even after the sale.",
    ko: "출고 후에도 문자나 전화 주시면 계속 도와드리겠습니다",
  },
  {
    en: "If I can't get you a good deal, I'll tell you honestly.",
    ko: "좋은 딜이 안 되면, 안 된다고 솔직히 말씀드리겠습니다.",
  },
  {
    en: "I will treat you like family, not a transaction.",
    ko: "편하게 믿고 맡기실 수 있게 도와드리겠습니다",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                            */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    qEn: "Can I see the invoice price?",
    qKo: "인보이스 가격 볼 수 있어요?",
    aEn: "Yes. I'll show you.",
    aKo: "네, 보여드릴게요.",
  },
  {
    qEn: "What's your best out-the-door price?",
    qKo: "다 포함해서 최종 가격이 얼마예요?",
    aEn: "Ask me this. I respect it.",
    aKo: "이 질문 꼭 하세요. 이렇게 물어봐야 해요.",
  },
  {
    qEn: "Can I take the car to my mechanic?",
    qKo: "내 정비사한테 차 보여줘도 돼요?",
    aEn: "Absolutely. For used cars, I encourage it.",
    aKo: "당연하죠. 중고차면 오히려 가져가 보시라고 해요.",
  },
  {
    qEn: "What if I change my mind?",
    qKo: "마음이 바뀌면 어떡해요?",
    aEn: "Within reason, we'll work it out.",
    aKo: "합리적인 범위에서 같이 해결해 봐요.",
  },
  {
    qEn: "Do you get commission on add-ons?",
    qKo: "추가 옵션에 커미션 받으세요?",
    aEn: "Yes, I'm honest about that. I'll tell you which ones are actually worth it.",
    aKo: "네, 솔직히 받아요. 대신 진짜 필요한 것만 추천해 드릴게요.",
  },
  {
    qEn: "What if my credit isn't great?",
    qKo: "크레딧이 안 좋으면 어떡해요?",
    aEn: "We work with many lenders. I'll find the best option for your situation — honestly.",
    aKo: "여러 금융기관이랑 같이 일하고 있어요. 상황에 맞는 최선의 방법을 찾아드릴게요, 솔직하게.",
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
          {isKo ? "차 구매 과정, 이렇게 진행됩니다" : "Jae Method"}
        </Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("financing.title")}
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-xl font-semibold text-sky-600 dark:text-sky-400">
          &ldquo;{t("financing.subtitle")}&rdquo;
        </p>
        <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
          {isKo
            ? "제승국입니다. 딜러십 오시기 전에 어떤 식으로 진행되는지 미리 보실 수 있게 정리해뒀어요."
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
            ? "오시면 이런 순서로 진행돼요"
            : "What Will Actually Happen When You Visit"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "단계별로 정리했어요. 대략 시간도 적어놨으니 참고하세요."
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
              ? "어느 단계에서든 아니다 싶으면 편하게 가셔도 됩니다. 부담 느끼실 필요 없고, 원치 않으시면 따로 연락도 안 드립니다."
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
            ? "비용은 미리 설명드릴게요"
            : "Fees Explained — Before You Ask"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "숨겨진 비용 없이 보이는 그대로 안내드립니다"
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

      </section>

      <Separator className="mb-16" />

      {/* =========================================================== */}
      {/*  SECTION 4: My Promise                                        */}
      {/* =========================================================== */}
      <section className="mb-16">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          {isKo ? "제 약속" : "My Promise to You"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "제가 직접 약속드리는 부분입니다"
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
            ? "이런 것도 물어봐도 돼요"
            : "Questions I Wish More People Asked"}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          {isKo
            ? "솔직하게 답해드릴게요. 눌러서 확인해보세요."
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
          {isKo ? "준비되셨으면 언제든 오세요" : "Ready When You Are"}
        </h2>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          {isKo
            ? "아직 궁금한 거 있으세요? 편하게 연락 주세요."
            : "Still have questions? Reach out. No commitment needed."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-sky-600"
          >
            <MessageCircle className="h-5 w-5" />
            {isKo ? "방문 예약하기" : "Schedule a No-Pressure Visit"}
          </Link>
          <a
            href="sms:+19842421715"
            className="inline-flex items-center gap-2 rounded-lg border border-sky-500 px-8 py-3 font-semibold text-sky-600 transition-colors hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/30"
          >
            <Phone className="h-5 w-5" />
            {isKo ? "문자로 물어보기" : "Text Me Your Questions"}
          </a>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {isKo
            ? "부담 없이 언제든 연락 주세요."
            : "Still have questions? Don\u2019t hesitate to reach out."}
        </p>
      </section>
    </div>
  );
}
