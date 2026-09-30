"use client";

import { useSyncExternalStore } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiClientError } from "@/lib/api/errors";
import { clearAccessToken, getAccessToken, setAccessToken, subscribeToAccessToken } from "@/lib/auth/token";
import {
  changePassword,
  getCurrentUser,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  sendVerificationCode,
  updateProfile,
  verifyCode,
} from "@/services/auth.service";
import type {
  ChangePasswordRequest,
  EmailOrMobileVerificationCodeRequest,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  VerifyEmailOrMobileVerificationCodeRequest,
} from "@/types/api";
import { queryKeys } from "./query-keys";

/** Reactive "is there a stored access token" flag; always false during SSR. */
export function useHasAccessToken() {
  return useSyncExternalStore(
    subscribeToAccessToken,
    () => !!getAccessToken(),
    () => false
  );
}

export function useCurrentUser() {
  const hasToken = useHasAccessToken();
  const query = useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: getCurrentUser,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });

  const user = hasToken ? (query.data ?? null) : null;
  return {
    user,
    isLoggedIn: !!user,
    /** True until we know whether the visitor is signed in. */
    isPending: hasToken && query.isPending,
    error: query.error,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof loginCustomer>>, ApiClientError, LoginRequest>({
    mutationFn: loginCustomer,
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      queryClient.setQueryData(queryKeys.currentUser(), {
        success: true,
        message: "",
        data: data.customer,
        timestamp: new Date().toISOString(),
      });
    },
  });
}

export function useRegister() {
  return useMutation<Awaited<ReturnType<typeof registerCustomer>>, ApiClientError, RegisterRequest>({
    mutationFn: registerCustomer,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiClientError, void>({
    mutationFn: () => logoutCustomer(),
    // Sign out locally even if the server call fails.
    onSettled: () => {
      clearAccessToken();
      queryClient.removeQueries({ queryKey: queryKeys.currentUser() });
      queryClient.removeQueries({ queryKey: ["customer"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof updateProfile>>, ApiClientError, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.currentUser() }),
  });
}

export function useChangePassword() {
  return useMutation<Awaited<ReturnType<typeof changePassword>>, ApiClientError, ChangePasswordRequest>({
    mutationFn: changePassword,
  });
}

export function useSendVerificationCode() {
  return useMutation<
    Awaited<ReturnType<typeof sendVerificationCode>>,
    ApiClientError,
    EmailOrMobileVerificationCodeRequest
  >({ mutationFn: sendVerificationCode });
}

export function useVerifyCode() {
  const queryClient = useQueryClient();
  return useMutation<
    Awaited<ReturnType<typeof verifyCode>>,
    ApiClientError,
    VerifyEmailOrMobileVerificationCodeRequest
  >({
    mutationFn: verifyCode,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.currentUser() }),
  });
}
