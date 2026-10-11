import { Textarea } from "@taqeemak/ui";

export const Default = () => (
  <Textarea className="max-w-[520px]" placeholder="أريد التواصل مع خدمة العملاء" />
);

export const Tall = () => (
  <Textarea
    className="min-h-[140px] max-w-[520px]"
    defaultValue="جهاز التقييم في فرع الرياض لا يعرض الأسئلة منذ صباح اليوم، نرجو المساعدة في أقرب وقت."
  />
);

export const Invalid = () => (
  <Textarea className="max-w-[520px]" aria-invalid placeholder="وصف المشكلة" />
);
