"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { ApiClientError } from "@/lib/api/errors";
import { getShippingConfig, getShippingQuote, lookupNationalAddress } from "@/services/shipping.service";
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

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

/**
 * Shipping fee shown at checkout. With live pricing it follows the typed city (debounced);
 * until a city is known, or if the quote fails, the flat fee is shown. The backend recomputes it.
 */
export function useShippingFee({ enabled, city, qty }: { enabled: boolean; city: string; qty: number }) {
  const config = useShippingConfig();
  const debouncedCity = useDebouncedValue(city.trim(), 600);
  const isLive = config.data?.pricing === "live";

  const quote = useQuery({
    queryKey: queryKeys.shippingQuote(debouncedCity, qty),
    queryFn: () => getShippingQuote(debouncedCity, qty),
    enabled: enabled && isLive && debouncedCity.length >= 2,
    staleTime: 10 * 60 * 1000,
    retry: false,
    select: (res) => res.data,
  });

  if (!enabled) return { fee: 0, needsCity: false, isLoading: false, courierName: null };
  return {
    fee: quote.data?.fee ?? config.data?.fee ?? 0,
    /** Live pricing but no city yet: the fee is still unknown */
    needsCity: isLive && debouncedCity.length < 2,
    isLoading: config.isPending || quote.isFetching,
    courierName: quote.data?.deliveryOptionName ?? null,
  };
}
