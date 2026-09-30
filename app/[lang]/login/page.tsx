import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { auth } = await getDictionary();
  return { title: auth.login };
}

export default async function LoginPage() {
  const { auth } = await getDictionary();
  return (
    <AuthShell auth={auth}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
