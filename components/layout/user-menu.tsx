"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalizedHref } from "@/components/shared/locale-link";
import { useI18n } from "@/i18n/dictionary-provider";
import { useLogout } from "@/hooks/use-auth";
import type { Customer } from "@/types/api";

export const displayName = (user: Customer, locale: string) =>
  (locale === "ar" ? user.Cu_NameAr : user.Cu_NameEn) || user.Cu_NameEn || user.Cu_EMail;

export function UserInitial({ user, className }: { user: Customer; className?: string }) {
  const { locale } = useI18n();
  return (
    <span className={className ?? "flex size-8 items-center justify-center rounded-full bg-primary font-bold text-white"}>
      {displayName(user, locale).charAt(0).toUpperCase()}
    </span>
  );
}

export function UserMenu({ user }: { user: Customer }) {
  const { dict, locale } = useI18n();
  const router = useRouter();
  const localize = useLocalizedHref();
  const logout = useLogout();
  const name = displayName(user, locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full border py-1 ps-1 pe-2.5 text-sm font-semibold outline-none hover:bg-soft focus-visible:ring-3 focus-visible:ring-ring/50">
        <UserInitial user={user} />
        <span className="max-w-32 truncate">{name.split(" ")[0]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5">
        <DropdownMenuLabel className="font-normal">
          <div className="text-xs text-muted-foreground">{dict.nav.signedIn}</div>
          <div className="truncate font-semibold">{user.Cu_EMail}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-2.5" onSelect={() => router.push(localize("/settings"))}>
          {dict.nav.settings}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="py-2.5"
          onSelect={() => logout.mutate(undefined, { onSettled: () => router.push(localize("/")) })}
        >
          {dict.nav.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
