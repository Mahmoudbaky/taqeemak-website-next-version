"use client";

import { useTheme } from "next-themes";
import { useI18n } from "@/i18n/dictionary-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { dict } = useI18n();

  return (
    <button
      type="button"
      title={dict.nav.theme}
      aria-label={dict.nav.theme}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-[34px] items-center justify-center rounded-lg border hover:bg-soft"
    >
      <span className="size-3.5 rounded-full border-2 border-foreground bg-[linear-gradient(90deg,var(--foreground)_50%,transparent_50%)]" />
    </button>
  );
}
