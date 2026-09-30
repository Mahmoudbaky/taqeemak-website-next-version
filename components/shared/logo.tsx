import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.png";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return <Image src={logo} alt="Taqeemak" priority={priority} className={cn("h-[38px] w-auto", className)} />;
}

/** Logo on a white chip, for dark (navy) surfaces. */
export function LogoChip({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex self-start rounded-[10px] bg-white px-3 py-2", className)}>
      <Logo className="h-[30px]" />
    </span>
  );
}
