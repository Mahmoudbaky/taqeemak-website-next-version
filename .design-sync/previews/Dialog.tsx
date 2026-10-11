import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from "@taqeemak/ui";

export const EditProfile = () => (
  <Dialog defaultOpen modal={false}>
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle className="text-xl font-extrabold">بياناتي الشخصية</DialogTitle>
        <DialogDescription>حدّث بيانات حسابك ثم اضغط حفظ.</DialogDescription>
      </DialogHeader>
      <FieldGroup className="gap-4">
        <Field className="gap-2">
          <FieldLabel htmlFor="dlg-name" className="text-sm font-semibold">الاسم</FieldLabel>
          <Input id="dlg-name" defaultValue="محمد العتيبي" />
        </Field>
        <Field className="gap-2">
          <FieldLabel htmlFor="dlg-email" className="text-sm font-semibold">البريد الالكترونى</FieldLabel>
          <Input id="dlg-email" type="email" dir="ltr" defaultValue="mohammed@company.sa" />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" size="xl">إلغاء</Button>
        </DialogClose>
        <Button size="xl">حفظ</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
