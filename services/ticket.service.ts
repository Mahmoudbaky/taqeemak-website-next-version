import { apiClient } from "@/lib/api/client";
import type { CreateTicketRequest, CreateTicketResponse, GetCustomerTicketsResponse } from "@/types/api";

export const createTicket = async (body: CreateTicketRequest) =>
  (await apiClient.post<CreateTicketResponse>("/api/v1/tickets", body)).data;

export const getCustomerTickets = async (customerId: number) =>
  (await apiClient.get<GetCustomerTicketsResponse>(`/api/v1/tickets/customer/${customerId}`)).data;
