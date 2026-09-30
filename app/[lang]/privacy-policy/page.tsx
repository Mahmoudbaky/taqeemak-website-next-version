import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { Reveal } from "@/components/shared/reveal";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { privacy } = await getDictionary();
  return { title: privacy.title, description: privacy.sub };
}

export default async function PrivacyPolicyPage() {
  const { privacy, nav } = await getDictionary();

  return (
    <>
      <section className="relative overflow-hidden bg-[#0A1E36] text-white">
        <div className="pointer-events-none absolute -end-40 -top-55 size-160 rounded-full bg-[radial-gradient(circle,rgba(0,89,196,.55),rgba(0,89,196,0)_65%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-4.5 px-4 py-20 sm:px-8">
          <Reveal>
            <h1 className="text-[clamp(36px,4.4vw,56px)] font-extrabold">{privacy.title}</h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-[640px] text-xl leading-[1.7] text-[#B9C7DA]">{privacy.sub}</p>
          </Reveal>
        </div>
      </section>
      {/* TODO: replace with the real policy text once it is provided. */}
      <section className="mx-auto max-w-[880px] px-4 py-20 sm:px-8">
        <Reveal className="flex flex-col items-start gap-6 rounded-3xl border bg-card p-8 sm:p-10">
          <p className="text-lg leading-[1.9] text-muted-foreground">{privacy.placeholder}</p>
          <Button asChild size="xl">
            <LocaleLink href="/contact-us">{nav.contact}</LocaleLink>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
