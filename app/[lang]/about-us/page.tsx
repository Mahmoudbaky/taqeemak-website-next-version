import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import vision from "@/public/images/about-vision.webp";
import mission from "@/public/images/about-mission.webp";
import values from "@/public/images/about-values.webp";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getDictionary();
  return { title: about.title, description: about.sub };
}

export default async function AboutPage() {
  const { about } = await getDictionary();
  const blocks = [
    { title: about.vision, desc: about.visionD, img: vision },
    { title: about.mission, desc: about.missionD, img: mission },
    { title: about.values, desc: about.valuesD, img: values },
  ];
  const valueCards = [about.v1, about.v2, about.v3, about.v4];

  return (
    <>
      <section className="relative overflow-hidden bg-[#0A1E36] text-white">
        <div className="pointer-events-none absolute -end-40 -top-55 size-160 rounded-full bg-[radial-gradient(circle,rgba(0,89,196,.55),rgba(0,89,196,0)_65%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-4.5 px-4 py-24 sm:px-8">
          <Reveal className="font-mono text-sm text-[#96C6FF]">TAQEEMAK</Reveal>
          <Reveal delay={60}>
            <h1 className="text-[clamp(40px,5vw,64px)] font-extrabold">{about.title}</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[640px] text-xl leading-[1.7] text-[#B9C7DA]">{about.sub}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-24 sm:px-8">
        {blocks.map((block, i) => (
          <div
            key={block.title}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-14"
          >
            <Reveal className={cn("relative p-5", i % 2 && "md:order-2")}>
              <div className="absolute inset-0 end-12 bottom-12 rounded-3xl bg-soft" />
              <Image
                src={block.img}
                alt=""
                sizes="(min-width: 1024px) 560px, 100vw"
                className="relative h-auto w-full rounded-[18px] shadow-[0_30px_60px_rgba(10,30,54,.18)]"
              />
            </Reveal>
            <Reveal delay={120} className={cn("flex flex-col gap-4.5", i % 2 && "md:order-1")}>
              <span className="font-mono text-[15px] text-link">0{i + 1}</span>
              <h2 className="text-[clamp(30px,3.2vw,42px)] font-extrabold">{block.title}</h2>
              <p className="text-lg leading-[1.9] text-pretty text-muted-foreground">{block.desc}</p>
            </Reveal>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {valueCards.map((label, i) => (
            <Reveal
              key={label}
              delay={i * 90}
              className="flex min-h-40 flex-col justify-between gap-7 rounded-[20px] border bg-card p-7"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary font-mono text-sm text-white">
                0{i + 1}
              </span>
              <span className="text-xl font-bold">{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-10 rounded-[28px] bg-soft p-8 sm:p-14">
          <h2 className="text-[clamp(30px,3.2vw,42px)] font-extrabold">{about.fb}</h2>
          <p className="text-lg leading-[1.9] text-muted-foreground">{about.fbD}</p>
        </Reveal>
      </section>
    </>
  );
}
