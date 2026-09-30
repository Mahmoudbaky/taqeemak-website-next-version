import type { Metadata } from "next";
import { Suspense } from "react";
import { RequireAuth } from "@/components/auth/require-auth";
import { AccountView } from "@/components/settings/account-view";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { nav } = await getDictionary();
  return { title: nav.settings, robots: { index: false } };
}

export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-14 pb-24 sm:px-8">
      <RequireAuth>
        <Suspense>
          <AccountView />
        </Suspense>
      </RequireAuth>
    </div>
  );
}
