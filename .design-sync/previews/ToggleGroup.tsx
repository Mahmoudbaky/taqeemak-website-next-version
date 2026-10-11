import { ToggleGroup, ToggleGroupItem } from "@taqeemak/ui";

const cats = ["مشكلة تقنية", "استفسار", "طلب صيانة", "أخرى"];
const pris = ["منخفضة", "متوسطة", "عالية", "حرجة"];

export const CategoryPills = () => (
  <ToggleGroup type="single" defaultValue={cats[0]} className="flex flex-wrap gap-2">
    {cats.map((c) => (
      <ToggleGroupItem
        key={c}
        value={c}
        className="h-auto rounded-full! border bg-background px-4.5 py-2.5 text-[15px] font-semibold data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
      >
        {c}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);

export const SegmentedPriority = () => (
  <ToggleGroup type="single" defaultValue={pris[1]} className="self-start rounded-xl bg-soft p-1">
    {pris.map((p) => (
      <ToggleGroupItem
        key={p}
        value={p}
        className="h-auto rounded-[9px]! px-5 py-2.5 text-[15px] font-bold text-muted-foreground data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-[0_1px_3px_rgba(10,30,54,.15)]"
      >
        {p}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);

export const Outline = () => (
  <ToggleGroup type="multiple" variant="outline" defaultValue={["ar"]}>
    <ToggleGroupItem value="ar">العربية</ToggleGroupItem>
    <ToggleGroupItem value="en">English</ToggleGroupItem>
  </ToggleGroup>
);
