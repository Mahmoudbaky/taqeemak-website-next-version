"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import type { ApiClientError } from "@/lib/api/errors";
import { getShippingConfig, lookupNationalAddress } from "@/services/shipping.service";
import type { NationalAddressResponse } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useShippingConfig() {
  return useQuery({
    queryKey: queryKeys.shippingConfig(),
    queryFn: getShippingConfig,
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });
}

export function useNationalAddressLookup() {
  return useMutation<NationalAddressResponse, ApiClientError, string>({
    mutationFn: lookupNationalAddress,
  });
}
