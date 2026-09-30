"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/dictionary-provider";

/** next/link that prefixes the current locale, e.g. "/about-us" → "/ar/about-us". */
export function LocaleLink({ href, ...props }: React.ComponentProps<typeof Link> & { href: string }) {
  const { locale } = useI18n();
  return <Link href={href.startsWith("/") ? `/${locale}${href === "/" ? "" : href}` : href} {...props} />;
}

export function useLocalizedHref() {
  const { locale } = useI18n();
  return (href: string) => `/${locale}${href === "/" ? "" : href}`;
}
