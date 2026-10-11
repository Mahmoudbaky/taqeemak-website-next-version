import { ThemeToggle } from "@taqeemak/ui";

export const Light = () => (
  <div className="flex items-center gap-3">
    <ThemeToggle />
    <span className="text-sm text-muted-foreground">تبديل المظهر</span>
  </div>
);

export const InDarkSection = () => (
  <div className="dark flex items-center gap-3 rounded-xl bg-background p-4 text-foreground">
    <ThemeToggle />
    <span className="text-sm text-muted-foreground">الوضع الداكن</span>
  </div>
);
