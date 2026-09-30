"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import type { ApiClientError } from "@/lib/api/errors";
import { startOnlineCheckout, verifyOnlinePayment } from "@/services/checkout.service";
import type { OnlineCheckoutRequest, OnlineCheckoutResponse } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useOnlineCheckout() {
  return useMutation<OnlineCheckoutResponse, ApiClientError, OnlineCheckoutRequest>({
    mutationFn: startOnlineCheckout,
  });
}

/** Polls a few times while Moyasar still reports the payment as pending. */
export function usePaymentStatus(orderNumber: string | null) {
  return useQuery({
    queryKey: queryKeys.paymentStatus(orderNumber),
    queryFn: () => verifyOnlinePayment(orderNumber!),
    enabled: !!orderNumber,
    retry: 1,
    refetchInterval: (query) =>
      query.state.data?.data.status === "PENDING" && query.state.dataUpdateCount < 5 ? 3000 : false,
  });
}
