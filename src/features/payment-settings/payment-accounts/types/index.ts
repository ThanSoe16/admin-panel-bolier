import { z } from "zod";
import { paymentMethodSchema } from "../../payment-methods/types";
import { status } from "@/features/membership/plans/types";

export const paymentAccountSchema = z.object({
  id: z.string(),
  order: z.number(),
  name: z.string(),
  number: z.string(),
  Status: status,
  MembershipPaymentMethod: paymentMethodSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type PaymentAccountData = z.infer<typeof paymentAccountSchema>;

export const createPaymentAccountSchema = z.object({
  paymentMethodId: z.string().min(1, { message: "Payment method is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  number: z.string().min(1, { message: "Number is required" }),
  Status: status,
});
export type CreatePaymentAccountRequest = z.infer<
  typeof createPaymentAccountSchema
>;

export const updatePaymentAccountSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  paymentMethodId: z.string().min(1, { message: "Payment method is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  number: z.string().min(1, { message: "Number is required" }),
  Status: status,
});
export type UpdatePaymentAccountRequest = z.infer<
  typeof updatePaymentAccountSchema
>;
