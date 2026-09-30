import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/require-auth";
import { Reveal } from "@/components/shared/reveal";
import { TicketForm } from "@/components/support/ticket-form";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { support } = await getDictionary();
  return { title: support.title, description: support.sub };
}

export default async function SupportPage() {
  const { nav, support } = await getDictionary();

  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-9 px-4 pt-20 pb-24 sm:px-8">
      <Reveal className="flex flex-col gap-3.5">
        <span className="font-mono text-sm text-link">{nav.support}</span>
        <h1 className="text-[clamp(36px,4.4vw,56px)] font-extrabold">{support.title}</h1>
        <p className="max-w-[720px] text-[19px] leading-[1.7] text-muted-foreground">{support.sub}</p>
      </Reveal>
      <Reveal delay={80} className="rounded-3xl border bg-card p-6 sm:p-9">
        <RequireAuth>
          <TicketForm />
        </RequireAuth>
      </Reveal>
    </div>
  );
}
