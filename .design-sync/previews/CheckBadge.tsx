import { CheckBadge } from "@taqeemak/ui";

export const SuccessState = () => (
  <div className="flex flex-col items-center gap-3 text-center">
    <CheckBadge />
    <span className="text-[26px] font-extrabold">تم إرسال الرسالة بنجاح</span>
    <span className="text-[17px] text-muted-foreground">سنرد عليك في أقرب وقت ممكن.</span>
  </div>
);

export const Small = () => <CheckBadge className="size-10 [&_svg]:size-5" />;
