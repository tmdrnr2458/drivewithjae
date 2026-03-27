"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageCircle,
  CreditCard,
  DollarSign,
  Building2,
  Car,
  ClipboardCheck,
  Handshake,
  FileText,
  ChevronDown,
  BookOpen,
  CircleAlert,
  CheckSquare,
  HelpCircle,
  Globe,
} from "lucide-react";
import { useState } from "react";

const steps = {
  en: [
    {
      icon: CreditCard,
      title: "Know What You Want",
      content:
        "First, decide: are you paying the full price out-the-door (cash/check), or financing with monthly payments? Many buyers — especially in the Korean community — prefer to pay in full. That's great! If financing, your credit score (300–850) determines your interest rate. No credit history? Get a secured credit card and pay it off monthly — you'll build a score within 6 months.",
    },
    {
      icon: DollarSign,
      title: "Set Your Real Budget",
      content:
        "If financing: every $1,000 financed ≈ $20/month. A $25,000 car ≈ $500/mo. Put money down and the payment drops — $5,000 down on a $25K car means you finance $20K ≈ $400/mo. Don't forget insurance ($100–$300/mo), gas ($150–$250/mo), and NC sales tax (3%). If paying cash: your out-the-door price is the vehicle price + tax + fees. Budget for the TOTAL cost either way.",
    },
    {
      icon: Car,
      title: "Choose New vs Used vs CPO",
      content:
        "New: full warranty, latest features, higher price. Used: lower price, but check vehicle history (Carfax). CPO (Certified Pre-Owned): used car with manufacturer warranty \u2014 best of both worlds. Fun fact: Kia offers a 10-year/100,000-mile powertrain warranty on new cars.",
    },
    {
      icon: ClipboardCheck,
      title: "Test Drive",
      content:
        "Test driving is 100% free and no obligation. Drive it on the highway AND in a parking lot. Bring your family \u2014 make sure car seats fit, everyone is comfortable. Take your time. A good salesperson will never rush you.",
    },
    {
      icon: Handshake,
      title: "Negotiate",
      content:
        "Many dealers mark up prices and expect negotiation. At Fred Anderson, we show our best price online upfront — no games. That said, it never hurts to ask. For used cars, prices are mostly set, but there may be some wiggle room depending on the vehicle. Just ask — the worst they can say is no.",
    },
    {
      icon: FileText,
      title: "Paperwork & Drive Home",
      content:
        "The F&I (Finance & Insurance) office will offer extras: extended warranties, paint protection, gap insurance, etc. Gap insurance is worth it if you\u2019re financing with little down payment. Paint protection and fabric coating? Usually not worth it. Read everything before signing.",
    },
  ],
  ko: [
    {
      icon: CreditCard,
      title: "먼저 이것부터 정하세요",
      content:
        "현금 일시불로 살 건지, 할부로 할 건지 먼저 정하세요. 한국 분들은 현금으로 한 번에 사시는 분이 많은데, 아주 좋은 방법이에요! 할부를 생각하시면 크레딧 점수(300~850)가 이자율을 정해요. 크레딧이 아직 없으세요? 시큐어드 카드 만들어서 매달 갚으면 6개월이면 점수가 생겨요.",
    },
    {
      icon: DollarSign,
      title: "진짜 예산 이렇게 세우세요",
      content:
        "할부 시: $1,000 빌리면 월 약 $20이에요. $25,000 차 = 월 $500 정도. 다운을 넣으면 줄어들어요 — $25K 차에 $5,000 다운하면 $20K만 빌리니까 월 $400. 보험료($100~$300/월), 기름값($150~$250/월), NC 세금(3%)도 꼭 넣어서 계산하세요. 현금이면: 차값 + 세금 + 수수료 = 총 가격. 이걸 모르면 나중에 당황해요.",
    },
    {
      icon: Car,
      title: "신차 vs 중고 vs CPO, 뭐가 나을까?",
      content:
        "신차: 워런티 풀, 최신 기능, 대신 비싸요. 중고: 저렴하지만 Carfax로 이력 꼭 확인하세요. CPO(인증 중고차): 제조사 워런티가 포함된 중고차라서 장점만 모았어요. 참고로 Kia는 신차에 10년/10만 마일 파워트레인 워런티를 줘요. 이거 진짜 좋아요.",
    },
    {
      icon: ClipboardCheck,
      title: "시승은 무조건 해보세요",
      content:
        "시승은 100% 무료고 사야 할 의무도 없어요. 고속도로랑 주차장 둘 다 돌아보세요. 가족도 같이 오세요 — 카시트 들어가는지, 다 편한지 직접 확인해야 해요. 천천히 하세요. 좋은 세일즈맨은 절대 서두르지 않아요.",
    },
    {
      icon: Handshake,
      title: "가격, 깎을 수 있어요",
      content:
        "많은 딜러가 가격을 높여놓고 깎아주는 척하는데, Fred Anderson에서는 온라인에 최선 가격을 미리 올려놔요. 중고차는 가격이 대부분 정해져 있지만, 차에 따라 좀 빼줄 수 있는 여지가 있어요. 그냥 물어보세요 — 안 되면 안 된다고 하는 거니까 손해 볼 건 없어요.",
    },
    {
      icon: FileText,
      title: "서류 싸인하고 출발!",
      content:
        "F&I(파이낸스 사무실)에서 추가 상품을 권유해요: 연장 워런티, 페인트 보호, 갭 보험 같은 거요. 다운페이먼트가 적으면 갭 보험은 들어볼 만해요. 페인트 보호나 직물 코팅? 대부분 필요 없어요. 서명하기 전에 모든 걸 꼼꼼히 읽으세요. 모르는 거 있으면 저한테 물어보세요.",
    },
  ],
};

const traps = {
  en: [
    {
      title: "Yo-Yo Financing",
      what: "You drive the car home, then the dealer calls saying your financing \u201Cfell through\u201D and you need to sign a new deal with a higher interest rate.",
      protect:
        "Don\u2019t drive the car home until financing is 100% confirmed in writing. If they call you back, you have the legal right to return the car and get your money back.",
    },
    {
      title: "Bait-and-Switch Pricing",
      what: "The online price looks amazing, but when you arrive the price is suddenly higher because of \u201Cmarket adjustments\u201D or \u201Cmandatory packages.\u201D",
      protect:
        "Screenshot the online price before you go. Ask the dealer to confirm the price over text or email. If the price changes when you arrive, walk away.",
    },
    {
      title: "Unnecessary Add-Ons",
      what: "Paint protection, fabric coating, VIN etching, nitrogen tire fill \u2014 these are high-margin products that usually aren\u2019t worth the cost.",
      protect:
        "You can say no to every add-on. Ask for the price WITHOUT any additions. If you want gap insurance, shop around \u2014 your own insurance company may offer it cheaper.",
    },
    {
      title: "\u201CLet Me Talk to My Manager\u201D",
      what: "A pressure tactic designed to make you wait and feel committed. The salesperson \u201Cfights for you\u201D to get a better deal, but the price was already planned.",
      protect:
        "Don\u2019t feel pressured by the performance. Know your budget, know the fair market price (use KBB or Edmunds), and stick to your number. It\u2019s OK to leave.",
    },
  ],
  ko: [
    {
      title: "요요 파이낸싱",
      what: "차 타고 집에 갔는데, 딜러가 전화해서 파이낸싱이 '안 됐다'면서 더 높은 이자로 다시 사인하라고 해요.",
      protect:
        "파이낸싱이 서면으로 100% 확인될 때까지 차를 가져가지 마세요. 나중에 전화 오면 차 반납하고 돈 돌려받을 법적 권리가 있어요.",
    },
    {
      title: "미끼 상술 (Bait-and-Switch)",
      what: "온라인 가격은 엄청 좋은데, 막상 가면 '시장 조정'이나 '필수 패키지' 때문에 가격이 확 올라요.",
      protect:
        "가기 전에 온라인 가격 스크린샷 찍어두세요. 문자나 이메일로 가격 확인받으세요. 가격이 바뀌면? 그냥 나오세요.",
    },
    {
      title: "쓸데없는 추가 상품",
      what: "페인트 보호, 직물 코팅, VIN 각인, 질소 타이어 — 딜러 마진은 높고 대부분 필요 없는 것들이에요.",
      protect:
        "추가 상품은 다 거절할 수 있어요. '추가 없이 얼마예요?' 하고 물어보세요. 갭 보험이 필요하면 직접 비교해보세요 — 보험회사가 더 쌀 수 있어요.",
    },
    {
      title: "'매니저한테 물어볼게요'",
      what: "기다리게 해서 심리적으로 묶어두는 작전이에요. '좋은 딜 받아왔다'고 하지만, 사실 가격은 이미 정해져 있었어요.",
      protect:
        "그 퍼포먼스에 넘어가지 마세요. 내 예산 알고, 시장 가격 알고(KBB나 Edmunds 검색), 내 숫자를 지키세요. 그냥 나와도 돼요.",
    },
  ],
};

const checklist = {
  en: {
    everyone: [
      "Valid driver\u2019s license or passport",
      "Proof of income (2 recent pay stubs)",
      "Proof of residence (utility bill or lease agreement)",
      "Insurance info (or be ready to get a quote)",
      "Trade-in title (if applicable)",
      "Down payment (personal check or bank transfer is fine)",
    ],
    visa: [
      "Passport with valid visa",
      "I-94 arrival/departure record",
      "SSN or ITIN (Individual Taxpayer ID Number)",
      "Employment letter from your company",
      "Proof of US address",
    ],
  },
  ko: {
    everyone: [
      "운전면허증 또는 여권",
      "소득 증명 (최근 급여 명세서 2장)",
      "거주 증명 (공과금 고지서나 임대차 계약서)",
      "보험 정보 (없으면 견적 받을 준비)",
      "트레이드인 차량 타이틀 (해당되면)",
      "다운페이먼트 (수표나 계좌이체 OK)",
    ],
    visa: [
      "유효한 비자가 있는 여권",
      "I-94 입출국 기록",
      "SSN 또는 ITIN (개인 납세자 번호)",
      "회사 재직 증명서",
      "미국 주소 증명",
    ],
  },
};

const faqs = {
  en: [
    {
      q: "Can I buy a car on an F-1 student visa?",
      a: "Yes! You can buy a car on an F-1 visa. You\u2019ll need an SSN (if you have on-campus employment) or an ITIN. Some dealers work with students regularly and know the process. I can walk you through it step by step.",
    },
    {
      q: "Can I buy a car on an H-1B work visa?",
      a: "Absolutely. With H-1B you can get financing from most banks. Bring your employment letter, recent pay stubs, and proof of address. Your employment stability makes financing easier.",
    },
    {
      q: "Do I need a Social Security Number?",
      a: "Not necessarily. An ITIN (Individual Taxpayer Identification Number) works too. You can apply for an ITIN at the IRS. Some credit unions will work with ITIN holders for auto loans.",
    },
    {
      q: "Can someone in Korea co-sign my loan?",
      a: "Generally, co-signers need to be US residents with a US credit history. However, a larger down payment or working with certain lenders can help. Let me help you explore your options.",
    },
    {
      q: "I\u2019m going back to Korea in 2 years \u2014 should I lease or buy?",
      a: "A 2-3 year lease might be perfect for your situation. You return the car at the end with no hassle about selling it. Just watch the mileage limits (usually 10,000\u201312,000 miles/year).",
    },
    {
      q: "Can I use my Korean driver\u2019s license?",
      a: "You can use your Korean license temporarily, but get your NC driver\u2019s license as soon as possible. Most insurance companies require a US license, and it makes everything easier. The NC DMV process is straightforward.",
    },
    {
      q: "What if my English isn\u2019t good enough for the paperwork?",
      a: "That\u2019s exactly why I\u2019m here. I explain everything in Korean so you understand 100% of what you\u2019re signing. \ud55c\uad6d\uc5b4\ub85c \ubaa8\ub4e0 \uc11c\ub958\ub97c \uc124\uba85\ud574 \ub4dc\ub9bd\ub2c8\ub2e4. No one should sign something they don\u2019t fully understand.",
    },
  ],
  ko: [
    {
      q: "F-1 학생비자로 차를 살 수 있나요?",
      a: "네! F-1 비자로 차 살 수 있어요. SSN(캠퍼스 알바 있으면) 아니면 ITIN이 필요해요. 학생 고객이 많은 딜러는 절차를 잘 알고 있어요. 제가 하나하나 알려드릴게요.",
    },
    {
      q: "H-1B 취업비자로 차를 살 수 있나요?",
      a: "물론이죠! H-1B 있으면 대부분 은행에서 파이낸싱이 돼요. 재직 증명서, 최근 급여 명세서, 주소 증명 가져오세요. 안정적인 직장이 있으면 훨씬 수월해요.",
    },
    {
      q: "SSN이 꼭 있어야 하나요?",
      a: "아니에요. ITIN(개인 납세자 식별번호)으로도 돼요. IRS에서 신청할 수 있어요. 일부 크레딧 유니온은 ITIN으로도 자동차 론을 해줘요.",
    },
    {
      q: "한국에 있는 가족이 보증인이 될 수 있나요?",
      a: "보통은 보증인이 미국에 살면서 미국 크레딧이 있어야 해요. 하지만 다운을 많이 넣거나 특정 렌더를 이용하면 방법이 있어요. 같이 방법 찾아봐요.",
    },
    {
      q: "2년 후 한국 돌아가는데 — 리스가 나을까요, 구매가 나을까요?",
      a: "2~3년 리스가 딱 맞을 수 있어요. 끝나면 차 반납하면 되니까 팔 걱정이 없어요. 다만 주행거리 제한(보통 연 10,000~12,000마일)은 꼭 확인하세요.",
    },
    {
      q: "한국 운전면허증을 쓸 수 있나요?",
      a: "일시적으로는 쓸 수 있지만, 빨리 NC 면허를 따는 게 좋아요. 보험회사 대부분이 미국 면허를 원하고, 있으면 모든 게 편해져요. NC DMV 시험은 생각보다 간단해요.",
    },
    {
      q: "영어가 부족해서 서류가 걱정돼요",
      a: "바로 그래서 제가 여기 있는 거예요. 사인하는 모든 서류를 한국어로 설명해 드려요. 이해 못 하는 서류에 사인하는 일은 없어야 해요.",
    },
  ],
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => setOpen(!open)}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-left">
            <HelpCircle className="h-5 w-5 shrink-0 text-sky-500" />
            {question}
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </CardTitle>
      </CardHeader>
      {open && (
        <CardContent className="-mt-2 text-muted-foreground">
          {answer}
        </CardContent>
      )}
    </Card>
  );
}

export default function GuidePage() {
  const t = useTranslations();
  const locale = useLocale();
  const isKo = locale === "ko";

  const currentSteps = isKo ? steps.ko : steps.en;
  const currentTraps = isKo ? traps.ko : traps.en;
  const currentChecklist = isKo ? checklist.ko : checklist.en;
  const currentFaqs = isKo ? faqs.ko : faqs.en;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <Badge className="mb-4 border-sky-500/30 bg-sky-500/10 text-sky-300">
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            {isKo ? "\uc644\ubcbd \uac00\uc774\ub4dc" : "Complete Guide"}
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("guide.title")}
          </h1>
          <p className="mb-6 text-lg text-slate-300 sm:text-xl">
            {t("guide.subtitle")}
          </p>
          <Separator className="mx-auto mb-6 max-w-xs bg-slate-700" />
          <div className="mx-auto max-w-2xl rounded-xl border border-sky-500/20 bg-sky-500/5 p-6">
            <p className="italic text-slate-300">
              {isKo
                ? "\"서류 앞에서 뭔 말인지 모르는 그 느낌, 저도 알아요. 저도 겪었으니까요.\""
                : "\"I know what it feels like to not understand the paperwork in front of you. I've been there.\""}
            </p>
            <p className="mt-2 text-sm font-medium text-sky-400">
              — Seungkook Jae {isKo ? "(\uc81c\uc2b9\uad6d)" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: 7 Steps */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-3 border-sky-500/30 bg-sky-100 text-sky-700">
              <ClipboardCheck className="mr-1.5 h-3.5 w-3.5" />
              {isKo ? "\ub2e8\uacc4\ubcc4 \uac00\uc774\ub4dc" : "Step by Step"}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isKo
                ? "미국에서 차 사는 법, 단계별로 알려드릴게요"
                : "7 Steps to Buying a Car in the US"}
            </h2>
          </div>
          <div className="space-y-4">
            {currentSteps.map((step, i) => (
              <Card key={i} className="transition-shadow hover:shadow-md">
                <CardContent className="flex gap-4 pt-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    {i < currentSteps.length - 1 && (
                      <div className="mt-2 h-full w-0.5 bg-sky-100" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold">
                      <step.icon className="h-5 w-5 text-sky-500" />
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {step.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Common Traps */}
      <section className="bg-amber-50/50 py-16 dark:bg-amber-950/10 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-3 border-amber-500/30 bg-amber-100 text-amber-700">
              <CircleAlert className="mr-1.5 h-3.5 w-3.5" />
              {isKo ? "이거 조심하세요" : "Watch Out"}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isKo ? "이것만 알면 안 당해요" : "Common Traps to Avoid"}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {currentTraps.map((trap, i) => (
              <Card
                key={i}
                className="border-amber-200 bg-white dark:border-amber-900/30 dark:bg-card"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    {trap.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="-mt-2 space-y-3">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {isKo ? "뭔데요?" : "What is it?"}
                    </p>
                    <p className="text-sm text-muted-foreground">{trap.what}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                      {isKo ? "이렇게 대처하세요" : "How to protect yourself"}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {trap.protect}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: What to Bring */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-3 border-sky-500/30 bg-sky-100 text-sky-700">
              <CheckSquare className="mr-1.5 h-3.5 w-3.5" />
              {isKo ? "준비물 체크" : "Checklist"}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isKo ? "딜러 갈 때 이거 챙기세요" : "What to Bring to the Dealer"}
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-sky-500" />
                  {isKo ? "누구나 필요한 것" : "Everyone"}
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-2">
                <ul className="space-y-3">
                  {currentChecklist.everyone.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-sky-200 dark:border-sky-900/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-sky-500" />
                  {isKo ? "비자 소지자 추가 서류" : "For Visa Holders"}
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-2">
                <ul className="space-y-3">
                  {currentChecklist.visa.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: FAQ */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-3 border-sky-500/30 bg-sky-100 text-sky-700">
              <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
              {isKo ? "자주 묻는 질문" : "FAQ"}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isKo
                ? "처음 사시는 분들이 제일 많이 물어보는 것들"
                : "FAQ for International Buyers"}
            </h2>
          </div>
          <div className="space-y-3">
            {currentFaqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {isKo
              ? "더 궁금한 거 있으세요?"
              : "Have Questions?"}
          </h2>
          <p className="mb-2 text-lg text-slate-300">
            {isKo
              ? "한국어든 영어든 편하게 물어보세요"
              : "Ask in Korean or English"}
          </p>
          <p className="mb-8 text-sky-400">
            카카오톡으로도 편하게 연락 주세요
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:984-242-1715"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-medium text-white transition-colors hover:bg-sky-600 sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              984-242-1715
            </a>
            <a
              href="sms:984-242-1715"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-500 px-6 py-3 font-medium text-slate-200 transition-colors hover:bg-slate-700 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              {isKo ? "문자하기" : "Text Me"}
            </a>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-500 px-6 py-3 font-medium text-slate-200 transition-colors hover:bg-slate-700 sm:w-auto"
            >
              <Globe className="h-4 w-4" />
              {isKo ? "연락 페이지" : "Contact Page"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
