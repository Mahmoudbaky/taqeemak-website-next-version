import { cn } from "@/lib/utils";

/** The 1–5 rating strip from the feedback kiosk. Always LTR, like the device. */
export function KioskRating({ active, size = "md" }: { active: number; size?: "sm" | "md" }) {
  return (
    <div dir="ltr" className={cn("grid w-full grid-cols-5", size === "md" ? "gap-2" : "gap-1.5")}>
      {[1, 2, 3, 4, 5].map((n, i) => (
        <span
          key={n}
          className={cn(
            "flex items-center justify-center font-bold transition-all duration-350",
            size === "md" ? "h-14 rounded-xl text-[21px]" : "h-11 rounded-[10px]",
            i === active ? "scale-[1.08] bg-[#0059C4] text-white" : "bg-[#EEF3FA] text-[#0B1524]",
            size === "sm" && "scale-100"
          )}
        >
          {n}
        </span>
      ))}
    </div>
  );
}
