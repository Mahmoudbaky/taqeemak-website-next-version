"use client";

import { useEffect, useState } from "react";
import { KioskRating } from "@/components/shared/kiosk-rating";
import { Logo } from "@/components/shared/logo";
import { useI18n } from "@/i18n/dictionary-provider";

/** Animated feedback-kiosk mockup: the highlighted rating cycles every 1.6s. */
export function HeroKiosk() {
  const { dict } = useI18n();
  const [active, setActive] = useState(4);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((a) => (a + 1) % 5), 1600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[28px] bg-soft">
      <div className="flex animate-float flex-col items-center">
        <div className="w-[min(360px,80vw)] rounded-[30px] bg-[#0A1E36] p-3.5 shadow-[0_40px_80px_rgba(10,30,54,.25)]">
          <div className="flex flex-col items-center gap-4 rounded-[20px] bg-white px-[22px] pt-7 pb-6 text-[#0B1524]">
            <Logo className="h-[26px]" />
            <div className="text-center text-[21px] font-bold">{dict.home.kioskQ}</div>
            <KioskRating active={active} />
            <div dir="ltr" className="flex w-full justify-between text-[13px] text-[#526071]">
              <span>{dict.common.poor}</span>
              <span>{dict.common.excellent}</span>
            </div>
          </div>
        </div>
        <div className="h-[52px] w-[90px] bg-[#0A1E36]" />
        <div className="h-3 w-[220px] rounded-xl bg-[#0A1E36]" />
      </div>
      <div
        aria-live="polite"
        className="absolute end-6 bottom-7 flex flex-col gap-0.5 rounded-2xl border bg-card px-[18px] py-3.5 shadow-[0_20px_40px_rgba(10,30,54,.12)]"
      >
        <span className="text-[13px] font-semibold text-muted-foreground">{dict.home.answer}</span>
        <span className="text-[17px] font-bold">{dict.home.ratings[active]}</span>
      </div>
    </div>
  );
}
