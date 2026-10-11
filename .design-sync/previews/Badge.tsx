import { Badge } from "@taqeemak/ui";
import { CheckIcon } from "lucide-react";

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>خصم محدود</Badge>
    <Badge variant="secondary">تجربة مجانية</Badge>
    <Badge variant="outline">جديد</Badge>
    <Badge variant="destructive">منتهي</Badge>
    <Badge variant="ghost">مسودة</Badge>
  </div>
);

export const WithIcon = () => (
  <Badge variant="secondary">
    <CheckIcon data-icon="inline-start" />
    تم التحقق
  </Badge>
);
