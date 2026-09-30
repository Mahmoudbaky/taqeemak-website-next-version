"use client";

import PhoneInputBase, { type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = Omit<React.ComponentProps<"input">, "value" | "onChange" | "ref"> & {
  ref?: unknown;
  value?: string;
  onChange: (value: string) => void;
};

/** International phone input (defaults to Saudi Arabia). Always LTR, numbers read left-to-right. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- RHF ref targets the inner input, not the library wrapper
export function PhoneInput({ value, onChange, className, ref, ...props }: Props) {
  return (
    <PhoneInputBase
      {...props}
      dir="ltr"
      international
      defaultCountry="SA"
      value={(value || undefined) as Value | undefined}
      onChange={(v) => onChange(v ?? "")}
      inputComponent={Input}
      className={cn(
        "flex items-center gap-2 [&_.PhoneInputCountry]:h-[46px] [&_.PhoneInputCountry]:rounded-[10px] [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:bg-background [&_.PhoneInputCountry]:px-3",
        className
      )}
    />
  );
}
