import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
} from "@taqeemak/ui";

export const ContactForm = () => (
  <form className="max-w-[560px]" onSubmit={(e) => e.preventDefault()}>
    <FieldGroup className="gap-5">
      <span className="text-[22px] font-extrabold">تواصل معنا</span>
      <Field className="gap-2">
        <FieldLabel htmlFor="cf-name" className="text-sm font-semibold">الاسم</FieldLabel>
        <Input id="cf-name" placeholder="الاسم" autoComplete="name" />
      </Field>
      <Field className="gap-2">
        <FieldLabel htmlFor="cf-email" className="text-sm font-semibold">البريد الالكترونى</FieldLabel>
        <Input id="cf-email" type="email" dir="ltr" placeholder="name@company.com" />
      </Field>
      <Field className="gap-2">
        <FieldLabel htmlFor="cf-msg" className="text-sm font-semibold">الرسالة</FieldLabel>
        <Textarea id="cf-msg" placeholder="أريد التواصل مع خدمة العملاء" className="min-h-[140px]" />
      </Field>
      <Button type="submit" size="xl">إرسال</Button>
    </FieldGroup>
  </form>
);

export const RequiredWithHint = () => (
  <Field className="max-w-[420px] gap-2">
    <FieldLabel htmlFor="rf-subject" className="text-sm font-semibold">
      الموضوع <span className="text-destructive">*</span>
    </FieldLabel>
    <Input id="rf-subject" placeholder="عنوان مختصر للمشكلة" />
    <FieldDescription>اكتب عنواناً واضحاً يساعد فريق الدعم على فهم المشكلة.</FieldDescription>
  </Field>
);

export const Invalid = () => (
  <Field data-invalid className="max-w-[420px] gap-2">
    <FieldLabel htmlFor="if-email" className="text-sm font-semibold">
      البريد الالكترونى <span className="text-destructive">*</span>
    </FieldLabel>
    <Input id="if-email" type="email" dir="ltr" aria-invalid defaultValue="mohammed@" />
    <FieldError>يرجى إدخال بريد إلكتروني صحيح</FieldError>
  </Field>
);
