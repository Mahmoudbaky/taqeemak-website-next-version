import { apiClient } from "@/lib/api/client";
import type { NationalAddressResponse, ShippingConfigResponse, ShippingQuoteResponse } from "@/types/api";

/** Flat shipping fee charged on device orders. */
export const getShippingConfig = async () =>
  (await apiClient.get<ShippingConfigResponse>("/api/v1/shipping/config")).data;

/** Shipping fee to a city (live OTO price or the flat fee). Display only — checkout recomputes it. */
export const getShippingQuote = async (city: string, qty: number) =>
  (await apiClient.post<ShippingQuoteResponse>("/api/v1/shipping/quote", { city, qty })).data;

/** Resolves a Saudi National Address short code (e.g. RGUC8214) into address fields. */
export const lookupNationalAddress = async (shortCode: string) =>
  (
    await apiClient.get<NationalAddressResponse>(
      `/api/v1/shipping/address/${encodeURIComponent(shortCode)}`
    )
  ).data;
