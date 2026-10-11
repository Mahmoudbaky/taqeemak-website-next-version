import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@taqeemak/ui";

export const Package = () => (
  <Card className="max-w-[360px]">
    <CardHeader>
      <CardTitle className="text-lg font-bold">الباقة الأساسية</CardTitle>
      <CardDescription>شاشة تقييم واحدة مع تقارير شهرية</CardDescription>
      <CardAction><Badge>خصم محدود</Badge></CardAction>
    </CardHeader>
    <CardContent className="flex items-baseline gap-1.5">
      <span className="text-3xl font-extrabold text-primary">299</span>
      <span className="text-muted-foreground">ريال / شهرياً</span>
    </CardContent>
    <CardFooter>
      <Button size="xl" className="w-full">أطلب الان</Button>
    </CardFooter>
  </Card>
);

export const SiteSurface = () => (
  <div className="flex max-w-[420px] flex-col gap-3 rounded-[20px] border bg-card p-6">
    <span className="text-[19px] font-bold">بياناتي الشخصية</span>
    <div className="flex justify-between text-[15px]">
      <span className="text-muted-foreground">رقم الهاتف</span>
      <span dir="ltr">+966 50 123 4567</span>
    </div>
    <div className="flex justify-between text-[15px]">
      <span className="text-muted-foreground">رقم السجل الضريبي</span>
      <span>1010987654</span>
    </div>
  </div>
);

export const Small = () => (
  <Card size="sm" className="max-w-[300px]">
    <CardHeader>
      <CardTitle>تقارير الرضا</CardTitle>
      <CardDescription>آخر تحديث منذ ساعتين</CardDescription>
    </CardHeader>
    <CardContent className="text-2xl font-extrabold">92%</CardContent>
  </Card>
);
