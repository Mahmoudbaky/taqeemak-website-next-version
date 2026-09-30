"use client";

import { Reveal } from "@/components/shared/reveal";
import { useCurrentUser } from "@/hooks/use-auth";
import { AccountTabs } from "./account-tabs";
import { ProfileCard } from "./profile-card";

/** Rendered inside <RequireAuth>, so the user is always present. */
export function AccountView() {
  const { user } = useCurrentUser();
  if (!user) return null;

  return (
    <>
      <Reveal>
        <ProfileCard user={user} />
      </Reveal>
      <Reveal delay={80}>
        <AccountTabs />
      </Reveal>
    </>
  );
}
