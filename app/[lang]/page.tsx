import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroKiosk } from "@/components/home/hero-kiosk";
import { Partners } from "@/components/home/partners";
import { ProductsGrid } from "@/components/home/products-grid";
import { LocaleLink } from "@/components/shared/locale-link";
import { Reveal } from "@/components/shared/reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const { home, common } = await getDictionary();

  const steps = [
    [home.s1, home.s1d],
    [home.s2, home.s2d],
    [home.s3, home.s3d],
  ];
  const packages = [
    { title: home.sw, icon: "/images/icon-software.svg", items: [home.sw1, home.sw2, home.sw3], dark: false },
    { title: home.hw, icon: "/images/icon-hardware.svg", items: [home.hw1, home.hw2, home.hw3], dark: true },
  ];

  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-14 px-4 pt-20 pb-22 sm:px-8">
        <Reveal className="flex flex-col gap-6.5">
          <span className="flex items-center gap-2 self-start rounded-full border bg-card py-1.5 ps-1.5 pe-3.5 text-sm font-semibold text-muted-foreground">
            <span className="rounded-full bg-highlight px-2.5 py-0.5 text-xs text-[#1E1E1E]">{common.limited}</span>
            {home.pill}
          </span>
          <h1 className="text-[clamp(40px,5.2vw,66px)] leading-[1.12] font-extrabold text-balance">
            {home.h1a} <span className="text-link">{home.h1b}</span>
          </h1>
          <p className="max-w-[560px] text-[19px] leading-[1.7] text-pretty text-muted-foreground">{home.sub}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="2xl">
              <LocaleLink href="/register">{common.bookTrial}</LocaleLink>
            </Button>
            <Button asChild size="2xl" variant="outline" className="bg-card hover:border-link hover:bg-card">
              <a href="#packages">{common.viewPackages}</a>
            </Button>
          </div>
        </Reveal>
        <HeroKiosk />
      </section>

      <Partners title={home.partners} />

      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-26 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="max-w-[640px] text-[clamp(32px,3.6vw,46px)] leading-[1.2] font-extrabold text-balance">
            {home.howTitle}
          </h2>
          <p className="max-w-[420px] text-lg leading-[1.7] text-muted-foreground">{home.howSub}</p>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {steps.map(([title, desc], i) => (
            <Reveal key={title} delay={i * 120} className="flex flex-col gap-3.5 rounded-[20px] border bg-card p-8">
              <span className="font-mono text-[15px] text-link">0{i + 1}</span>
              <span className="text-[23px] font-bold">{title}</span>
              <span className="leading-[1.7] text-muted-foreground">{desc}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="packages" className="mx-auto flex max-w-7xl flex-col gap-11 px-4 pb-26 sm:px-8">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-[clamp(32px,3.6vw,46px)] font-extrabold">
            {home.offerA}
            <span className="text-link">{home.offerB}</span>
            {home.offerC}
          </h2>
          <p className="text-lg text-muted-foreground">{home.offerSub}</p>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
          {packages.map((pkg, i) => (
            <Reveal
              key={pkg.title}
              delay={i * 120}
              className={cn(
                "flex flex-col gap-5.5 rounded-3xl border p-10",
                pkg.dark ? "bg-[#0A1E36] text-white" : "bg-card"
              )}
            >
              <div
                className={cn(
                  "flex size-[72px] items-center justify-center rounded-[18px]",
                  pkg.dark ? "bg-white/10" : "bg-soft"
                )}
              >
                <Image
                  src={pkg.icon}
                  alt=""
                  width={40}
                  height={40}
                  className={cn(pkg.dark && "brightness-0 invert")}
                />
              </div>
              <span className="text-[28px] font-extrabold">{pkg.title}</span>
              <ul className={cn("flex flex-col gap-3 text-[17px]", pkg.dark ? "text-[#C9D6E8]" : "text-muted-foreground")}>
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className={cn("size-2 flex-none rounded-full", pkg.dark ? "bg-highlight" : "bg-primary")} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <h3 className="mt-6 text-[28px] font-extrabold">{home.products}</h3>
        </Reveal>
        <ProductsGrid />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-22 sm:px-8">
        <Reveal className="flex flex-wrap items-center justify-between gap-10 rounded-[28px] bg-primary p-8 text-white sm:p-14">
          <div className="flex max-w-[700px] flex-col gap-3">
            <span className="text-[clamp(30px,3.4vw,42px)] font-extrabold">{home.tryTitle}</span>
            <span className="text-lg leading-[1.7] text-[#E3EEFF]">{home.tryDesc}</span>
          </div>
          <Button asChild variant="white" className="h-14 flex-none rounded-xl px-8 text-[17px] font-extrabold">
            <LocaleLink href="/register">{common.bookTrial}</LocaleLink>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
