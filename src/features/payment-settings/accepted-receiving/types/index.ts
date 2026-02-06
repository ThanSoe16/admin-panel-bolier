import { fileUploadResponseSchema } from "@/features/base/types";
import { z } from "zod";

export const acceptedReceivingPaymentSchema = z.object({
  id: z.string(),
  name: z.string(),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  ReceivingAccType: z.enum(["PAY", "BANKING"]),
  isQRRequired: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  fileId: z.string(),
  File: fileUploadResponseSchema,
});
export type AcceptedReceivingPaymentData = z.infer<
  typeof acceptedReceivingPaymentSchema
>;

export const createReceivingPaymentSchema = z.object({
  fileId: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  AcceptedAccountType: z.enum(["PAY", "BANKING"]),
  isQRRequired: z.boolean(),
});
export type CreateReceivingPaymentRequest = z.infer<
  typeof createReceivingPaymentSchema
>;

export const updateReceivingPaymentSchema = z.object({
  id: z.string(),
  fileId: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  AcceptedAccountType: z.enum(["PAY", "BANKING"]),
  isQRRequired: z.boolean(),
});
export type UpdateReceivingPaymentRequest = z.infer<
  typeof updateReceivingPaymentSchema
>;

export const receivingAccountConfigSchema = z.object({
  id: z.string(),
  maxReceivingAccount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ReceivingAccountConfigData = z.infer<
  typeof receivingAccountConfigSchema
>;
