import { Button, Spinner } from "@taqeemak/ui";

export const Sizes = () => (
  <div className="flex items-center gap-4 text-primary">
    <Spinner className="size-4" />
    <Spinner className="size-6" />
    <Spinner className="size-8" />
  </div>
);

export const InButton = () => (
  <Button size="xl" disabled>
    <Spinner />
    جارٍ التحقق من عملية الدفع...
  </Button>
);
