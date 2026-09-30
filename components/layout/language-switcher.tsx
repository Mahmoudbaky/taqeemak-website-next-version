"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { localizePath, persistLocale, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/dictionary-provider";
import { cn } from "@/lib/utils";

const options: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "ar", label: "ع" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    persistLocale(next);
    const query = searchParams.toString();
    router.replace(localizePath(pathname, next) + (query ? `?${query}` : ""), { scroll: false });
  };

  return (
    <div className={cn("flex overflow-hidden rounded-lg border text-sm font-semibold", className)}>
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          lang={option.locale}
          aria-pressed={option.locale === locale}
          onClick={() => switchTo(option.locale)}
          className={cn(
            "px-3 py-1.5 transition-colors",
            option.locale === locale ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
