import { Skeleton } from "@taqeemak/ui";

export const ProfileLoading = () => (
  <div className="flex max-w-[420px] items-center gap-4 rounded-[20px] border bg-card p-6">
    <Skeleton className="size-14 rounded-full" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

export const CardLoading = () => (
  <div className="flex max-w-[320px] flex-col gap-3">
    <Skeleton className="aspect-video w-full rounded-xl" />
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-11 w-full" />
  </div>
);
