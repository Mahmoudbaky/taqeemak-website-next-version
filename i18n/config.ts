export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Remembers an explicit language choice for proxy.ts. */
export const persistLocale = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
};

export const hasLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

export const getDirection = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Swaps (or adds) the locale segment at the start of a pathname. */
export const localizePath = (pathname: string, locale: Locale) => {
  const segments = pathname.split("/");
  if (hasLocale(segments[1])) segments[1] = locale;
  else segments.splice(1, 0, locale);
  return segments.join("/") || `/${locale}`;
};
