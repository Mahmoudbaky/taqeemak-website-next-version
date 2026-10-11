import { useState } from "react";
import { Calendar } from "@taqeemak/ui";

export const Single = () => {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 18));
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 10, 1)}
      className="rounded-xl border"
    />
  );
};

export const Range = () => (
  <Calendar
    mode="range"
    defaultMonth={new Date(2026, 10, 1)}
    selected={{ from: new Date(2026, 10, 9), to: new Date(2026, 10, 14) }}
    className="rounded-xl border"
  />
);
