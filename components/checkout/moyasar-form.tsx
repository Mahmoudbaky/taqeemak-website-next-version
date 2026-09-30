"use client";

import { useEffect, useRef, useState } from "react";
import "moyasar-payment-form/dist/moyasar.css";
import "./moyasar-form.css";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n/dictionary-provider";
import type { MoyasarInitConfig } from "moyasar-payment-form";
import type { MoyasarPaymentForm } from "@/types/api";

/**
 * Apple Pay only appears in Safari on Apple devices, over HTTPS, on a domain verified in the Moyasar dashboard.
 * Samsung Pay is enabled only when its merchant service ID is configured — without one the form refuses to render.
 */
const SAMSUNG_PAY_SERVICE_ID = process.env.NEXT_PUBLIC_MOYASAR_SAMSUNG_PAY_SERVICE_ID?.trim();

const METHODS: MoyasarInitConfig["methods"] = [
  "creditcard",
  "applepay",
  "stcpay",
  ...(SAMSUNG_PAY_SERVICE_ID ? (["samsungpay"] as const) : []),
];

/** Required when "applepay" is enabled. The label is shown on the Apple Pay sheet and must be English. */
const APPLE_PAY: MoyasarInitConfig["apple_pay"] = {
  country: "SA",
  label: "Taqeemak",
  // Moyasar's own merchant-validation endpoint (also the library default)
  validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
};
const NETWORKS: MoyasarInitConfig["supported_networks"] = [
  "mada",
  "visa",
  "mastercard",
];

/**
 * Embedded Moyasar payment form paying the invoice created by POST /checkout.
 * After 3-D Secure, Moyasar redirects to `callbackUrl` with `&id=…&status=…&message=…` appended.
 */
export function MoyasarForm({
  form,
  orderNumber,
  callbackUrl,
}: {
  form: MoyasarPaymentForm & { publishableKey: string };
  orderNumber: string;
  callbackUrl: string;
}) {
  const { locale, dict } = useI18n();
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let cancelled = false;

    // The library touches `window`, so it is only loaded in the browser.
    import("moyasar-payment-form")
      .then(({ default: Moyasar }) => {
        if (cancelled) return;
        element.replaceChildren();
        Moyasar.init({
          element,
          amount: form.amount,
          currency: form.currency,
          description: form.description,
          publishable_api_key: form.publishableKey,
          callback_url: callbackUrl,
          invoice_id: form.invoiceId,
          language: locale,
          methods: METHODS,
          apple_pay: APPLE_PAY,
          ...(SAMSUNG_PAY_SERVICE_ID && {
            samsung_pay: {
              service_id: SAMSUNG_PAY_SERVICE_ID,
              order_number: orderNumber,
              country: "SA",
              label: "Taqeemak",
              // Samsung's staging environment pairs with Moyasar test keys.
              environment: form.publishableKey.startsWith("pk_live_") ? "PRODUCTION" : "STAGE",
            },
          }),
          supported_networks: NETWORKS,
          fixed_width: false,
          metadata: { orderNumber },
        });
        setStatus("ready");
      })
      .catch((error) => {
        console.error("Failed to load Moyasar payment form", error);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      element.replaceChildren();
    };
  }, [form, orderNumber, callbackUrl, locale, attempt]);

  return (
    <div className="tq-moyasar rounded-2xl border bg-white p-5 text-[#0B1524] sm:p-6">
      {status === "loading" && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-11 rounded-[10px] bg-[#EEF3FA]" />
          <Skeleton className="h-11 rounded-[10px] bg-[#EEF3FA]" />
          <Skeleton className="h-11 rounded-[10px] bg-[#EEF3FA]" />
        </div>
      )}
      {status === "error" && (
        <div className="flex flex-col items-center gap-3 py-4 text-center text-sm text-[#526071]">
          {dict.checkout.formError}
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-[#0B1524]"
            onClick={() => {
              setStatus("loading");
              setAttempt((n) => n + 1);
            }}
          >
            {dict.common.retry}
          </Button>
        </div>
      )}
      <div ref={container} hidden={status !== "ready"} />
    </div>
  );
}
