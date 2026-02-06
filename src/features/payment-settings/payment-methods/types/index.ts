import { fileUploadResponseSchema } from "@/features/base/types";
import { status } from "@/features/membership/plans/types";
import { z } from "zod";

const paymentChannel = z.enum([
  "PAY_BY_QRCODE",
  "PWAAPP",
  "PIN",
  "NOTI",
  "WEB",
  "upi",
  "uabpay",
  "mmqr",
]);
export const paymentMethodSchema = z.object({
  id: z.string(),
  order: z.number(),
  fileId: z.string(),
  name: z.string(),
  paymentKey: z.string(),
  PaymentMethodChannels: z.array(paymentChannel),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  File: fileUploadResponseSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type PaymentMethodData = z.infer<typeof paymentMethodSchema>;

export const createPaymentMethodSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  paymentKey: z.string().optional(),
  fileId: z.string().optional(),
  PaymentChannels: z.array(paymentChannel),
  Status: status,
});
export type CreatePaymentMethodRequest = z.infer<
  typeof createPaymentMethodSchema
>;

export const updatePaymentMethodSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  paymentKey: z.string().optional(),
  fileId: z.string().optional().nullable(),
  PaymentChannels: z.array(paymentChannel),
  Status: status,
});
export type UpdatePaymentMethodRequest = z.infer<
  typeof updatePaymentMethodSchema
>;
