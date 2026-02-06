import { fileUploadResponseSchema } from "@/features/base/types";
import z from "zod";

export const transactionFeeSchema = z.object({
  id: z.string(),
  order: z.number(),
  fileId: z.string(),
  name: z.string(),
  paymentKey: z.string(),
  trxFee: z.number(),
  trxFeeType: z.enum(["PERCENTAGE", "FIX_AMOUNT"]),
  PaymentMethodChannels: z.array(z.string()),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  File: fileUploadResponseSchema,
});

export type TransactionFeeData = z.infer<typeof transactionFeeSchema>;

export const updateTransactionFeeSchema = z.object({
  id: z.string(),
  TrxType: z.enum(["PERCENTAGE", "FIX_AMOUNT"]),
  amount: z.string(),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type UpdateTransactionFeeRequest = z.infer<
  typeof updateTransactionFeeSchema
>;

export const TransactionHistoyFilterSchema = z.object({
  id: z.string(),
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type TransactionHistoyFilter = z.infer<
  typeof TransactionHistoyFilterSchema
>;

export const transactionFeeHistorySchema = z.object({
  id: z.string(),
  amount: z.number(),
  trxFeeType: z.enum(["PERCENTAGE", "FIX_AMOUNT"]),
  prevTrxFeeType: z.enum(["PERCENTAGE", "FIX_AMOUNT"]),
  previousAmount: z.number(),
  membershipPaymentMethodId: z.string(),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  lastModifyDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  MembershipPaymentMethod: transactionFeeSchema,
});

export type TransactionFeeHistoryData = z.infer<
  typeof transactionFeeHistorySchema
>;

export const withdrawFeeSchema = z.object({
  id: z.string(),
  amount: z.number(),
  feeType: z.enum(["PERCENTAGE", "FIX_AMOUNT"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastModifyDate: z.string(),
});

export type WithdrawFeeData = z.infer<typeof withdrawFeeSchema>;

export const updateWithdrawFeeSchema = z.object({
  amount: z.string(),
  feeType: z.enum(["PERCENTAGE", "FIX_AMOUNT"]),
});

export type UpdateWithdrawFeeRequest = z.infer<typeof updateWithdrawFeeSchema>;

export const WithdrawHistoyFilterSchema = z.object({
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type WithdrawHistoyFilter = z.infer<typeof WithdrawHistoyFilterSchema>;
