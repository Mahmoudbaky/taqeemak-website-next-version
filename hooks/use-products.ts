"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import type { GetProductsParams } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useProducts(params?: GetProductsParams) {
  return useQuery({
    queryKey: queryKeys.products(params),
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });
}
