"use client";

import { useState } from "react";
import { format } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useI18n } from "@/i18n/dictionary-provider";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder: string;
  invalid?: boolean;
};

export function DatePicker({ id, value, onChange, placeholder, invalid }: Props) {
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);
  const dateLocale = locale === "ar" ? arSA : enUS;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={id}
        aria-invalid={invalid}
        className={cn(
          "flex h-[46px] w-full items-center justify-between rounded-[10px] border border-input bg-background px-3.5 text-[15px] outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/25 aria-invalid:border-destructive",
          !value && "text-muted-foreground"
        )}
      >
        {value ? format(value, "PPP", { locale: dateLocale }) : placeholder}
        <CalendarIcon className="size-4 opacity-60" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          locale={dateLocale}
          disabled={{ before: today }}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
