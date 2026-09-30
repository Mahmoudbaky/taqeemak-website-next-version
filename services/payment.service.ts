import { apiClient } from "@/lib/api/client";
import type { GetCustomerPaymentsResponse } from "@/types/api";

export const getCustomerPayments = async (customerId: number) =>
  (await apiClient.get<GetCustomerPaymentsResponse>(`/api/v1/payments/customer/${customerId}`)).data;
