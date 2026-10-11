import { Tabs, TabsContent, TabsList, TabsTrigger } from "@taqeemak/ui";

const tabs = ["طلبات", "الدفعات", "تراخيص", "الدعم الفني"];

export const AccountTabs = () => (
  <Tabs defaultValue={tabs[0]} className="max-w-[560px]">
    <TabsList>
      {tabs.map((t) => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}
    </TabsList>
    <TabsContent value={tabs[0]} className="rounded-xl border bg-card p-4">لديك 4 طلبات خلال آخر 3 أشهر.</TabsContent>
  </Tabs>
);

export const Line = () => (
  <Tabs defaultValue={tabs[1]} className="max-w-[560px]">
    <TabsList variant="line">
      {tabs.map((t) => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}
    </TabsList>
    <TabsContent value={tabs[1]} className="pt-2 text-muted-foreground">سجل الدفعات عبر ميسر.</TabsContent>
  </Tabs>
);
