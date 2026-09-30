import { apiClient } from "@/lib/api/client";
import type { GetProductsParams, GetProductsResponse } from "@/types/api";

export const getProducts = async (params?: GetProductsParams) =>
  (
    await apiClient.get<GetProductsResponse>("/api/v1/products", {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        sortBy: params?.sortBy ?? "Pr_ID",
        sortOrder: params?.sortOrder ?? "desc",
      },
    })
  ).data;
