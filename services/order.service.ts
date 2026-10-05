import { apiClient } from "@/lib/api/client";
import type { CreateOrderRequest, CreateOrderResponse, GetCustomerOrdersResponse } from "@/types/api";

export const createOrder = async (body: CreateOrderRequest) =>
  (await apiClient.post<CreateOrderResponse>("/api/v1/orders", body)).data;

export const getCustomerOrders = async (customerId: string) =>
  (await apiClient.get<GetCustomerOrdersResponse>(`/api/v1/orders/customer/${customerId}`)).data;
