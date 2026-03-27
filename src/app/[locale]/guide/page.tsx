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
      title: "원하는 것을 파악하기",
      content:
        "먼저 결정하세요: 전액 현금으로 살 건지, 월 할부로 할 건지? 한국 분들 중 많은 분이 현금 일시불을 선호하시는데 아주 좋은 방법입니다! 할부를 원하시면 크레딧 점수(300~850)가 이자율을 결정합니다. 크레딧 기록이 없으세요? 시큐어드 신용카드를 만들어 매달 전액 결제하면 6개월 안에 점수가 쌓이기 시작합니다.",
    },
    {
      icon: DollarSign,
      title: "실제 예산 정하기",
      content:
        "할부 시: 금융 $1,000당 월 약 $20. $25,000 차 ≈ 월 $500. 다운페이먼트를 넣으면 월 납입금이 줄어요 — $25K 차에 $5,000 다운 → $20K 금융 ≈ 월 $400. 보험료($100~$300/월), 기름값($150~$250/월), NC 판매세(3%)도 잊지 마세요. 현금 구매 시: 차 가격 + 세금 + 수수료 = 최종 가격. 어떤 방식이든 총 비용으로 예산을 세우세요.",
    },
    {
      icon: Car,
      title: "\uc2e0\ucc28 vs \uc911\uace0 vs CPO \uc120\ud0dd",
      content:
        "\uc2e0\ucc28: \ud480 \uc6cc\ub7f0\ud2f0, \ucd5c\uc2e0 \uae30\ub2a5, \ub192\uc740 \uac00\uaca9. \uc911\uace0: \uc800\ub834\ud558\uc9c0\ub9cc \ucc28\ub7c9 \uc774\ub825 \ud655\uc778 \ud544\uc218(Carfax). CPO(\uc778\uc99d \uc911\uace0\ucc28): \uc81c\uc870\uc0ac \uc6cc\ub7f0\ud2f0\uac00 \ud3ec\ud568\ub41c \uc911\uace0\ucc28 \u2014 \uc7a5\uc810\ub9cc \ubaa8\uc740 \uc120\ud0dd. \ucc38\uace0\ub85c Kia\ub294 \uc2e0\ucc28\uc5d0 10\ub144/10\ub9cc \ub9c8\uc77c \ud30c\uc6cc\ud2b8\ub808\uc778 \uc6cc\ub7f0\ud2f0\ub97c \uc81c\uacf5\ud569\ub2c8\ub2e4.",
    },
    {
      icon: ClipboardCheck,
      title: "\uc2dc\uc2b9\ud558\uae30",
      content:
        "\uc2dc\uc2b9\uc740 100% \ubb34\ub8cc\uc774\uace0 \uc758\ubb34\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. \uace0\uc18d\ub3c4\ub85c\uc640 \uc8fc\ucc28\uc7a5 \ubaa8\ub450\uc5d0\uc11c \uc6b4\uc804\ud574 \ubcf4\uc138\uc694. \uac00\uc871\ub3c4 \ub370\ub824\uc624\uc138\uc694 \u2014 \uce74\uc2dc\ud2b8\uac00 \ub9de\ub294\uc9c0, \ubaa8\ub450 \ud3b8\ud55c\uc9c0 \ud655\uc778\ud558\uc138\uc694. \ucc9c\ucc9c\ud788 \ud558\uc138\uc694. \uc88b\uc740 \uc138\uc77c\uc988\ub9e8\uc740 \uc808\ub300 \uc11c\ub450\ub974\uac8c \ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.",
    },
    {
      icon: Handshake,
      title: "가격 협상하기",
      content:
        "많은 딜러들이 가격을 올려놓고 협상을 기대하지만, Fred Anderson에서는 온라인에 최적의 가격을 미리 보여드립니다. 중고차의 경우 대부분 가격이 정해져 있지만, 차량에 따라 세일즈 매니저가 약간의 할인을 해줄 수 있는 여지가 있을 수 있어요. 편하게 물어보세요 — 최악의 경우 안 된다고 하는 거니까요.",
    },
    {
      icon: FileText,
      title: "\uc11c\ub958 \uc791\uc131 & \ucd9c\uace0",
      content:
        "F&I(\ud30c\uc774\ub09c\uc2a4 & \ubcf4\ud5d8) \uc0ac\ubb34\uc2e4\uc5d0\uc11c \ucd94\uac00 \uc0c1\ud488\uc744 \uad8c\uc720\ud569\ub2c8\ub2e4: \uc5f0\uc7a5 \uc6cc\ub7f0\ud2f0, \ud398\uc778\ud2b8 \ubcf4\ud638, \uac2d \ubcf4\ud5d8 \ub4f1. \ub2e4\uc6b4\ud398\uc774\uba3c\ud2b8\uac00 \uc801\uc740 \uacbd\uc6b0 \uac2d \ubcf4\ud5d8\uc740 \uac00\uce58\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ud398\uc778\ud2b8 \ubcf4\ud638\ub098 \uc9c1\ubb3c \ucf54\ud305? \ub300\ubd80\ubd84 \ud544\uc694 \uc5c6\uc2b5\ub2c8\ub2e4. \uc11c\uba85 \uc804\uc5d0 \ubaa8\ub4e0 \uac83\uc744 \uaf3c\uaf3c\ud788 \uc77d\uc73c\uc138\uc694.",
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
      title: "\uc694\uc694 \ud30c\uc774\ub09c\uc2f1",
      what: "\ucc28\ub97c \ud0c0\uace0 \uc9d1\uc5d0 \uac14\ub294\ub370, \ub51c\ub7ec\uac00 \uc804\ud654\ud574\uc11c \ud30c\uc774\ub09c\uc2f1\uc774 \"\uc548 \ub410\ub2e4\"\uba70 \ub354 \ub192\uc740 \uc774\uc790\uc728\ub85c \uc0c8 \uacc4\uc57d\uc744 \ud558\ub77c\uace0 \ud569\ub2c8\ub2e4.",
      protect:
        "\ud30c\uc774\ub09c\uc2f1\uc774 100% \uc11c\uba74\uc73c\ub85c \ud655\uc778\ub420 \ub54c\uae4c\uc9c0 \ucc28\ub97c \uac00\uc838\uac00\uc9c0 \ub9c8\uc138\uc694. \ub2e4\uc2dc \uc804\ud654\uac00 \uc624\uba74, \ucc28\ub97c \ubc18\ub0a9\ud558\uace0 \ub3c8\uc744 \ub3cc\ub824\ubc1b\uc744 \ubc95\uc801 \uad8c\ub9ac\uac00 \uc788\uc2b5\ub2c8\ub2e4.",
    },
    {
      title: "\ubbf8\ub07c \uc0c1\uc220 (Bait-and-Switch)",
      what: "\uc628\ub77c\uc778 \uac00\uaca9\uc740 \uc88b\uc544 \ubcf4\uc774\ub294\ub370, \ub3c4\ucc29\ud558\uba74 \"\uc2dc\uc7a5 \uc870\uc815\" \ub610\ub294 \"\ud544\uc218 \ud328\ud0a4\uc9c0\" \ub54c\ubb38\uc5d0 \uac00\uaca9\uc774 \uac11\uc790\uae30 \uc62c\ub77c\uac11\ub2c8\ub2e4.",
      protect:
        "\uac00\uae30 \uc804\uc5d0 \uc628\ub77c\uc778 \uac00\uaca9\uc744 \uc2a4\ud06c\ub9b0\uc0f7 \ud558\uc138\uc694. \ubb38\uc790\ub098 \uc774\uba54\uc77c\ub85c \uac00\uaca9\uc744 \ud655\uc778\ubc1b\uc73c\uc138\uc694. \uac00\uaca9\uc774 \ubc14\ub00c\uba74, \ub5a0\ub098\uc138\uc694.",
    },
    {
      title: "\ubd88\ud544\uc694\ud55c \ucd94\uac00 \uc0c1\ud488",
      what: "\ud398\uc778\ud2b8 \ubcf4\ud638, \uc9c1\ubb3c \ucf54\ud305, VIN \uac01\uc778, \uc9c8\uc18c \ud0c0\uc774\uc5b4 \u2014 \ub9c8\uc9c4\uc774 \ub192\uace0 \ub300\ubd80\ubd84 \uac00\uce58\uac00 \uc5c6\ub294 \uc0c1\ud488\ub4e4\uc785\ub2c8\ub2e4.",
      protect:
        "\ubaa8\ub4e0 \ucd94\uac00 \uc0c1\ud488\uc740 \uac70\uc808\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ucd94\uac00 \uc5c6\ub294 \uac00\uaca9\uc744 \uc694\uccad\ud558\uc138\uc694. \uac2d \ubcf4\ud5d8\uc774 \ud544\uc694\ud558\uba74 \uc9c1\uc811 \ube44\uad50\ud574 \ubcf4\uc138\uc694 \u2014 \ubcf4\ud5d8\ud68c\uc0ac\uac00 \ub354 \uc800\ub834\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
    },
    {
      title: "\"\ub9e4\ub2c8\uc800\uc640 \uc598\uae30\ud574 \ubcfc\uac8c\uc694\"",
      what: "\uae30\ub2e4\ub9ac\uac8c \ud558\uace0 \uc2ec\ub9ac\uc801\uc73c\ub85c \ubb36\uc5b4\ub450\ub824\ub294 \uc555\ubc15 \uc804\uc220\uc785\ub2c8\ub2e4. \uc138\uc77c\uc988\ub9e8\uc774 \"\uc88b\uc740 \ub51c\uc744 \uc704\ud574 \uc2f8\uc6cc\uc8fc\ub294\" \ucc99\ud558\uc9c0\ub9cc, \uac00\uaca9\uc740 \uc774\ubbf8 \uc815\ud574\uc838 \uc788\uc5c8\uc2b5\ub2c8\ub2e4.",
      protect:
        "\uadf8 \ud37c\ud3ec\uba3c\uc2a4\uc5d0 \uc555\ubc15\uac10\uc744 \ub290\ub07c\uc9c0 \ub9c8\uc138\uc694. \uc608\uc0b0\uc744 \uc54c\uace0, \uacf5\uc815 \uc2dc\uc7a5 \uac00\uaca9\uc744 \uc54c\uace0(KBB\ub098 Edmunds \ucc38\uace0), \uc790\uc2e0\uc758 \uc22b\uc790\ub97c \uc9c0\ud0a4\uc138\uc694. \ub5a0\ub098\ub3c4 \ub429\ub2c8\ub2e4.",
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
      "\uc720\ud6a8\ud55c \uc6b4\uc804\uba74\ud5c8\uc99d \ub610\ub294 \uc5ec\uad8c",
      "\uc18c\ub4dd \uc99d\uba85 (\ucd5c\uadfc \uae09\uc5ec \uba85\uc138\uc11c 2\uc7a5)",
      "\uac70\uc8fc \uc99d\uba85 (\uacf5\uacfc\uae08 \uace0\uc9c0\uc11c \ub610\ub294 \uc784\ub300\ucc28 \uacc4\uc57d\uc11c)",
      "\ubcf4\ud5d8 \uc815\ubcf4 (\ub610\ub294 \uacac\uc801 \ubc1b\uc744 \uc900\ube44)",
      "\ud2b8\ub808\uc774\ub4dc\uc778 \ucc28\ub7c9 \ud0c0\uc774\ud2c0 (\ud574\ub2f9\ub418\ub294 \uacbd\uc6b0)",
      "\uacc4\uc57d\uae08 (\uac1c\uc778 \uc218\ud45c \ub610\ub294 \uacc4\uc88c\uc774\uccb4 \uac00\ub2a5)",
    ],
    visa: [
      "\uc720\ud6a8\ud55c \ube44\uc790\uac00 \uc788\ub294 \uc5ec\uad8c",
      "I-94 \uc785\ucd9c\uad6d \uae30\ub85d",
      "SSN \ub610\ub294 ITIN (\uac1c\uc778 \ub0a9\uc138\uc790 \uc2dd\ubcc4\ubc88\ud638)",
      "\ud68c\uc0ac \uc7ac\uc9c1 \uc99d\uba85\uc11c",
      "\ubbf8\uad6d \uc8fc\uc18c \uc99d\uba85",
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
      q: "F-1 \ud559\uc0dd\ube44\uc790\ub85c \ucc28\ub97c \uc0b4 \uc218 \uc788\ub098\uc694?",
      a: "\ub124! F-1 \ube44\uc790\ub85c \ucc28\ub97c \uc0b4 \uc218 \uc788\uc2b5\ub2c8\ub2e4. SSN(\uad50\ub0b4 \uadfc\ubb34 \uc2dc) \ub610\ub294 ITIN\uc774 \ud544\uc694\ud569\ub2c8\ub2e4. \ud559\uc0dd\uacfc \uc790\uc8fc \uac70\ub798\ud558\ub294 \ub51c\ub7ec\ub4e4\uc740 \uc808\ucc28\ub97c \uc798 \uc54c\uace0 \uc788\uc5b4\uc694. \uc81c\uac00 \ub2e8\uacc4\ubcc4\ub85c \uc548\ub0b4\ud574 \ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4.",
    },
    {
      q: "H-1B \ucde8\uc5c5\ube44\uc790\ub85c \ucc28\ub97c \uc0b4 \uc218 \uc788\ub098\uc694?",
      a: "\ubb3c\ub860\uc774\uc8e0. H-1B\uac00 \uc788\uc73c\uba74 \ub300\ubd80\ubd84\uc758 \uc740\ud589\uc5d0\uc11c \ud30c\uc774\ub09c\uc2f1\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4. \uc7ac\uc9c1 \uc99d\uba85\uc11c, \ucd5c\uadfc \uae09\uc5ec \uba85\uc138\uc11c, \uc8fc\uc18c \uc99d\uba85\uc744 \uc900\ube44\ud574 \uc624\uc138\uc694. \uc548\uc815\uc801\uc778 \uace0\uc6a9 \uc0c1\ud0dc\uac00 \ud30c\uc774\ub09c\uc2f1\uc744 \uc218\uc6d4\ud558\uac8c \ub9cc\ub4e4\uc5b4\uc90d\ub2c8\ub2e4.",
    },
    {
      q: "\uc18c\uc15c\uc2dc\ud050\ub9ac\ud2f0 \ubc88\ud638(SSN)\uac00 \uaf2d \ud544\uc694\ud55c\uac00\uc694?",
      a: "\ubc18\ub4dc\uc2dc \ud544\uc694\ud558\uc9c4 \uc54a\uc2b5\ub2c8\ub2e4. ITIN(\uac1c\uc778 \ub0a9\uc138\uc790 \uc2dd\ubcc4\ubc88\ud638)\uc73c\ub85c\ub3c4 \ub429\ub2c8\ub2e4. IRS\uc5d0\uc11c ITIN\uc744 \uc2e0\uccad\ud560 \uc218 \uc788\uc5b4\uc694. \uc77c\ubd80 \ud06c\ub808\ub527 \uc720\ub2c8\uc628\uc740 ITIN \ubcf4\uc720\uc790\uc5d0\uac8c\ub3c4 \uc790\ub3d9\ucc28 \ub860\uc744 \uc81c\uacf5\ud569\ub2c8\ub2e4.",
    },
    {
      q: "\ud55c\uad6d\uc5d0 \uc788\ub294 \uac00\uc871\uc774 \ubcf4\uc99d\uc778\uc774 \ub420 \uc218 \uc788\ub098\uc694?",
      a: "\uc77c\ubc18\uc801\uc73c\ub85c \ubcf4\uc99d\uc778\uc740 \ubbf8\uad6d \uac70\uc8fc\uc790\uc5ec\uc57c \ud558\uace0 \ubbf8\uad6d \ud06c\ub808\ub527 \uae30\ub85d\uc774 \ud544\uc694\ud569\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \ud070 \ub2e4\uc6b4\ud398\uc774\uba3c\ud2b8\ub97c \ud558\uac70\ub098 \ud2b9\uc815 \ub80c\ub354\ub97c \uc774\uc6a9\ud558\uba74 \ubc29\ubc95\uc774 \uc788\uc2b5\ub2c8\ub2e4. \uc81c\uac00 \uc635\uc158\uc744 \ucc3e\uc544\ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4.",
    },
    {
      q: "2\ub144 \ud6c4 \ud55c\uad6d\uc5d0 \ub3cc\uc544\uac00\ub294\ub370 \u2014 \ub9ac\uc2a4\uac00 \ub098\uc744\uae4c\uc694, \uad6c\ub9e4\uac00 \ub098\uc744\uae4c\uc694?",
      a: "2~3\ub144 \ub9ac\uc2a4\uac00 \ub531 \ub9de\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ub05d\ub098\uba74 \ucc28\ub97c \ubc18\ub0a9\ud558\uba74 \ub418\ub2c8 \ud310\ub9e4 \uac71\uc815\uc774 \uc5c6\uc5b4\uc694. \ub2e4\ub9cc \uc8fc\ud589\uac70\ub9ac \uc81c\ud55c(\ubcf4\ud1b5 \uc5f0 10,000~12,000\ub9c8\uc77c)\uc744 \ud655\uc778\ud558\uc138\uc694.",
    },
    {
      q: "\ud55c\uad6d \uc6b4\uc804\uba74\ud5c8\uc99d\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub098\uc694?",
      a: "\ud55c\uad6d \uba74\ud5c8\ub85c \uc77c\uc2dc\uc801\uc73c\ub85c \uc6b4\uc804\ud560 \uc218 \uc788\uc9c0\ub9cc, \uac00\ub2a5\ud55c \ube68\ub9ac NC \uc6b4\uc804\uba74\ud5c8\ub97c \ucde8\ub4dd\ud558\uc138\uc694. \ub300\ubd80\ubd84\uc758 \ubcf4\ud5d8\ud68c\uc0ac\uac00 \ubbf8\uad6d \uba74\ud5c8\ub97c \uc694\uad6c\ud558\uace0, \ubaa8\ub4e0 \uac83\uc774 \uc218\uc6d4\ud574\uc9d1\ub2c8\ub2e4. NC DMV \uc808\ucc28\ub294 \uac04\ub2e8\ud569\ub2c8\ub2e4.",
    },
    {
      q: "\uc601\uc5b4\uac00 \ubd80\uc871\ud574\uc11c \uc11c\ub958 \uc791\uc5c5\uc774 \uac71\uc815\ub418\ub294\ub370\uc694?",
      a: "\ubc14\ub85c \uadf8\ub798\uc11c \uc81c\uac00 \uc5ec\uae30 \uc788\ub294 \uac81\ub2c8\ub2e4. \uc11c\uba85\ud558\ub294 \ubaa8\ub4e0 \uc11c\ub958\ub97c \ud55c\uad6d\uc5b4\ub85c \uc124\uba85\ud574 \ub4dc\ub9bd\ub2c8\ub2e4. \uc644\uc804\ud788 \uc774\ud574\ud558\uc9c0 \ubabb\ud558\ub294 \uac83\uc5d0 \uc11c\uba85\ud558\ub294 \uc77c\uc740 \uc5c6\uc5b4\uc57c \ud569\ub2c8\ub2e4.",
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
                ? "\"\uc11c\ub958\ub97c \uc774\ud574\ud560 \uc218 \uc5c6\ub294 \uadf8 \ub290\ub08c, \uc800\ub3c4 \uc54c\uc544\uc694. \uc800\ub3c4 \uacaa\uc5c8\uc73c\ub2c8\uae4c\uc694.\""
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
                ? "\ubbf8\uad6d\uc5d0\uc11c \ucc28 \uc0ac\ub294 7\ub2e8\uacc4"
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
              {isKo ? "\uc8fc\uc758\ud558\uc138\uc694" : "Watch Out"}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isKo ? "\ud53c\ud574\uc57c \ud560 \ud754\ud55c \ud568\uc815\ub4e4" : "Common Traps to Avoid"}
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
                      {isKo ? "\ubb34\uc5c7\uc778\uac00?" : "What is it?"}
                    </p>
                    <p className="text-sm text-muted-foreground">{trap.what}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                      {isKo ? "\uc5b4\ub5bb\uac8c \ubcf4\ud638\ud558\ub098?" : "How to protect yourself"}
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
              {isKo ? "\uc900\ube44\ubb3c \uccb4\ud06c\ub9ac\uc2a4\ud2b8" : "Checklist"}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isKo ? "\ub51c\ub7ec \ubc29\ubb38 \uc2dc \uc900\ube44\ubb3c" : "What to Bring to the Dealer"}
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-sky-500" />
                  {isKo ? "\ubaa8\ub4e0 \ubd84" : "Everyone"}
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
                  {isKo ? "\ube44\uc790 \uc18c\uc9c0\uc790 \ucd94\uac00 \uc11c\ub958" : "For Visa Holders"}
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
              {isKo ? "\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38" : "FAQ"}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {isKo
                ? "\uc678\uad6d\uc778 \uad6c\ub9e4\uc790 FAQ"
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
              ? "\uad81\uae08\ud55c \uc810\uc774 \uc788\uc73c\uc2e0\uac00\uc694?"
              : "Have Questions?"}
          </h2>
          <p className="mb-2 text-lg text-slate-300">
            {isKo
              ? "\ud55c\uad6d\uc5b4 \ub610\ub294 \uc601\uc5b4\ub85c \ubb3c\uc5b4\ubcf4\uc138\uc694"
              : "Ask in Korean or English"}
          </p>
          <p className="mb-8 text-sky-400">
            \uce74\uce74\uc624\ud1a1\uc73c\ub85c \ubb38\uc758\ud558\uc138\uc694
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
              {isKo ? "\ubb38\uc790 \ubcf4\ub0b4\uae30" : "Text Me"}
            </a>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-500 px-6 py-3 font-medium text-slate-200 transition-colors hover:bg-slate-700 sm:w-auto"
            >
              <Globe className="h-4 w-4" />
              {isKo ? "\uc5f0\ub77d \ud398\uc774\uc9c0" : "Contact Page"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
