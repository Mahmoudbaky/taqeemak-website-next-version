import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentResult } from "@/components/checkout/payment-result";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { checkout } = await getDictionary();
  return { title: checkout.title, robots: { index: false } };
}

export default function PaymentResultPage() {
  return (
    <div className="px-4 pt-16 pb-24 sm:px-8">
      <Suspense>
        <PaymentResult />
      </Suspense>
    </div>
  );
}
