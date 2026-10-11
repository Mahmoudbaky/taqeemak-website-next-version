// Bundle-time stand-in for next/image (no Next image optimizer outside the app).
type Src = string | { src: string; width?: number; height?: number };

export type StaticImageData = { src: string; width: number; height: number };

export default function Image({
  src,
  alt,
  priority,
  fill,
  quality,
  placeholder,
  loader,
  unoptimized,
  ...rest
}: Omit<React.ComponentProps<"img">, "src"> & {
  src: Src;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  placeholder?: string;
  loader?: unknown;
  unoptimized?: boolean;
}) {
  const url = typeof src === "string" ? src : src.src;
  return <img src={url} alt={alt} loading={priority ? "eager" : "lazy"} {...rest} />;
}
