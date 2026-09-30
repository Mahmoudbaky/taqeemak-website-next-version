"use client";

import { useQuery } from "@tanstack/react-query";
import { getCustomerOrders } from "@/services/order.service";
import { getCustomerPayments } from "@/services/payment.service";
import { getCustomerTickets } from "@/services/ticket.service";
import { useCurrentUser } from "./use-auth";
import { queryKeys } from "./query-keys";

const STALE_TIME = 2 * 60 * 1000;

export function useCustomerOrders() {
  const { user } = useCurrentUser();
  return useQuery({
    queryKey: queryKeys.orders(user?.Cu_ID),
    queryFn: () => getCustomerOrders(user!.Cu_ID),
    enabled: !!user,
    staleTime: STALE_TIME,
    select: (res) => res.data,
  });
}

export function useCustomerPayments() {
  const { user } = useCurrentUser();
  return useQuery({
    queryKey: queryKeys.payments(user?.Cu_ID),
    queryFn: () => getCustomerPayments(user!.Cu_ID),
    enabled: !!user,
    staleTime: STALE_TIME,
    select: (res) => res.data,
  });
}

export function useCustomerTickets() {
  const { user } = useCurrentUser();
  return useQuery({
    queryKey: queryKeys.tickets(user?.Cu_ID),
    queryFn: () => getCustomerTickets(user!.Cu_ID),
    enabled: !!user,
    staleTime: STALE_TIME,
    select: (res) => res.data,
  });
}
