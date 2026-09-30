"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { FormField, TextareaField, TextField } from "@/components/forms/form-field";
import { PhoneInput } from "@/components/forms/phone-input";
import { CheckBadge } from "@/components/shared/check-badge";
import { useSendMessage } from "@/hooks/use-support";
import { useI18n } from "@/i18n/dictionary-provider";
import { contactSchema, type ContactValues } from "@/validators";

export function ContactForm() {
  const { dict } = useI18n();
  const { contact } = dict;
  const [sent, setSent] = useState(false);
  const sendMessage = useSendMessage();
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema(dict.common)),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (values: ContactValues) =>
    sendMessage.mutate(values, {
      onSuccess: () => {
        form.reset();
        setSent(true);
      },
      onError: (error) => toast.error(error.message || contact.error),
    });

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
        <CheckBadge />
        <span className="text-[26px] font-extrabold">{contact.sent}</span>
        <span className="text-[17px] text-muted-foreground">{contact.sentD}</span>
        <Button variant="outline" size="xl" className="mt-2" onClick={() => setSent(false)}>
          {contact.again}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <span className="text-[22px] font-extrabold">{contact.form}</span>
        <TextField control={form.control} name="name" label={contact.name} inputProps={{ placeholder: contact.name, autoComplete: "name" }} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <TextField
            control={form.control}
            name="email"
            label={contact.email}
            inputProps={{ type: "email", placeholder: "name@company.com", autoComplete: "email", dir: "ltr" }}
          />
          <FormField
            control={form.control}
            name="phone"
            label={contact.phone}
            render={(field) => <PhoneInput {...field} autoComplete="tel" />}
          />
        </div>
        <TextareaField
          control={form.control}
          name="message"
          label={contact.message}
          textareaProps={{ placeholder: contact.messagePh, className: "min-h-[140px]" }}
        />
        <Button type="submit" size="xl" disabled={sendMessage.isPending}>
          {sendMessage.isPending && <Spinner />}
          {contact.send}
        </Button>
      </FieldGroup>
    </form>
  );
}
