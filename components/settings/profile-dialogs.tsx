"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { FormField, TextField } from "@/components/forms/form-field";
import { PasswordInput } from "@/components/forms/password-input";
import { PhoneInput } from "@/components/forms/phone-input";
import { useChangePassword, useSendVerificationCode, useUpdateProfile, useVerifyCode } from "@/hooks/use-auth";
import { useI18n } from "@/i18n/dictionary-provider";
import type { Customer } from "@/types/api";
import { passwordSchema, profileSchema, type PasswordValues, type ProfileValues } from "@/validators";

type DialogProps = { open: boolean; onOpenChange: (open: boolean) => void; user: Customer };

export function EditProfileDialog({ open, onOpenChange, user }: DialogProps) {
  const { dict } = useI18n();
  const { account, common } = dict;
  const [view, setView] = useState<"profile" | "password">("profile");

  const close = (next: boolean) => {
    onOpenChange(next);
    if (!next) setView("profile");
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">
            {view === "profile" ? account.editProfile : account.changePassword}
          </DialogTitle>
          <DialogDescription className="sr-only">{account.editProfile}</DialogDescription>
        </DialogHeader>
        {view === "profile" ? (
          <ProfileForm user={user} onDone={() => close(false)} onChangePassword={() => setView("password")} />
        ) : (
          <PasswordForm onDone={() => close(false)} onBack={() => setView("profile")} backLabel={common.back} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({ user, onDone, onChangePassword }: { user: Customer; onDone: () => void; onChangePassword: () => void }) {
  const { dict } = useI18n();
  const { account, common } = dict;
  const updateProfile = useUpdateProfile();
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema(common)),
    defaultValues: { mobile: user.Cu_Mobile ?? "", email: user.Cu_EMail ?? "", record: user.Cu_Record ?? "" },
  });

  const onSubmit = (values: ProfileValues) =>
    updateProfile.mutate(
      { ...values, record: values.record || undefined },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          onDone();
        },
        onError: (error) => toast.error(error.message),
      }
    );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-4">
        <FormField
          control={form.control}
          name="mobile"
          label={account.phone}
          render={(field) => <PhoneInput {...field} autoComplete="tel" />}
        />
        <TextField control={form.control} name="record" label={account.record} />
        <TextField
          control={form.control}
          name="email"
          label={account.email}
          inputProps={{ type: "email", dir: "ltr", autoComplete: "email" }}
        />
        <Button type="button" variant="link" className="self-start px-0 font-bold" onClick={onChangePassword}>
          {account.changePassword}
        </Button>
        <DialogFooter>
          <Button type="button" variant="outline" size="xl" onClick={onDone}>
            {common.cancel}
          </Button>
          <Button type="submit" size="xl" disabled={updateProfile.isPending}>
            {updateProfile.isPending && <Spinner />}
            {common.save}
          </Button>
        </DialogFooter>
      </FieldGroup>
    </form>
  );
}

function PasswordForm({ onDone, onBack, backLabel }: { onDone: () => void; onBack: () => void; backLabel: string }) {
  const { dict } = useI18n();
  const { account, common } = dict;
  const changePassword = useChangePassword();
  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema(common, dict.auth.passwordsMismatch)),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (values: PasswordValues) =>
    changePassword.mutate(values, {
      onSuccess: (res) => {
        toast.success(res.message);
        onDone();
      },
      onError: (error) => toast.error(error.message),
    });

  const fields = [
    ["currentPassword", account.currentPassword, "current-password"],
    ["newPassword", account.newPassword, "new-password"],
    ["confirmPassword", account.confirmPassword, "new-password"],
  ] as const;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-4">
        {fields.map(([name, label, autoComplete]) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            label={label}
            render={(field) => <PasswordInput {...field} autoComplete={autoComplete} />}
          />
        ))}
        <DialogFooter>
          <Button type="button" variant="outline" size="xl" onClick={onBack}>
            {backLabel}
          </Button>
          <Button type="submit" size="xl" disabled={changePassword.isPending}>
            {changePassword.isPending && <Spinner />}
            {common.save}
          </Button>
        </DialogFooter>
      </FieldGroup>
    </form>
  );
}

export type VerifyTarget = "email" | "mobile";

/** Sends an OTP to the email or mobile when opened, then confirms it. */
export function VerifyDialog({ target, onClose, user }: { target: VerifyTarget | null; onClose: () => void; user: Customer }) {
  const { dict } = useI18n();
  const { account } = dict;
  const [otp, setOtp] = useState("");
  const sendCode = useSendVerificationCode();
  const verify = useVerifyCode();

  const contact = target === "email" ? { email: user.Cu_EMail } : { mobile: user.Cu_Mobile };

  const send = () =>
    sendCode.mutate(
      { ...contact, customerId: user.Cu_ID },
      { onSuccess: (res) => toast.success(res.message), onError: (error) => toast.error(error.message) }
    );

  const submit = (code: string) =>
    verify.mutate(
      { ...contact, otp: code },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          setOtp("");
          onClose();
        },
        onError: (error) => toast.error(error.message),
      }
    );

  return (
    <Dialog
      open={!!target}
      onOpenChange={(open) => {
        if (!open) {
          setOtp("");
          onClose();
        }
      }}
    >
      <DialogContent
        className="rounded-2xl sm:max-w-md"
        onOpenAutoFocus={() => {
          if (!sendCode.isPending) send();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">{account.verify}</DialogTitle>
          <DialogDescription>
            {account.enterCode}{" "}
            <span dir="ltr" className="font-semibold text-foreground">
              {target === "email" ? user.Cu_EMail : user.Cu_Mobile}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div dir="ltr" className="flex justify-center py-2">
          <InputOTP maxLength={6} value={otp} onChange={setOtp} onComplete={submit} autoFocus>
            <InputOTPGroup>
              {Array.from({ length: 6 }, (_, i) => (
                <InputOTPSlot key={i} index={i} className="size-12 text-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="link" className="px-0" onClick={send} disabled={sendCode.isPending}>
            {account.resend}
          </Button>
          <Button size="xl" onClick={() => submit(otp)} disabled={otp.length < 6 || verify.isPending}>
            {verify.isPending && <Spinner />}
            {account.verifyBtn}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
