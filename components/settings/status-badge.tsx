import { cn } from "@/lib/utils";

export type Tone = "info" | "success" | "warn" | "danger";

const tones: Record<Tone, string> = {
  info: "bg-soft text-link",
  success: "bg-success-soft text-success",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-destructive",
};

export function StatusBadge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-[13px] font-bold whitespace-nowrap", tones[tone])}>
      {children}
    </span>
  );
}
