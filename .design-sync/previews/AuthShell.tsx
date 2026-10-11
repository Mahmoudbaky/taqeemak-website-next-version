import { AuthShell, Button, Field, FieldGroup, FieldLabel, Input, PasswordInput } from "@taqeemak/ui";

const auth = {
  panelQ: "كيف كانت تجربتك اليوم؟",
  panelD: "اعرف كيف كانت كل زيارة، في الوقت المناسب.",
} as const;

export const Login = () => (
  <AuthShell auth={auth as never}>
    <div className="flex flex-col gap-2">
      <span className="text-[28px] font-extrabold">تسجيل الدخول</span>
      <span className="text-muted-foreground">مرحبًا بك مرة أخرى! يرجى إدخال بياناتك للمتابعة.</span>
    </div>
    <FieldGroup className="mt-6 gap-5">
      <Field className="gap-2">
        <FieldLabel htmlFor="as-email" className="text-sm font-semibold">البريد الالكترونى</FieldLabel>
        <Input id="as-email" type="email" dir="ltr" placeholder="name@company.com" />
      </Field>
      <Field className="gap-2">
        <FieldLabel htmlFor="as-pw" className="text-sm font-semibold">كلمة المرور</FieldLabel>
        <PasswordInput id="as-pw" />
      </Field>
      <Button size="xl" className="mt-1.5 h-[50px]">تسجيل الدخول</Button>
    </FieldGroup>
  </AuthShell>
);
