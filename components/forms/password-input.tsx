"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/dictionary-provider";
import { cn } from "@/lib/utils";

export function PasswordInput({ className, ...props }: Omit<React.ComponentProps<"input">, "type">) {
  const { dict } = useI18n();
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input {...props} type={visible ? "text" : "password"} className={cn("pe-16", className)} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-pressed={visible}
        className="absolute end-2 top-1/2 h-8 -translate-y-1/2 rounded-md bg-soft px-2.5 text-xs font-bold text-muted-foreground"
      >
        {visible ? dict.common.hide : dict.common.show}
      </button>
    </div>
  );
}
