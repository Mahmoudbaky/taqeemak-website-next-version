import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { auth } = await getDictionary();
  return { title: auth.registerNow };
}

export default async function RegisterPage() {
  const { auth } = await getDictionary();
  return (
    <AuthShell auth={auth}>
      <RegisterForm />
    </AuthShell>
  );
}
