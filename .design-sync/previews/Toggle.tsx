import { Toggle } from "@taqeemak/ui";
import { BoldIcon, StarIcon } from "lucide-react";

export const Variants = () => (
  <div className="flex items-center gap-3">
    <Toggle aria-label="مفضلة" defaultPressed><StarIcon /></Toggle>
    <Toggle variant="outline" aria-label="غامق"><BoldIcon /></Toggle>
    <Toggle variant="outline" defaultPressed>المفضلة</Toggle>
  </div>
);

export const Sizes = () => (
  <div className="flex items-center gap-3">
    <Toggle variant="outline" size="sm">صغير</Toggle>
    <Toggle variant="outline">افتراضي</Toggle>
    <Toggle variant="outline" size="lg">كبير</Toggle>
  </div>
);
