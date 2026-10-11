import { Button, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@taqeemak/ui";

export const InfoPopover = () => (
  <div className="flex h-[260px] justify-center">
    <Popover defaultOpen modal={false}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="xl">تفاصيل الباقة</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle className="font-bold">الباقة الأساسية</PopoverTitle>
          <PopoverDescription>
            شاشة تقييم واحدة مع تقارير شهرية عن مستوى رضا العملاء ونقاط التحسين.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold text-primary">299</span>
          <span className="text-sm text-muted-foreground">ريال / شهرياً</span>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);
