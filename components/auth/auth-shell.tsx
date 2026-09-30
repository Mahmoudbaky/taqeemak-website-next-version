import { KioskRating } from "@/components/shared/kiosk-rating";
import { LogoChip } from "@/components/shared/logo";
import { Reveal } from "@/components/shared/reveal";
import type { Dictionary } from "@/i18n/dictionaries";

/** Two-column auth layout: navy brand panel + form card. */
export function AuthShell({ auth, children }: { auth: Dictionary["auth"]; children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-stretch gap-8 px-4 pt-14 pb-22 sm:px-8">
      <Reveal className="relative hidden min-h-[520px] flex-col justify-between gap-10 overflow-hidden rounded-[28px] bg-[#0A1E36] p-12 text-white md:flex">
        <div className="pointer-events-none absolute -end-35 -bottom-45 size-130 rounded-full bg-[radial-gradient(circle,rgba(0,89,196,.6),rgba(0,89,196,0)_65%)]" />
        <LogoChip className="relative" />
        <div className="relative flex max-w-[360px] flex-col gap-3.5 rounded-[20px] bg-white p-6 text-[#0B1524]">
          <span className="text-[19px] font-bold">{auth.panelQ}</span>
          <KioskRating active={4} size="sm" />
        </div>
        <span className="relative max-w-[440px] text-[clamp(24px,2.4vw,32px)] leading-[1.35] font-extrabold">
          {auth.panelD}
        </span>
      </Reveal>
      <Reveal delay={100} className="flex flex-col justify-center rounded-[28px] border bg-card p-6 sm:p-12">
        {children}
      </Reveal>
    </div>
  );
}
