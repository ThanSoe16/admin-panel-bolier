import { fileUploadResponseSchema } from "@/features/base/types";
import { userReceivingAccountSchema, userSchema } from "@/features/users/types";
import { z } from "zod";

export const withdrawalHistorySchema = z.object({
  id: z.string(),
  username: z.string(),
  withdrawalDate: z.string(),
  withdrawalAmount: z.number(),

  recipientAccount: z.object({
    accountName: z.string(),
    accountNumber: z.string(),
    accountMethodName: z.string(),
  }),
  status: z.enum(["Accepted", "Rejected"]),
});

export type WithdrawalHistoryData = z.infer<typeof withdrawalHistorySchema>;

export const withdrawalRequestSchema = z.object({
  id: z.string(),
  transactionId: z.string(),
  OneSiteUser: z.object({
    username: z.string(),
  }),
  totalRequestAmount: z.number(),
  paidAmount: z.number(),
  exchangeFee: z.number(),
  exchangeRate: z.number(),
  totalWithdrawFee: z.number(),
  requestedDate: z.string(),
  confirmedDate: z.string(),
  OnesiteUserReceivingAccount: z.object({
    accountName: z.string(),
    accountNumber: z.string(),
    AcceptedReceivingAccount: z.object({
      name: z.string(),
      File: z.object({
        url: z.string(),
      }),
    }),
  }),

  OnesiteWithdrawStatus: z.enum(["REQUESTED", "REJECTED", "SUCCESSFUL"]),
});

export type WithdrawalRequestData = z.infer<typeof withdrawalRequestSchema>;

export const withdrawalRequestDetailSchema = z.object({
  id: z.string(),
  transactionId: z.string(),
  totalRequestAmount: z.number(),
  originalPaidAmount: z.number(),
  paidAmount: z.number(),
  exchangeRate: z.number(),
  exchangeFee: z.number(),
  withdrawFee: z.number(),
  totalWithdrawFee: z.number(),
  withdrawFeeType: z.enum(["PERCENTAGE", "FIX_AMOUNT"]),
  transactionFee: z.number(),
  rejectReason: z.null(),
  onesiteUserReceivingAccountId: z.string(),
  onesiteUserId: z.string(),
  withdrawDate: z.null(),
  requestedDate: z.string(),
  confirmedDate: z.null(),
  ApprovedByAdminId: z.string(),
  PaymentProof: fileUploadResponseSchema,
  OneSiteUser: userSchema,
  OnesiteUserReceivingAccount: userReceivingAccountSchema,
  OnesiteWithdrawStatus: z.enum(["REQUESTED", "REJECTED", "SUCCESSFUL"]),
});

export type WithdrawalRequestDetailData = z.infer<
  typeof withdrawalRequestDetailSchema
>;

export const approveWithdrawalRequestSchema = z.object({
  id: z.string(),
  paymentProofId: z.string(),
});

export type ApproveWithdrawalRequestRequest = z.infer<
  typeof approveWithdrawalRequestSchema
>;

export const rejectWithdrawalRequestSchema = z.object({
  id: z.string(),
  reason: z.string(),
});

export type RejectWithdrawalRequestRequest = z.infer<
  typeof rejectWithdrawalRequestSchema
>;

export const withdrawalSettingSchema = z.object({
  id: z.string(),
  monthlyWithdrawDate: z.number(),
  monthlyWithdrawLimit: z.number(),
  dailyTransactionLimit: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type WithdrawalSettingData = z.infer<typeof withdrawalSettingSchema>;

export const updateWithdrawalSettingSchema = z.object({
  monthlyWithdrawDate: z.string(),
  monthlyWithdrawLimit: z.string(),
  dailyTransactionLimit: z.string(),
});

export type UpdateWithdrawalSettingRequest = z.infer<
  typeof updateWithdrawalSettingSchema
>;
