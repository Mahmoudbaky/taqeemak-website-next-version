import { apiClient } from "@/lib/api/client";
import type {
  OnlineCheckoutRequest,
  OnlineCheckoutResponse,
  OnlinePaymentStatusResponse,
} from "@/types/api";

/** Creates the order and a Moyasar invoice; returns the hosted payment page URL. */
export const startOnlineCheckout = async (body: OnlineCheckoutRequest) =>
  (await apiClient.post<OnlineCheckoutResponse>("/api/v1/checkout", body)).data;

/** Payment status of an order after returning from Moyasar. */
export const verifyOnlinePayment = async (orderNumber: string) =>
  (
    await apiClient.get<OnlinePaymentStatusResponse>(
      `/api/v1/checkout/verify/${encodeURIComponent(orderNumber)}`
    )
  ).data;
