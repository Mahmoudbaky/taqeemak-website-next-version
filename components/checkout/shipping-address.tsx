"use client";

import { useWatch, type UseFormReturn } from "react-hook-form";
import { MapPinIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { FormField, TextField } from "@/components/forms/form-field";
import { PhoneInput } from "@/components/forms/phone-input";
import { useNationalAddressLookup } from "@/hooks/use-shipping";
import { useI18n } from "@/i18n/dictionary-provider";
import { SHORT_ADDRESS_PATTERN, type CheckoutValues } from "@/validators";

export const EMPTY_SHIPPING: NonNullable<CheckoutValues["shipping"]> = {
  receiverMobile: "",
  city: "",
  district: "",
  street: "",
  buildingNo: "",
  postalCode: "",
  shortAddress: "",
};

/** Delivery address for device orders, with Saudi National Address short-code autofill. */
export function ShippingAddress({ form }: { form: UseFormReturn<CheckoutValues> }) {
  const { checkout } = useI18n().dict;
  const lookup = useNationalAddressLookup();
  const shortAddress = useWatch({ control: form.control, name: "shipping.shortAddress" }) ?? "";
  const canLookup = SHORT_ADDRESS_PATTERN.test(shortAddress.trim());

  const fillFromShortAddress = () => {
    lookup.mutate(shortAddress.trim().toUpperCase(), {
      onSuccess: ({ data }) => {
        const fields = {
          city: data.city,
          district: data.district,
          street: data.street,
          buildingNo: data.buildingNo,
          postalCode: data.postalCode,
          shortAddress: data.shortAddress,
        } as const;
        for (const [key, value] of Object.entries(fields)) {
          if (value) {
            form.setValue(`shipping.${key as keyof typeof fields}`, value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }
        toast.success(checkout.addressFilled);
      },
      onError: () => toast.error(checkout.addressNotFound),
    });
  };

  return (
    <div className="flex flex-col gap-4 border-t pt-5">
      <div className="flex flex-col gap-1">
        <span className="font-bold">{checkout.shippingAddress}</span>
        <span className="text-sm text-muted-foreground">{checkout.shortAddressHint}</span>
      </div>

      <FormField
        control={form.control}
        name="shipping.shortAddress"
        label={checkout.shortAddress}
        render={({ value, ...field }) => (
          <div className="flex gap-2">
            <Input
              {...field}
              value={typeof value === "string" ? value : ""}
              dir="ltr"
              maxLength={8}
              placeholder="RGUC8214"
              autoComplete="off"
              className="font-mono uppercase"
            />
            <Button
              type="button"
              variant="outline"
              className="h-[46px] rounded-[10px] px-4 font-bold"
              disabled={!canLookup || lookup.isPending}
              onClick={fillFromShortAddress}
            >
              {lookup.isPending ? <Spinner /> : <MapPinIcon />}
              {checkout.fillAddress}
            </Button>
          </div>
        )}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <FormField
          control={form.control}
          name="shipping.receiverMobile"
          label={checkout.receiverMobile}
          required
          render={({ value, ...field }) => (
            <PhoneInput {...field} value={typeof value === "string" ? value : ""} autoComplete="tel" />
          )}
        />
        <TextField control={form.control} name="shipping.city" label={checkout.city} required inputProps={{ autoComplete: "address-level2" }} />
        <TextField control={form.control} name="shipping.district" label={checkout.district} required inputProps={{ autoComplete: "address-level3" }} />
        <TextField control={form.control} name="shipping.street" label={checkout.street} required inputProps={{ autoComplete: "address-line1" }} />
        <TextField control={form.control} name="shipping.buildingNo" label={checkout.buildingNo} inputProps={{ dir: "ltr", maxLength: 10 }} />
        <TextField
          control={form.control}
          name="shipping.postalCode"
          label={checkout.postalCode}
          inputProps={{ dir: "ltr", inputMode: "numeric", maxLength: 5, autoComplete: "postal-code" }}
        />
      </div>
    </div>
  );
}
