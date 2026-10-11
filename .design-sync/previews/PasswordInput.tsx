import { Field, FieldLabel, PasswordInput } from "@taqeemak/ui";

export const Default = () => (
  <Field className="max-w-[420px] gap-2">
    <FieldLabel htmlFor="pw" className="text-sm font-semibold">كلمة المرور</FieldLabel>
    <PasswordInput id="pw" defaultValue="Taqeemak2026" autoComplete="current-password" />
  </Field>
);

export const Empty = () => (
  <div className="max-w-[420px]">
    <PasswordInput placeholder="••••••••" autoComplete="new-password" />
  </div>
);
