import type { GetProductsParams } from "@/types/api";

export const queryKeys = {
  currentUser: () => ["currentUser"] as const,
  products: (params?: GetProductsParams) => ["products", params ?? {}] as const,
  paymentStatus: (orderNumber: string | null) => ["paymentStatus", orderNumber] as const,
  shippingConfig: () => ["shippingConfig"] as const,
  customer: (customerId: string | undefined) => ["customer", customerId] as const,
  orders: (customerId: string | undefined) => ["customer", customerId, "orders"] as const,
  payments: (customerId: string | undefined) => ["customer", customerId, "payments"] as const,
  tickets: (customerId: string | undefined) => ["customer", customerId, "tickets"] as const,
};
