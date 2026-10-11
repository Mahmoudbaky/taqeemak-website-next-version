import { Input } from "@taqeemak/ui";

export const Default = () => (
  <div className="flex max-w-[420px] flex-col gap-3">
    <Input placeholder="الاسم" />
    <Input defaultValue="محمد العتيبي" />
  </div>
);

export const LtrValue = () => (
  <div className="flex max-w-[420px] flex-col gap-3">
    <Input type="email" dir="ltr" placeholder="name@company.com" />
    <Input type="text" dir="ltr" defaultValue="1010987654" />
  </div>
);

export const States = () => (
  <div className="flex max-w-[420px] flex-col gap-3">
    <Input aria-invalid defaultValue="mohammed@" dir="ltr" />
    <Input disabled defaultValue="غير قابل للتعديل" />
  </div>
);
