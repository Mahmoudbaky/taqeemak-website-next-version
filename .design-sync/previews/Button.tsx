import { Button, Spinner } from "@taqeemak/ui";
import { ArrowLeftIcon, PlusIcon, SettingsIcon } from "lucide-react";

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>أطلب الان</Button>
    <Button variant="outline">عرض الباقات</Button>
    <Button variant="secondary">تعديل</Button>
    <Button variant="ghost">إلغاء</Button>
    <Button variant="destructive">تسجيل الخروج</Button>
    <Button variant="link">هل نسيت كلمة المرور ؟</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="xs">صغير جداً</Button>
    <Button size="sm">صغير</Button>
    <Button>افتراضي</Button>
    <Button size="lg">كبير</Button>
    <Button size="xl">أطلب الان</Button>
    <Button size="2xl">أحجز تجربة مجانية</Button>
  </div>
);

export const PageActions = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="xl" className="rounded-full px-6.5">
      أحجز تجربة مجانية
      <ArrowLeftIcon data-icon="inline-end" />
    </Button>
    <Button variant="outline" size="xl" className="rounded-full px-6.5">
      عرض الباقات
    </Button>
  </div>
);

export const OnNavy = () => (
  <div className="flex items-center gap-3 rounded-[20px] bg-navy p-6">
    <Button variant="white" size="xl">أطلب الان</Button>
    <span className="text-sm text-navy-muted">خصم محدود</span>
  </div>
);

export const IconsAndStates = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="icon" aria-label="إضافة"><PlusIcon /></Button>
    <Button variant="outline" size="icon-lg" aria-label="الإعدادات"><SettingsIcon /></Button>
    <Button size="xl" disabled>
      <Spinner />
      إرسال
    </Button>
    <Button size="xl" disabled>إرسال</Button>
  </div>
);
