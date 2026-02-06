import { adminSchema } from "@/features/admins/types";
import { z } from "zod";

export const serviceFeeHistorySchema = z.object({
  id: z.string(),
  to: z.string(),
  from: z.string(),
  updatedAt: z.string(),
  updatedById: z.string(),
  updatedBy: adminSchema,
});

export type ServiceFeeHistoryData = z.infer<typeof serviceFeeHistorySchema>;

export const maintainFeeSchema = z.object({
  id: z.string(),
  maintainFee: z.string(),
  updatedAt: z.string(),
  updatedById: z.string(),
  UpdatedBy: adminSchema,
});

export const maintainFeeDetailSchema = z.object({
  latestData: maintainFeeSchema,
  datalist: z.array(serviceFeeHistorySchema),
});
export type MaintainFeeDetailData = z.infer<typeof maintainFeeDetailSchema>;

export const setupFeeSchema = z.object({
  id: z.string(),
  setupFee: z.string(),
  updatedAt: z.string(),
  updatedById: z.string(),
  UpdatedBy: adminSchema,
});

export const setupFeeDetailSchema = z.object({
  latestData: setupFeeSchema,
  datalist: z.array(serviceFeeHistorySchema),
});
export type SetupFeeDetailData = z.infer<typeof setupFeeDetailSchema>;

export const hostingFeeSchema = z.object({
  id: z.string(),
  hostingFee: z.string(),
  updatedAt: z.string(),
  updatedById: z.string(),
  UpdatedBy: adminSchema,
});

export type HostingFeeData = z.infer<typeof hostingFeeSchema>;

export const hostingFeeDetailSchema = z.object({
  latestData: hostingFeeSchema,
  datalist: z.array(serviceFeeHistorySchema),
});
export type HostingFeeDetailData = z.infer<typeof hostingFeeDetailSchema>;

export const hostingRenewFeeSchema = z.object({
  id: z.string(),
  hostingRenewFee: z.string(),
  updatedAt: z.string(),
  updatedById: z.string(),
  updatedBy: adminSchema,
});

export type HostingRenewFeeData = z.infer<typeof hostingRenewFeeSchema>;

export const hostingRenewFeeDetailSchema = z.object({
  latestData: hostingRenewFeeSchema,
  datalist: z.array(serviceFeeHistorySchema),
});
export type HostingRenewFeeDetailData = z.infer<
  typeof hostingRenewFeeDetailSchema
>;
