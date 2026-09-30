import type { Dictionary } from "@/i18n/dictionaries";

export const getNavLinks = (nav: Dictionary["nav"], isLoggedIn: boolean) => [
  { href: "/", label: nav.home },
  { href: "/about-us", label: nav.about },
  { href: "/contact-us", label: nav.contact },
  ...(isLoggedIn ? [{ href: "/support", label: nav.support }] : []),
];
