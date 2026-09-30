import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Green circular check used on success states. */
export function CheckBadge({ className }: { className?: string }) {
  return (
    <span className={cn("flex size-16 items-center justify-center rounded-full bg-success-soft text-success", className)}>
      <CheckIcon className="size-8" strokeWidth={2.4} />
    </span>
  );
}
