import { z } from "zod";

export const durationType = z.enum(["HOUR", "DAY", "MONTH", "YEAR"]);
export const status = z.enum(["ACTIVE", "INACTIVE"]);

export const membershipPlanSchema = z.object({
  id: z.string(),
  amount: z.number(),
  DurationType: durationType,
  Status: status,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MembershipPlanData = z.infer<typeof membershipPlanSchema>;

export const createMembershipPlanSchema = z.object({
  amount: z.number(),
  DurationType: durationType,
});

export type CreateMembershipPlanRequest = z.infer<
  typeof createMembershipPlanSchema
>;

export const updateMembershipPlanSchema = z.object({
  id: z.string(),
  amount: z.number(),
  DurationType: durationType,
});

export type UpdateMembershipPlanRequest = z.infer<
  typeof updateMembershipPlanSchema
>;
