import { apiClient } from "@/lib/api/client";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  CurrentUserResponse,
  EmailOrMobileVerificationCodeRequest,
  EmailOrMobileVerificationCodeResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  VerifyEmailOrMobileVerificationCodeRequest,
  VerifyEmailOrMobileVerificationCodeResponse,
} from "@/types/api";

const AUTH = "/api/v1/website/auth";

export const registerCustomer = async (body: RegisterRequest) =>
  (await apiClient.post<RegisterResponse>(`${AUTH}/register`, body)).data;

export const loginCustomer = async (body: LoginRequest) =>
  (await apiClient.post<LoginResponse>(`${AUTH}/login`, body)).data;

export const getCurrentUser = async () =>
  (await apiClient.get<CurrentUserResponse>(`${AUTH}/me`)).data;

/** Backend reads the refresh token from its HTTP-only cookie. */
export const logoutCustomer = async () =>
  (await apiClient.post<LogoutResponse>(`${AUTH}/logout`, {})).data;

export const logoutAllDevices = async () =>
  (await apiClient.post<LogoutResponse>(`${AUTH}/logout-all`)).data;

export const updateProfile = async (body: UpdateProfileRequest) =>
  (await apiClient.put<UpdateProfileResponse>(`${AUTH}/update-profile`, body)).data;

export const changePassword = async (body: ChangePasswordRequest) =>
  (await apiClient.post<ChangePasswordResponse>(`${AUTH}/change-password`, body)).data;

/** Sends an OTP to the customer's email or mobile (whichever is provided). */
export const sendVerificationCode = async (body: EmailOrMobileVerificationCodeRequest) =>
  (
    await apiClient.post<EmailOrMobileVerificationCodeResponse>(
      "/api/v1/validations/set-otp-to-verify-customer-email-or-mobile",
      body
    )
  ).data;

/** Confirms the customer's email or mobile with the received OTP. */
export const verifyCode = async (body: VerifyEmailOrMobileVerificationCodeRequest) =>
  (
    await apiClient.post<VerifyEmailOrMobileVerificationCodeResponse>(
      "/api/v1/validations/verify-customer-email-or-mobile",
      body
    )
  ).data;
