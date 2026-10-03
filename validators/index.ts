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

export const SHORT_ADDRESS_PATTERN = /^[A-Za-z]{4}\d{4}$/;

/** Delivery address (Saudi National Address); only validated for device products. */
const shippingSchema = (m: Messages, c: Pick<Dictionary["checkout"], "postalInvalid" | "shortAddressInvalid">) =>
  z.object({
    receiverMobile: phone(m),
    city: required(m),
    district: required(m),
    street: required(m),
    buildingNo: z.string().trim().max(10).optional(),
    postalCode: z.string().trim().refine((v) => !v || /^\d{5}$/.test(v), c.postalInvalid).optional(),
    shortAddress: z
      .string()
      .trim()
      .refine((v) => !v || SHORT_ADDRESS_PATTERN.test(v), c.shortAddressInvalid)
      .optional(),
  });

export const checkoutSchema = (
  m: Messages,
  c: Pick<Dictionary["checkout"], "receiverRequired" | "dateRequired" | "postalInvalid" | "shortAddressInvalid">,
  needsShipping: boolean
) =>
  z.object({
    qty: z.number().int().min(1).max(5),
    person: z.string().trim().min(1, c.receiverRequired),
    recDate: z.date({ error: c.dateRequired }),
    // Certificates are digital: any address values are ignored and dropped on submit
    shipping: needsShipping ? shippingSchema(m, c) : z.unknown().optional(),
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
export type ShippingValues = z.infer<ReturnType<typeof shippingSchema>>;
export type CheckoutValues = Omit<z.infer<ReturnType<typeof checkoutSchema>>, "shipping"> & {
  shipping?: ShippingValues;
};
export type ProfileValues = z.infer<ReturnType<typeof profileSchema>>;
export type PasswordValues = z.infer<ReturnType<typeof passwordSchema>>;
