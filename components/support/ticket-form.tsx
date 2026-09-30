"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FieldLabelText, FormField, TextareaField, TextField } from "@/components/forms/form-field";
import { PhoneInput } from "@/components/forms/phone-input";
import { CheckBadge } from "@/components/shared/check-badge";
import { LocaleLink } from "@/components/shared/locale-link";
import { useCurrentUser } from "@/hooks/use-auth";
import { useCreateTicket, useUpload } from "@/hooks/use-support";
import { useI18n } from "@/i18n/dictionary-provider";
import { cn } from "@/lib/utils";
import { MediaType } from "@/services/upload.service";
import { ticketCategories, ticketPriorities, ticketSchema, type TicketValues } from "@/validators";
import { FileDropzone } from "./file-dropzone";

export function TicketForm() {
  const { dict, locale } = useI18n();
  const { support } = dict;
  const { user } = useCurrentUser();
  const createTicket = useCreateTicket();
  const upload = useUpload({ customerId: user?.Cu_ID, mediaType: MediaType.TICKET_DOCUMENT });
  const [file, setFile] = useState<File | null>(null);
  const [attachUrl, setAttachUrl] = useState<string>();
  const [ticketNo, setTicketNo] = useState<string | null>(null);

  const defaultValues: TicketValues = {
    crName: (locale === "ar" ? user?.Cu_NameAr : user?.Cu_NameEn) ?? "",
    phone: user?.Cu_Mobile ?? "",
    category: "SUPPORT",
    priority: "LOW",
    subject: "",
    problem: "",
  };
  const form = useForm<TicketValues>({ resolver: zodResolver(ticketSchema(dict.common)), defaultValues });

  const resetForm = () => {
    form.reset(defaultValues);
    setFile(null);
    setAttachUrl(undefined);
  };

  const onFile = (selected: File) => {
    setFile(selected);
    upload.mutate(selected, {
      onSuccess: (data) => {
        setAttachUrl(data.secureUrl);
        toast.success(support.uploaded);
      },
      onError: (error) => {
        setFile(null);
        toast.error(error.message || support.uploadError);
      },
    });
  };

  // The ticket API has no phone field (same as the old app), so phone is validated but not sent.
  const onSubmit = ({ crName, category, priority, subject, problem }: TicketValues) => {
    if (!user) return;
    createTicket.mutate(
      { crName, category, priority, subject, problem: problem ?? "", customerId: user.Cu_ID, attach: attachUrl },
      {
        onSuccess: ({ data }) => {
          setTicketNo(data.Ti_No);
          resetForm();
        },
        onError: (error) => toast.error(error.message || support.error),
      }
    );
  };

  if (ticketNo) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center gap-3.5 text-center">
        <CheckBadge />
        <span className="text-[26px] font-extrabold">{support.doneTitle}</span>
        <span className="max-w-[480px] text-[17px] leading-[1.7] text-muted-foreground">{support.doneDesc}</span>
        <span className="rounded-lg bg-soft px-3.5 py-2 font-mono text-link">
          {support.ticketNo} {ticketNo}
        </span>
        <Button asChild size="xl" className="mt-1.5">
          <LocaleLink href="/settings?tab=tickets">{support.viewTickets}</LocaleLink>
        </Button>
      </div>
    );
  }

  const { control } = form;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-5.5">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4.5">
          <TextField control={control} name="crName" label={support.name} required />
          <FormField
            control={control}
            name="phone"
            label={support.phone}
            required
            render={(field) => <PhoneInput {...field} autoComplete="tel" />}
          />
        </div>

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Field className="gap-2.5">
              <FieldLabel className="text-sm font-semibold">
                <FieldLabelText label={support.category} required />
              </FieldLabel>
              <ToggleGroup
                type="single"
                value={field.value}
                onValueChange={(v) => v && field.onChange(v)}
                className="flex flex-wrap gap-2"
              >
                {ticketCategories.map((value, i) => (
                  <ToggleGroupItem
                    key={value}
                    value={value}
                    className="h-auto rounded-full! border bg-background px-4.5 py-2.5 text-[15px] font-semibold data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
                  >
                    {support.cats[i]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Field className="gap-2.5">
              <FieldLabel className="text-sm font-semibold">
                <FieldLabelText label={support.priority} required />
              </FieldLabel>
              <ToggleGroup
                type="single"
                value={field.value}
                onValueChange={(v) => v && field.onChange(v)}
                className="self-start rounded-xl bg-soft p-1"
              >
                {ticketPriorities.map((value, i) => (
                  <ToggleGroupItem
                    key={value}
                    value={value}
                    className={cn(
                      "h-auto rounded-[9px]! px-5 py-2.5 text-[15px] font-bold text-muted-foreground data-[state=on]:bg-card data-[state=on]:shadow-[0_1px_3px_rgba(10,30,54,.15)]",
                      value === "CRITICAL" ? "data-[state=on]:text-destructive" : "data-[state=on]:text-foreground"
                    )}
                  >
                    {support.pris[i]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
          )}
        />

        <TextField control={control} name="subject" label={support.subject} required />
        <TextareaField control={control} name="problem" label={support.desc} />
        <FileDropzone
          label={support.upload}
          hint={support.drag}
          file={file}
          uploading={upload.isPending}
          progress={upload.progress}
          removeLabel={support.removeFile}
          onFile={onFile}
          onRemove={() => {
            setFile(null);
            setAttachUrl(undefined);
          }}
        />

        <div className="flex flex-wrap justify-end gap-2.5">
          <Button type="button" variant="outline" size="xl" onClick={resetForm}>
            {support.reset}
          </Button>
          <Button type="submit" size="xl" disabled={createTicket.isPending || upload.isPending}>
            {createTicket.isPending && <Spinner />}
            {support.create}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
