"use client";

import { useLocale } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";

export function ContactButtons() {
  const locale = useLocale();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {locale === "ko" && (
        <a
          href="https://open.kakao.com/o/sXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-lg transition-transform hover:scale-110"
          aria-label="KakaoTalk"
        >
          <span className="text-lg font-bold">K</span>
        </a>
      )}
      <a
        href="https://wa.me/19842421715"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href="tel:+19842421715"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Call"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
