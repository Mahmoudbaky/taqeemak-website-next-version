import Image, { type StaticImageData } from "next/image";
import { Reveal } from "./reveal";

/** Illustration + message + actions, used by not-found and error boundaries. */
export function StatusPage({
  image,
  title,
  description,
  children,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center gap-4.5 px-4 pt-18 pb-26 text-center sm:px-8">
      <Reveal>
        <Image src={image} alt="" priority className="h-auto w-[min(420px,100%)] rounded-3xl" />
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-2 text-[clamp(32px,4vw,48px)] font-extrabold">{title}</h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="text-lg text-muted-foreground">{description}</p>
      </Reveal>
      <Reveal delay={200} className="mt-2.5 flex flex-wrap justify-center gap-2.5">
        {children}
      </Reveal>
    </div>
  );
}
