"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Spinner } from "@/components/ui/spinner";
import { FieldLabelText, FormField, TextField } from "@/components/forms/form-field";
import { PasswordInput } from "@/components/forms/password-input";
import { PhoneInput } from "@/components/forms/phone-input";
import { LocaleLink, useLocalizedHref } from "@/components/shared/locale-link";
import { RedirectIfAuthenticated } from "./require-auth";
import { useRegister } from "@/hooks/use-auth";
import { useI18n } from "@/i18n/dictionary-provider";
import { businessCategories, registerSchema, type RegisterValues } from "@/validators";

export function RegisterForm() {
  const { dict } = useI18n();
  const { auth } = dict;
  const router = useRouter();
  const localize = useLocalizedHref();
  const register = useRegister();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema(dict.common, auth.passwordsMismatch)),
    defaultValues: {
      nameAr: "",
      nameEn: "",
      record: "",
      companyName: "",
      email: "",
      mobile: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({ nameAr, nameEn, record, companyName, category, email, mobile, address, password }: RegisterValues) =>
    register.mutate(
      { nameAr, nameEn, record, category, email, mobile, address, password, companyName: companyName || undefined },
      {
        // Same flow as before: create the account, then sign in explicitly.
        onSuccess: () => {
          toast.success(auth.registerSuccess);
          router.push(localize("/login"));
        },
        onError: (error) => toast.error(error.message),
      }
    );

  const { control } = form;

  return (
    <RedirectIfAuthenticated to={localize("/")}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="w-full">
        <FieldGroup className="gap-4.5">
          <div className="mb-1.5 flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold">{auth.registerNow}</h1>
            <p className="text-muted-foreground">{auth.registerDesc}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <TextField control={control} name="nameAr" label={auth.nameAr} required inputProps={{ dir: "rtl" }} />
            <TextField control={control} name="nameEn" label={auth.nameEn} required inputProps={{ dir: "ltr" }} />
            <TextField control={control} name="record" label={auth.record} required />
            <TextField control={control} name="companyName" label={`${auth.company} (${auth.optional})`} />
            <Controller
              control={control}
              name="category"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="col-span-full gap-2.5">
                  <FieldLabel className="text-sm font-semibold">
                    <FieldLabelText label={auth.category} required />
                  </FieldLabel>
                  <ToggleGroup
                    type="single"
                    value={field.value ?? ""}
                    onValueChange={(v) => v && field.onChange(v)}
                    aria-invalid={fieldState.invalid}
                    className="flex flex-wrap justify-start gap-2"
                  >
                    {businessCategories.map((value) => (
                      <ToggleGroupItem
                        key={value}
                        value={value}
                        className="h-auto rounded-full! border bg-background px-4 py-2 text-sm font-semibold data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
                      >
                        {auth.categories[value]}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>{auth.categoryHint}</FieldDescription>
                  )}
                </Field>
              )}
            />
            <TextField
              control={control}
              name="email"
              label={auth.email}
              required
              inputProps={{ type: "email", autoComplete: "email", dir: "ltr" }}
            />
            <FormField
              control={control}
              name="mobile"
              label={auth.phone}
              required
              render={(field) => <PhoneInput {...field} autoComplete="tel" />}
            />
            <TextField control={control} name="address" label={auth.address} required inputProps={{ autoComplete: "street-address" }} />
            <FormField
              control={control}
              name="password"
              label={auth.password}
              required
              render={(field) => <PasswordInput {...field} autoComplete="new-password" />}
            />
            <FormField
              control={control}
              name="confirmPassword"
              label={auth.confirm}
              required
              render={(field) => <PasswordInput {...field} autoComplete="new-password" />}
            />
          </div>
          <Button type="submit" size="xl" className="mt-1.5 h-[50px]" disabled={register.isPending}>
            {register.isPending && <Spinner />}
            {auth.registerBtn}
          </Button>
          <p className="text-center text-[15px] text-muted-foreground">
            {auth.haveAccount}{" "}
            <LocaleLink href="/login" className="font-bold text-link hover:text-deep">
              {auth.login}
            </LocaleLink>
          </p>
        </FieldGroup>
      </form>
    </RedirectIfAuthenticated>
  );
}
