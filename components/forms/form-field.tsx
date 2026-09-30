"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: React.ReactNode;
  required?: boolean;
  className?: string;
};

export function FieldLabelText({ label, required }: { label: React.ReactNode; required?: boolean }) {
  return (
    <>
      {label}
      {required && <span className="text-destructive">*</span>}
    </>
  );
}

/** Label + control + error, wired to react-hook-form. `render` receives the field props. */
export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  render,
}: BaseProps<T> & {
  render: (
    field: Parameters<React.ComponentProps<typeof Controller<T>>["render"]>[0]["field"] & {
      id: string;
      "aria-invalid": boolean;
    }
  ) => React.ReactNode;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className ?? "gap-2"}>
          <FieldLabel htmlFor={name} className="text-sm font-semibold">
            <FieldLabelText label={label} required={required} />
          </FieldLabel>
          {render({ ...field, id: name, "aria-invalid": fieldState.invalid })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function TextField<T extends FieldValues>({
  inputProps,
  ...props
}: BaseProps<T> & { inputProps?: React.ComponentProps<typeof Input> }) {
  return (
    <FormField
      {...props}
      render={({ value, ...field }) => <Input {...inputProps} {...field} value={value ?? ""} />}
    />
  );
}

export function TextareaField<T extends FieldValues>({
  textareaProps,
  ...props
}: BaseProps<T> & { textareaProps?: React.ComponentProps<typeof Textarea> }) {
  return (
    <FormField
      {...props}
      render={({ value, ...field }) => <Textarea {...textareaProps} {...field} value={value ?? ""} />}
    />
  );
}
