"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useLocalizedHref } from "@/components/shared/locale-link";
import { useCurrentUser, useHasAccessToken } from "@/hooks/use-auth";

function FullPageSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner className="size-8 text-primary" />
    </div>
  );
}

/**
 * Client-side guard: auth lives in localStorage, so the server can't check it.
 * Renders children only for a signed-in customer; otherwise sends them to login.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isPending } = useCurrentUser();
  const hasToken = useHasAccessToken();
  const router = useRouter();
  const pathname = usePathname();
  const localize = useLocalizedHref();

  const shouldRedirect = !isPending && !isLoggedIn;

  useEffect(() => {
    if (!shouldRedirect) return;
    // Give useSyncExternalStore one tick to read the token after hydration.
    const id = setTimeout(() => {
      router.replace(`${localize("/login")}?next=${encodeURIComponent(pathname)}`);
    }, hasToken ? 0 : 50);
    return () => clearTimeout(id);
  }, [shouldRedirect, hasToken, router, pathname, localize]);

  if (!isLoggedIn) return <FullPageSpinner />;
  return children;
}

/** For login/register: signed-in visitors go straight to where they were headed. */
export function RedirectIfAuthenticated({ to, children }: { to: string; children: React.ReactNode }) {
  const { isLoggedIn } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.replace(to);
  }, [isLoggedIn, router, to]);

  return children;
}
