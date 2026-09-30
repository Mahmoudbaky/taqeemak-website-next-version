"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LocaleLink } from "@/components/shared/locale-link";
import { Reveal } from "@/components/shared/reveal";
import { useProducts } from "@/hooks/use-products";
import { useI18n } from "@/i18n/dictionary-provider";
import type { ProductItem } from "@/types/api";

export const productName = (p: ProductItem, locale: string) => (locale === "ar" ? p.Pr_NameAr : p.Pr_NameEn);
export const currencyLabel = (p: ProductItem, locale: string, fallback: string) =>
  (locale === "ar" ? p.Currencies?.Cr_NameAr : p.Currencies?.Cr_NameEn) || fallback;

export function ProductPhoto({ product, sizes }: { product: ProductItem; sizes: string }) {
  const src = product.Pr_Photos?.[0];
  if (!src) {
    return (
      <div className="flex size-full items-center justify-center bg-[repeating-linear-gradient(135deg,var(--soft)_0_10px,var(--background)_10px_20px)]" />
    );
  }
  return <Image src={src} alt="" fill sizes={sizes} className="object-cover" />;
}

export function ProductsGrid() {
  const { dict, locale } = useI18n();
  const { data, isPending, isError, refetch } = useProducts({ page: 1, limit: 12 });

  if (isPending) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-[20px] border bg-card p-3">
            <Skeleton className="h-[210px] rounded-xl" />
            <Skeleton className="mx-2 h-5 w-2/3" />
            <Skeleton className="mx-2 mb-2 h-9" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data.items.length) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[20px] border border-dashed bg-card p-10 text-center text-muted-foreground">
        {isError ? dict.home.productsError : dict.home.noProducts}
        {isError && (
          <Button variant="outline" onClick={() => refetch()}>
            {dict.common.retry}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
      {data.items.map((product, i) => (
        <Reveal key={product.Pr_ID} delay={(i % 4) * 90}>
          <LocaleLink
            href={`/checkout?productId=${product.Pr_ID}`}
            className="group flex h-full flex-col gap-4 rounded-[20px] border bg-card p-3 text-foreground transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(10,30,54,.1)]"
          >
            <div className="relative h-[210px] overflow-hidden rounded-xl">
              <ProductPhoto product={product} sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3.5 px-2 pb-2">
              <span className="text-lg font-bold">{productName(product, locale)}</span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[17px] font-bold">
                  {product.Pr_Price} {currencyLabel(product, locale, dict.common.rs)}{" "}
                  <span className="text-sm font-medium text-muted-foreground">{dict.common.month}</span>
                </span>
                <span className="rounded-lg bg-primary px-3.5 py-2 text-sm font-bold text-white group-hover:bg-deep">
                  {dict.common.orderNow}
                </span>
              </div>
            </div>
          </LocaleLink>
        </Reveal>
      ))}
    </div>
  );
}
