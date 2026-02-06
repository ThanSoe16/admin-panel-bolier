import { RegistrationTermsConditionsTypeEnum } from "@/features/base/types/backend-defined-enums";
import { z } from "zod";

export const registrationTermsConditionsSchema = z.object({
  id: z.string(),
  content: z.string(),
  Status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  OTPServiceFeeType: z.nativeEnum(RegistrationTermsConditionsTypeEnum),
});

export type RegistrationTermsConditionsData = z.infer<
  typeof registrationTermsConditionsSchema
>;

export const updateRegistrationTermsConditionsSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export type UpdateRegistrationTermsConditionsRequest = z.infer<
  typeof updateRegistrationTermsConditionsSchema
>;


