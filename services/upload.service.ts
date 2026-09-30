import type { AxiosProgressEvent } from "axios";
import { apiClient } from "@/lib/api/client";
import type { ApiResponse } from "@/types/api";

export enum MediaType {
  CUSTOMER_PROFILE_IMAGE = "customer-profiles",
  USER_PROFILE_IMAGE = "user-profiles",
  TICKET_DOCUMENT = "ticket-documents",
  PAYMENT_DOCUMENT = "payment-documents",
  PRODUCT_IMAGE = "products",
  CUSTOMER_LOGO = "customer-logos",
  COMPANY_LOGO = "company-logos",
}

export interface UploadData {
  url: string;
  secureUrl: string;
  publicId: string;
  mediaId?: number;
  width?: number;
  height?: number;
}

export interface UploadFileOptions {
  customerId?: number;
  mediaType?: MediaType;
  onUploadProgress?: (event: AxiosProgressEvent) => void;
}

export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

export const uploadFile = async (
  file: File,
  { customerId, mediaType = MediaType.USER_PROFILE_IMAGE, onUploadProgress }: UploadFileOptions = {}
) => {
  if (file.size > MAX_UPLOAD_SIZE) throw new Error("File too large. Maximum size is 10MB");

  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = { "X-Media-Type": mediaType };
  if (customerId) headers["X-Customer-Id"] = String(customerId);

  const { data } = await apiClient.post<ApiResponse<UploadData>>("/api/v1/upload/file", formData, {
    headers,
    onUploadProgress,
  });
  if (!data.success || !data.data) throw new Error(data.message || "Upload failed");
  return data.data;
};
