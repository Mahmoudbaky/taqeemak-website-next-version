import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/auth/token";
import { defaultLocale, hasLocale } from "@/i18n/config";
import type { ApiResponse } from "@/types/api";
import { ApiClientError } from "./errors";

const baseConfig = {
  // Same-origin: next.config.ts proxies /api/v1/* to the backend, which keeps the
  // refreshToken + fgp HTTP-only cookies first-party (mobile browsers block third-party ones).
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 30_000,
};

export const apiClient = axios.create(baseConfig);
const refreshClient = axios.create(baseConfig);

const AUTH_ENDPOINTS = ["/auth/refresh", "/auth/login", "/auth/register"];

const currentLocale = () => {
  if (typeof window === "undefined") return defaultLocale;
  const segment = window.location.pathname.split("/")[1];
  return hasLocale(segment) ? segment : defaultLocale;
};

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof FormData) delete config.headers["Content-Type"];
  config.headers["Accept-Language"] = currentLocale();
  return config;
});

/* ---------------------------------------------------------------------------
 * Token refresh: concurrent 401s share a single refresh request.
 * ------------------------------------------------------------------------- */
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = () => {
  refreshPromise ??= refreshClient
    .post<ApiResponse<{ accessToken: string }>>("/api/v1/website/auth/refresh", {})
    .then(({ data }) => {
      setAccessToken(data.data.accessToken);
      return data.data.accessToken;
    })
    .catch(() => {
      clearAccessToken();
      return null;
    })
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
};

const toApiClientError = (error: AxiosError) => {
  if (error.response) {
    const message =
      (error.response.data as { message?: string } | undefined)?.message ||
      error.message ||
      `Request failed with status ${error.response.status}`;
    return new ApiClientError(message, error.response.status, error.response.data);
  }
  if (error.request) {
    return new ApiClientError("Network error: No response from server", undefined, error.request);
  }
  return new ApiClientError(error.message || "An unknown error occurred", undefined, error);
};

apiClient.interceptors.response.use(undefined, async (error: AxiosError) => {
  const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
  const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => original?.url?.includes(path));

  if (error.response?.status === 401 && original && !original._retry && !isAuthEndpoint) {
    original._retry = true;
    const hadToken = !!getAccessToken();
    const token = await refreshAccessToken();

    if (token) {
      original.headers.Authorization = `Bearer ${token}`;
      // Replayed through apiClient so interceptors (and error mapping) still apply.
      return apiClient(original);
    }
    if (hadToken && typeof window !== "undefined") {
      // Outside React (axios interceptor), so a hard navigation is the only option.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = `/${currentLocale()}/login`;
    }
  }

  throw toApiClientError(error);
});
