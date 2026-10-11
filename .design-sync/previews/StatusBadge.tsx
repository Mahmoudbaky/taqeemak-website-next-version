import { StatusBadge } from "@taqeemak/ui";

export const Tones = () => (
  <div className="flex flex-wrap items-center gap-2">
    <StatusBadge tone="info">قيد الشحن</StatusBadge>
    <StatusBadge tone="success">تم التوصيل</StatusBadge>
    <StatusBadge tone="warn">بانتظار الدفع</StatusBadge>
    <StatusBadge tone="danger">ملغي</StatusBadge>
  </div>
);
