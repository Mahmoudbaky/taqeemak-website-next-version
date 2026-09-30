"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiClientError } from "@/lib/api/errors";
import { sendMessage } from "@/services/message.service";
import { createTicket } from "@/services/ticket.service";
import { uploadFile, type UploadFileOptions } from "@/services/upload.service";
import type { CreateMessageRequest, CreateMessageResponse, CreateTicketRequest, CreateTicketResponse } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useSendMessage() {
  return useMutation<CreateMessageResponse, ApiClientError, CreateMessageRequest>({
    mutationFn: sendMessage,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation<CreateTicketResponse, ApiClientError, CreateTicketRequest>({
    mutationFn: createTicket,
    onSuccess: (_, { customerId }) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets(customerId) }),
  });
}

/** File upload with progress, built on a mutation. */
export function useUpload(options: Omit<UploadFileOptions, "onUploadProgress"> = {}) {
  const [progress, setProgress] = useState(0);
  const mutation = useMutation({
    mutationFn: (file: File) =>
      uploadFile(file, {
        ...options,
        onUploadProgress: (e) => e.total && setProgress(Math.round((e.loaded * 100) / e.total)),
      }),
    onSettled: () => setProgress(0),
  });
  return { ...mutation, progress };
}
