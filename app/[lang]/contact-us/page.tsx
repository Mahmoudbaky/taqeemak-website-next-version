import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import decoration from "@/public/images/contact-decoration.png";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getDictionary();
  return { title: contact.form, description: contact.sub };
}

export default async function ContactPage() {
  const { contact } = await getDictionary();
  const channels = [
    [contact.email, siteConfig.email],
    [contact.whatsapp, siteConfig.whatsapp],
    [contact.call, siteConfig.phone],
  ];

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12 px-4 pt-20 pb-24 sm:px-8">
      <div className="flex flex-col gap-7">
        <Reveal className="flex flex-col gap-3.5">
          <span className="font-mono text-sm text-link">{contact.form}</span>
          <h1 className="text-[clamp(36px,4.4vw,56px)] leading-[1.15] font-extrabold text-balance">{contact.title}</h1>
          <p className="text-[19px] leading-[1.7] text-muted-foreground">{contact.sub}</p>
        </Reveal>
        <Reveal delay={120} className="relative flex flex-col gap-5.5 overflow-hidden rounded-3xl bg-[#0A1E36] p-8 text-white">
          <Image src={decoration} alt="" className="absolute end-0 top-0 w-40 opacity-50" />
          <span className="relative text-xl font-bold">{contact.via}</span>
          <dl className="relative flex flex-col gap-0.5">
            {channels.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-white/12 py-3.5 last:border-0">
                <dt className="text-navy-muted">{label}</dt>
                <dd dir="ltr">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="relative flex flex-wrap gap-2.5 text-sm font-semibold">
            {siteConfig.social.slice(0, 3).map((s) => (
              <a key={s.label} href={s.href} className="rounded-full border border-white/20 px-3.5 py-2 text-white hover:bg-white/10">
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal delay={80} className="rounded-3xl border bg-card p-6 sm:p-9">
        <ContactForm />
      </Reveal>
    </div>
  );
}
