"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/sonner";
import { getDirection, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { DictionaryProvider } from "@/i18n/dictionary-provider";
import { getQueryClient } from "@/lib/query-client";

export function Providers({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const dir = getDirection(locale);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <DictionaryProvider locale={locale} dict={dict}>
          <DirectionProvider dir={dir}>
            {children}
            <Toaster richColors position={dir === "rtl" ? "top-left" : "top-right"} dir={dir} />
          </DirectionProvider>
        </DictionaryProvider>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
