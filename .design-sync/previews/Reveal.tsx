import { Reveal } from "@taqeemak/ui";

export const Staggered = () => (
  <div className="grid max-w-[640px] grid-cols-3 gap-4">
    {["شاشة التقييم", "التقارير", "الدعم"].map((t, i) => (
      <Reveal key={t} delay={i * 100} className="rounded-[20px] border bg-card p-5">
        <span className="font-bold">{t}</span>
      </Reveal>
    ))}
  </div>
);
