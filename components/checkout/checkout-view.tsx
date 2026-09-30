"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { FieldLabelText, TextField } from "@/components/forms/form-field";
import { currencyLabel, ProductPhoto, productName } from "@/components/home/products-grid";
import { LocaleLink, useLocalizedHref } from "@/components/shared/locale-link";
import { Reveal } from "@/components/shared/reveal";
import { useCurrentUser } from "@/hooks/use-auth";
import { useOnlineCheckout } from "@/hooks/use-checkout";
import { useProducts } from "@/hooks/use-products";
import { useI18n } from "@/i18n/dictionary-provider";
import { checkoutSchema, type CheckoutValues } from "@/validators";
import type { MoyasarPaymentForm } from "@/types/api";
import { DatePicker } from "./date-picker";
import { MoyasarForm } from "./moyasar-form";

export const CHECKOUT_ORDER_KEY = "checkoutOrderNumber";
const MAX_QTY = 5;
const ORDER_FORM_ID = "checkout-order-form";

/** An order created on the backend, waiting to be paid with the embedded form. */
type PaymentSession = {
  orderNumber: string;
  callbackUrl: string;
  form: MoyasarPaymentForm & { publishableKey: string };
};

export function CheckoutView() {
  const { dict, locale } = useI18n();
  const { checkout, common } = dict;
  const router = useRouter();
  const pathname = usePathname();
  const productId = Number(useSearchParams().get("productId"));
  const localize = useLocalizedHref();
  const { isLoggedIn } = useCurrentUser();
  const { data, isPending } = useProducts({ page: 1, limit: 100 });
  const startCheckout = useOnlineCheckout();
  const [session, setSession] = useState<PaymentSession | null>(null);

  const product = productId ? data?.items.find((p) => p.Pr_ID === productId) : data?.items[0];

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema(checkout)),
    defaultValues: { qty: 1, person: "", recDate: undefined },
  });
  const qty = useWatch({ control: form.control, name: "qty" });

  if (isPending) {
    return (
      <div className="flex flex-wrap gap-6">
        <Skeleton className="h-[480px] flex-[2_1_520px] rounded-3xl" />
        <Skeleton className="h-64 flex-[1_1_300px] rounded-3xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-5 rounded-[28px] border bg-card p-12 text-center">
        <span className="text-3xl font-extrabold">{checkout.productNotFound}</span>
        <Button asChild size="xl">
          <LocaleLink href="/">{common.backHome}</LocaleLink>
        </Button>
      </div>
    );
  }

  const price = Number(product.Pr_Price) || 0;
  const currency = currencyLabel(product, locale, common.rs);
  const total = qty * price;
  const isRedirecting = startCheckout.isSuccess && !session;

  const onSubmit = (values: CheckoutValues) => {
    if (!isLoggedIn) {
      toast.error(dict.auth.loginRequired);
      router.push(`${localize("/login")}?next=${encodeURIComponent(`${pathname}?productId=${product.Pr_ID}`)}`);
      return;
    }
    startCheckout.mutate(
      {
        productId: product.Pr_ID,
        qty: values.qty,
        person: values.person,
        recDate: values.recDate.toISOString(),
      },
      {
        onSuccess: ({ data }) => {
          try {
            // Fallback for the result page if the gateway redirect drops orderNumber.
            sessionStorage.setItem(CHECKOUT_ORDER_KEY, data.orderNumber);
          } catch {}

          const { paymentForm } = data;
          if (paymentForm?.publishableKey) {
            const resultPath = `${localize("/payment/result")}?orderNumber=${encodeURIComponent(data.orderNumber)}`;
            setSession({
              orderNumber: data.orderNumber,
              callbackUrl: `${window.location.origin}${resultPath}`,
              form: { ...paymentForm, publishableKey: paymentForm.publishableKey },
            });
            return;
          }
          // Embedded form not configured on the backend: use the hosted invoice page.
          window.location.href = data.paymentUrl;
        },
        onError: (error) => toast.error(error.message),
      }
    );
  };

  return (
    // Not one <form>: the Moyasar widget renders its own form, and forms cannot be nested.
    <div className="flex flex-wrap items-start gap-6">
      <Reveal delay={60} className="min-w-0 flex-[2_1_520px] rounded-3xl border bg-card p-6 sm:p-8">
        <form id={ORDER_FORM_ID} onSubmit={form.handleSubmit(onSubmit)} noValidate>
          {/* Locked once the order exists; "change order details" unlocks it. */}
          <fieldset disabled={!!session} className="flex min-w-0 flex-col gap-6 disabled:opacity-70">
        <span className="text-xl font-extrabold">{checkout.details}</span>
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative size-30 flex-none overflow-hidden rounded-2xl border">
            <ProductPhoto product={product} sizes="120px" />
          </div>
          <div className="flex min-w-40 flex-1 flex-col gap-1.5">
            <span className="text-[22px] font-extrabold">{productName(product, locale)}</span>
            <span className="text-[17px] text-muted-foreground">
              {product.Pr_Price} {currency}
            </span>
          </div>
          <Controller
            control={form.control}
            name="qty"
            render={({ field }) => (
              <div className="flex flex-col items-start gap-2">
                <span className="text-[13px] font-semibold text-muted-foreground">{checkout.qty}</span>
                <div dir="ltr" className="flex items-center overflow-hidden rounded-xl border">
                  <button
                    type="button"
                    aria-label="-"
                    disabled={field.value <= 1}
                    onClick={() => field.onChange(field.value - 1)}
                    className="flex size-11 items-center justify-center hover:bg-soft disabled:opacity-35"
                  >
                    <MinusIcon className="size-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-extrabold" aria-live="polite">
                    {field.value}
                  </span>
                  <button
                    type="button"
                    aria-label="+"
                    disabled={field.value >= MAX_QTY}
                    onClick={() => field.onChange(field.value + 1)}
                    className="flex size-11 items-center justify-center hover:bg-soft disabled:opacity-35"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 border-t pt-5">
          <span className="font-bold">{common.description}</span>
          <span className="leading-[1.8] text-muted-foreground">
            {(locale === "ar" ? product.Pr_DescriptionAr : product.Pr_DescriptionEn) || checkout.productDesc}
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 border-t pt-5">
          <TextField control={form.control} name="person" label={checkout.receiver} required />
          <Controller
            control={form.control}
            name="recDate"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="recDate" className="text-sm font-semibold">
                  <FieldLabelText label={checkout.date} required />
                </FieldLabel>
                <DatePicker
                  id="recDate"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={common.pickDate}
                  invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
          </fieldset>
        </form>
      </Reveal>

      <Reveal
        delay={140}
        className="sticky top-24 flex flex-[1_1_300px] flex-col gap-4 rounded-3xl border bg-card p-7"
      >
        <span className="text-xl font-extrabold">{checkout.summary}</span>
        <div className="flex justify-between text-muted-foreground">
          <span>
            {checkout.subtotal} ({qty} × {price})
          </span>
          <span>
            {total} {currency}
          </span>
        </div>
        <div className="flex justify-between border-t pt-4 text-[22px] font-extrabold">
          <span>{checkout.total}</span>
          <span>
            {total} {currency}
          </span>
        </div>
        {session ? (
          <div className="flex flex-col gap-3 border-t pt-4">
            <span className="font-bold">{checkout.payTitle}</span>
            <span className="text-sm text-muted-foreground">{checkout.payHint}</span>
            <MoyasarForm form={session.form} orderNumber={session.orderNumber} callbackUrl={session.callbackUrl} />
            <Button
              variant="link"
              className="self-center"
              onClick={() => {
                // The unpaid order is abandoned; its invoice expires and the backend cancels it.
                setSession(null);
                startCheckout.reset();
              }}
            >
              {checkout.editOrder}
            </Button>
          </div>
        ) : (
          <Button
            type="submit"
            form={ORDER_FORM_ID}
            className="h-[52px] rounded-xl text-[17px] font-extrabold"
            disabled={startCheckout.isPending || isRedirecting}
          >
            {(startCheckout.isPending || isRedirecting) && <Spinner />}
            {isRedirecting ? checkout.redirecting : checkout.pay}
          </Button>
        )}
        <span className="text-center text-[13px] text-muted-foreground">{checkout.secure}</span>
      </Reveal>
    </div>
  );
}
