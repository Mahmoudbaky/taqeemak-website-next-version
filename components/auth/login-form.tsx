"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { FieldLabelText, TextField } from "@/components/forms/form-field";
import { PasswordInput } from "@/components/forms/password-input";
import { LocaleLink, useLocalizedHref } from "@/components/shared/locale-link";
import { RedirectIfAuthenticated } from "./require-auth";
import { useLogin } from "@/hooks/use-auth";
import { useI18n } from "@/i18n/dictionary-provider";
import { loginSchema, type LoginValues } from "@/validators";

/** Only same-site relative paths are accepted as a post-login destination. */
const safeNext = (next: string | null) => (next?.startsWith("/") && !next.startsWith("//") ? next : null);

export function LoginForm() {
  const { dict } = useI18n();
  const { auth } = dict;
  const router = useRouter();
  const localize = useLocalizedHref();
  const destination = safeNext(useSearchParams().get("next")) ?? localize("/");
  const login = useLogin();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema(dict.common)),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginValues) =>
    login.mutate(values, {
      onSuccess: () => {
        toast.success(auth.loginSuccess);
        router.replace(destination);
      },
      onError: (error) => toast.error(error.message),
    });

  const passwordError = form.formState.errors.password;

  return (
    <RedirectIfAuthenticated to={destination}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mx-auto w-full max-w-[440px]">
        <FieldGroup className="gap-5">
          <div className="mb-2 flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold">{auth.welcome}</h1>
            <p className="text-muted-foreground">{auth.loginDesc}</p>
          </div>
          <TextField
            control={form.control}
            name="email"
            label={auth.email}
            required
            inputProps={{ type: "email", placeholder: "name@company.com", autoComplete: "email", dir: "ltr", className: "h-12" }}
          />
          <Field data-invalid={!!passwordError} className="gap-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password" className="text-sm font-semibold">
                <FieldLabelText label={auth.password} required />
              </FieldLabel>
              {/* No password-reset endpoint yet — routes to Contact. */}
              <LocaleLink href="/contact-us" className="text-sm font-semibold text-link hover:text-deep">
                {auth.forgot}
              </LocaleLink>
            </div>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              className="h-12"
              aria-invalid={!!passwordError}
              {...form.register("password")}
            />
            {passwordError && <FieldError errors={[passwordError]} />}
          </Field>
          <Button type="submit" size="xl" className="mt-1.5 h-[50px]" disabled={login.isPending}>
            {login.isPending && <Spinner />}
            {auth.login}
          </Button>
          <p className="text-center text-[15px] text-muted-foreground">
            {auth.noAccount}{" "}
            <LocaleLink href="/register" className="font-bold text-link hover:text-deep">
              {auth.signUp}
            </LocaleLink>
          </p>
        </FieldGroup>
      </form>
    </RedirectIfAuthenticated>
  );
}
