import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import type { Dictionary } from "@/i18n/dictionaries";

type Messages = Pick<Dictionary["common"], "required" | "invalidEmail" | "invalidPhone">;

const required = (m: Messages) => z.string().trim().min(1, m.required);
const email = (m: Messages) => z.email(m.invalidEmail).trim().toLowerCase();
const phone = (m: Messages) =>
  z.string().min(1, m.required).refine((v) => isValidPhoneNumber(v), m.invalidPhone);

export const loginSchema = (m: Messages) =>
  z.object({ email: email(m), password: z.string().min(1, m.required) });

export const registerSchema = (m: Messages, mismatch: string) =>
  z
    .object({
      nameAr: required(m),
      nameEn: required(m),
      record: required(m),
      companyName: z.string().max(500).optional(),
      email: email(m),
      mobile: phone(m),
      address: required(m),
      password: z.string().min(1, m.required),
      confirmPassword: z.string().min(1, m.required),
    })
    .refine((d) => d.password === d.confirmPassword, { path: ["confirmPassword"], message: mismatch });

export const contactSchema = (m: Messages) =>
  z.object({
    name: required(m),
    email: email(m),
    phone: z.string().refine((v) => !v || isValidPhoneNumber(v), m.invalidPhone),
    message: required(m),
  });

export const ticketCategories = ["BILLING", "SUPPORT", "GENERAL"] as const;
export const ticketPriorities = ["LOW", "HIGH", "CRITICAL"] as const;

export const ticketSchema = (m: Messages) =>
  z.object({
    crName: required(m),
    phone: phone(m),
    category: z.enum(ticketCategories),
    priority: z.enum(ticketPriorities),
    subject: required(m),
    problem: z.string().optional(),
  });

export const checkoutSchema = (m: Pick<Dictionary["checkout"], "receiverRequired" | "dateRequired">) =>
  z.object({
    qty: z.number().int().min(1).max(5),
    person: z.string().trim().min(1, m.receiverRequired),
    recDate: z.date({ error: m.dateRequired }),
  });

export const profileSchema = (m: Messages) =>
  z.object({ mobile: phone(m), email: email(m), record: z.string().optional() });

export const passwordSchema = (m: Messages, mismatch: string) =>
  z
    .object({
      currentPassword: z.string().min(1, m.required),
      newPassword: z.string().min(1, m.required),
      confirmPassword: z.string().min(1, m.required),
    })
    .refine((d) => d.newPassword === d.confirmPassword, { path: ["confirmPassword"], message: mismatch });

export type LoginValues = z.infer<ReturnType<typeof loginSchema>>;
export type RegisterValues = z.infer<ReturnType<typeof registerSchema>>;
export type ContactValues = z.infer<ReturnType<typeof contactSchema>>;
export type TicketValues = z.infer<ReturnType<typeof ticketSchema>>;
export type CheckoutValues = z.infer<ReturnType<typeof checkoutSchema>>;
export type ProfileValues = z.infer<ReturnType<typeof profileSchema>>;
export type PasswordValues = z.infer<ReturnType<typeof passwordSchema>>;
