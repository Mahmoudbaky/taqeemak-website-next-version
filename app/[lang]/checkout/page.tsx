import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { Reveal } from "@/components/shared/reveal";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { checkout } = await getDictionary();
  return { title: checkout.title, robots: { index: false } };
}

export default async function CheckoutPage() {
  const { checkout } = await getDictionary();

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-7 px-4 pt-16 pb-24 sm:px-8">
      <Reveal>
        <h1 className="text-[clamp(32px,3.6vw,44px)] font-extrabold">{checkout.title}</h1>
      </Reveal>
      <Suspense>
        <CheckoutView />
      </Suspense>
    </div>
  );
}
