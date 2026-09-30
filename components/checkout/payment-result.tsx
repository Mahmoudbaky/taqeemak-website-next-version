"use client";

import { useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { ClockIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CheckBadge } from "@/components/shared/check-badge";
import { LocaleLink } from "@/components/shared/locale-link";
import { usePaymentStatus } from "@/hooks/use-checkout";
import { useI18n } from "@/i18n/dictionary-provider";
import { cn } from "@/lib/utils";
import { CHECKOUT_ORDER_KEY } from "./checkout-view";

const readStoredOrderNumber = () => {
  try {
    return sessionStorage.getItem(CHECKOUT_ORDER_KEY);
  } catch {
    return null;
  }
};

function StatusIcon({ tone }: { tone: "warn" | "danger" }) {
  const Icon = tone === "warn" ? ClockIcon : XIcon;
  return (
    <span
      className={cn(
        "flex size-[72px] items-center justify-center rounded-full",
        tone === "warn" ? "bg-warn-soft text-warn" : "bg-danger-soft text-destructive"
      )}
    >
      <Icon className="size-8" strokeWidth={2.4} />
    </span>
  );
}

export function PaymentResult() {
  const { dict } = useI18n();
  const { payment, checkout, common } = dict;
  const fromQuery = useSearchParams().get("orderNumber");
  const stored = useSyncExternalStore(() => () => {}, readStoredOrderNumber, () => null);
  const orderNumber = fromQuery ?? stored;
  const { data, isPending, isError, error, refetch, isFetching } = usePaymentStatus(orderNumber);

  const result = data?.data;
  const isCertificate = result?.productType?.toUpperCase() === "CERTIFICATE";

  const checkAgain = (
    <Button variant="outline" size="xl" onClick={() => refetch()} disabled={isFetching}>
      {isFetching && <Spinner />}
      {payment.checkAgain}
    </Button>
  );

  let content: React.ReactNode;
  if (!orderNumber) {
    content = (
      <>
        <StatusIcon tone="danger" />
        <h1 className="text-3xl font-extrabold">{payment.notFoundTitle}</h1>
      </>
    );
  } else if (isPending) {
    content = (
      <>
        <Spinner className="size-10 text-primary" />
        <p className="text-[17px] text-muted-foreground">{payment.verifying}</p>
      </>
    );
  } else if (isError) {
    content = (
      <>
        <StatusIcon tone="danger" />
        <h1 className="text-3xl font-extrabold">{payment.errorTitle}</h1>
        <p className="text-[17px] text-muted-foreground">{error.message}</p>
        {checkAgain}
      </>
    );
  } else if (result?.status === "PAID") {
    content = (
      <>
        <CheckBadge className="size-[72px] [&_svg]:size-[34px]" />
        <h1 className="text-3xl font-extrabold">{checkout.paidTitle}</h1>
        <p className="text-[17px] leading-[1.7] text-muted-foreground">
          {isCertificate ? payment.paidCertificateDesc : checkout.paidDesc}
        </p>
        <div className="mt-2 flex w-full justify-between rounded-xl border bg-background px-4.5 py-3.5">
          <span className="text-muted-foreground">{checkout.orderNo}</span>
          <span className="font-mono font-medium">{result.orderNumber}</span>
        </div>
      </>
    );
  } else if (result?.status === "PENDING") {
    content = (
      <>
        <StatusIcon tone="warn" />
        <h1 className="text-3xl font-extrabold">{payment.pendingTitle}</h1>
        <p className="text-[17px] leading-[1.7] text-muted-foreground">{payment.pendingDesc}</p>
        {checkAgain}
      </>
    );
  } else {
    content = (
      <>
        <StatusIcon tone="danger" />
        <h1 className="text-3xl font-extrabold">{payment.failedTitle}</h1>
        <p className="text-[17px] leading-[1.7] text-muted-foreground">{payment.failedDesc}</p>
        {result?.status === "FAILED" && result.message && (
          <p className="text-sm text-muted-foreground">{result.message}</p>
        )}
      </>
    );
  }

  const paid = result?.status === "PAID";

  return (
    <div className="mx-auto my-10 flex max-w-[560px] flex-col items-center gap-4 rounded-[28px] border bg-card p-8 text-center sm:p-12">
      {content}
      <div className="mt-2 flex flex-wrap justify-center gap-2.5">
        {paid && (
          <Button asChild size="xl">
            <LocaleLink href="/settings">{checkout.toAccount}</LocaleLink>
          </Button>
        )}
        {!paid && !isPending && orderNumber && result && result.status !== "PENDING" && (
          <Button asChild size="xl">
            <LocaleLink href="/">{payment.tryAgain}</LocaleLink>
          </Button>
        )}
        <Button asChild size="xl" variant="outline">
          <LocaleLink href="/">{common.backHome}</LocaleLink>
        </Button>
      </div>
    </div>
  );
}
