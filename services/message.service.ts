import { apiClient } from "@/lib/api/client";
import type { CreateMessageRequest, CreateMessageResponse } from "@/types/api";

/** Public contact form. */
export const sendMessage = async (body: CreateMessageRequest) =>
  (await apiClient.post<CreateMessageResponse>("/api/v1/messages", body)).data;
