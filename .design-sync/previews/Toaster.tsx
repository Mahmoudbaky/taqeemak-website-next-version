import { useEffect } from "react";
import { Toaster, toast } from "@taqeemak/ui";

export const Notifications = () => {
  useEffect(() => {
    toast.success("تم تحديث الصورة الشخصية");
    toast.error("لم يتم العثور على العنوان");
    toast("تم استلام التقييم", { description: "شكراً لمشاركتك رأيك." });
  }, []);
  return <Toaster richColors position="top-left" dir="rtl" expand duration={Infinity} />;
};
