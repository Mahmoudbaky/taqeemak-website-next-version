import { Input, Label } from "@taqeemak/ui";

export const WithInput = () => (
  <div className="flex max-w-[420px] flex-col gap-2">
    <Label htmlFor="lbl-name" className="text-sm font-semibold">أسم المستلم</Label>
    <Input id="lbl-name" placeholder="أسم المستلم" />
  </div>
);

export const Required = () => (
  <Label className="text-sm font-semibold">
    رقم الهاتف <span className="text-destructive">*</span>
  </Label>
);
