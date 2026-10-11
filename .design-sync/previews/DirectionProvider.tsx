import { DirectionProvider, ToggleGroup, ToggleGroupItem } from "@taqeemak/ui";

export const LtrIsland = () => (
  <DirectionProvider dir="ltr">
    <div dir="ltr" className="flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">English section inside the Arabic page</span>
      <ToggleGroup type="single" variant="outline" defaultValue="month">
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
        <ToggleGroupItem value="year">Year</ToggleGroupItem>
      </ToggleGroup>
    </div>
  </DirectionProvider>
);
