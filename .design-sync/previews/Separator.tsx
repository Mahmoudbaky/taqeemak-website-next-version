import { Separator } from "@taqeemak/ui";

export const Horizontal = () => (
  <div className="flex max-w-[360px] flex-col gap-3">
    <span className="font-bold">المجموع الفرعي</span>
    <Separator />
    <span className="text-muted-foreground">الشحن يحسب عند الدفع</span>
  </div>
);

export const Vertical = () => (
  <div className="flex h-6 items-center gap-3 text-sm">
    <span>الرئيسية</span>
    <Separator orientation="vertical" />
    <span>نبذة عنا</span>
    <Separator orientation="vertical" />
    <span>تواصل معنا</span>
  </div>
);
