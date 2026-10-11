import { useState } from "react";
import { Field, FieldLabel, PhoneInput } from "@taqeemak/ui";

export const Default = () => {
  const [value, setValue] = useState("+966501234567");
  return (
    <Field className="max-w-[420px] gap-2">
      <FieldLabel htmlFor="phone" className="text-sm font-semibold">رقم الهاتف</FieldLabel>
      <PhoneInput id="phone" value={value} onChange={setValue} autoComplete="tel" />
    </Field>
  );
};

export const Empty = () => {
  const [value, setValue] = useState("");
  return <PhoneInput className="max-w-[420px]" value={value} onChange={setValue} placeholder="5x xxx xxxx" />;
};
