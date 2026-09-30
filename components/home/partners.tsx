import Image from "next/image";

const partners = [1, 2, 3, 4, 5].map((n) => `/images/partners/partner-${n}.webp`);

export function Partners({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-10 overflow-hidden border-y py-[26px]">
      <span className="flex-none ps-4 text-sm font-bold text-muted-foreground sm:ps-8">{title}</span>
      <div className="flex-1 overflow-hidden" dir="ltr">
        {/* Two copies so the -50% marquee loops seamlessly. */}
        <div className="flex w-max animate-marquee items-center gap-[88px]">
          {[...partners, ...partners].map((src, i) => (
            <Image key={i} src={src} alt="" width={126} height={37} aria-hidden={i >= partners.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
