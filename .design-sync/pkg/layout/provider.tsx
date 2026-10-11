"use client";

import { useLayoutEffect } from "react";
import { ThemeProvider } from "next-themes";
import { DirectionProvider } from "../../../components/ui/direction";
import { getDirection, type Locale } from "../../../i18n/config";
import { DictionaryProvider } from "../../../i18n/dictionary-provider";
import ar from "../../../i18n/dictionaries/ar.json";
import en from "../../../i18n/dictionaries/en.json";

/**
 * App root for Taqeemak UI: the site's theme, i18n dictionary and text-direction
 * providers in one wrapper. Wrap every screen in it - PasswordInput, DatePicker,
 * HeroKiosk and ThemeToggle throw without it, and Radix overlays need its direction.
 * Arabic (RTL) is the site default; pass locale="en" for LTR English. Like the site's
 * root layout, it also sets <html dir/lang> so portalled overlays (Dialog, Sheet,
 * Popover, DropdownMenu) follow the same direction.
 */
export function TaqeemakProvider({
  locale = "ar",
  theme = "light",
  className,
  children,
}: {
  locale?: Locale;
  theme?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  const dir = getDirection(locale);
  useLayoutEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [dir, locale]);
  return (
    <ThemeProvider attribute="class" defaultTheme={theme} forcedTheme={theme} enableSystem={false} disableTransitionOnChange>
      <DictionaryProvider locale={locale} dict={locale === "ar" ? ar : en}>
        <DirectionProvider dir={dir}>
          <div dir={dir} lang={locale} className={["bg-background font-sans text-foreground antialiased", className].filter(Boolean).join(" ")}>
            {children}
          </div>
        </DirectionProvider>
      </DictionaryProvider>
    </ThemeProvider>
  );
}
