import { useState } from "react";
import { DatePicker, Field, FieldLabel } from "@taqeemak/ui";

export const Empty = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Field className="max-w-[420px] gap-2">
      <FieldLabel htmlFor="rec-date" className="text-sm font-semibold">
        تاريخ الأستلام <span className="text-destructive">*</span>
      </FieldLabel>
      <DatePicker id="rec-date" value={date} onChange={setDate} placeholder="اختر التاريخ" />
    </Field>
  );
};

export const Selected = () => {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 18));
  return <div className="max-w-[420px]"><DatePicker value={date} onChange={setDate} placeholder="اختر التاريخ" /></div>;
};

export const Invalid = () => {
  const [date, setDate] = useState<Date | undefined>();
  return <div className="max-w-[420px]"><DatePicker value={date} onChange={setDate} placeholder="اختر التاريخ" invalid /></div>;
};
