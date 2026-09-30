"use client";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LocaleLink } from "@/components/shared/locale-link";
import { Logo } from "@/components/shared/logo";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";
import { useI18n } from "@/i18n/dictionary-provider";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { getNavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

export function Navbar() {
  const { dict, locale } = useI18n();
  const pathname = usePathname();
  const { user, isLoggedIn, isPending } = useCurrentUser();
  const logout = useLogout();
  const [open, setOpen] = useState(false);

  const links = getNavLinks(dict.nav, isLoggedIn);
  const isActive = (href: string) => {
    const path = pathname.replace(`/${locale}`, "") || "/";
    return href === "/" ? path === "/" : path.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-20 border-b bg-card/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-9">
          <LocaleLink href="/" aria-label={dict.nav.home}>
            <Logo priority />
          </LocaleLink>
          <div className="hidden gap-1 text-[15px] font-semibold lg:flex">
            {links.map((link) => (
              <LocaleLink
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 transition-colors",
                  isActive(link.href) ? "bg-soft text-link" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </LocaleLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-sm font-semibold">
          <Suspense>
            <LanguageSwitcher className="hidden sm:flex" />
          </Suspense>
          <ThemeToggle />
          {isLoggedIn && user ? (
            <div className="hidden lg:block">
              <UserMenu user={user} />
            </div>
          ) : (
            <div className={cn("hidden items-center gap-1 lg:flex", isPending && "invisible")}>
              <Button asChild variant="ghost" size="xl" className="font-semibold">
                <LocaleLink href="/login">{dict.nav.login}</LocaleLink>
              </Button>
              <Button asChild size="xl" className="rounded-lg text-sm font-semibold">
                <LocaleLink href="/register">{dict.nav.register}</LocaleLink>
              </Button>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="lg:hidden" aria-label={dict.nav.menu}>
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side={locale === "ar" ? "left" : "right"} className="w-80">
              <SheetHeader>
                <SheetTitle>
                  <Logo className="h-8" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 text-base font-semibold" onClick={() => setOpen(false)}>
                {links.map((link) => (
                  <LocaleLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3.5 py-2.5",
                      isActive(link.href) ? "bg-soft text-link" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </LocaleLink>
                ))}
                <div className="my-3 h-px bg-border" />
                {isLoggedIn ? (
                  <>
                    <LocaleLink href="/settings" className="rounded-lg px-3.5 py-2.5">
                      {dict.nav.settings}
                    </LocaleLink>
                    <button
                      type="button"
                      className="rounded-lg px-3.5 py-2.5 text-start text-destructive"
                      onClick={() => logout.mutate()}
                    >
                      {dict.nav.logout}
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" size="xl">
                      <LocaleLink href="/login">{dict.nav.login}</LocaleLink>
                    </Button>
                    <Button asChild size="xl">
                      <LocaleLink href="/register">{dict.nav.register}</LocaleLink>
                    </Button>
                  </div>
                )}
              </div>
              <div className="mt-auto p-4" onClick={(e) => e.stopPropagation()}>
                <Suspense>
                  <LanguageSwitcher className="w-fit" />
                </Suspense>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
