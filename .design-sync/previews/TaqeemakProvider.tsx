import { Button, KioskRating, TaqeemakProvider } from "@taqeemak/ui";

export const ArabicDefault = () => (
  <div className="flex max-w-[420px] flex-col gap-4 rounded-[20px] border bg-card p-6">
    <span className="text-[21px] font-bold">كيف كانت تجربتك اليوم؟</span>
    <KioskRating active={4} />
    <Button size="xl">إرسال</Button>
  </div>
);

export const English = () => (
  <TaqeemakProvider locale="en">
    <div className="flex max-w-[420px] flex-col gap-4 rounded-[20px] border bg-card p-6">
      <span className="text-[21px] font-bold">How was your visit today?</span>
      <KioskRating active={3} />
      <Button size="xl">Send</Button>
    </div>
  </TaqeemakProvider>
);
