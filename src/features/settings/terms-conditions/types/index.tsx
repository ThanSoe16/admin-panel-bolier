import { z } from "zod";
import { landingLanguageSchema } from "@/features/landing-languages/types";

export const termsConditionsSchema = z.object({
  id: z.string(),
  description: z.string(),
  languageId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Language: landingLanguageSchema,
});

export type TermsConditionsData = z.infer<typeof termsConditionsSchema>;

export const termsConditionsFilterSchema = z.object({
  word: z.string().optional(),
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
});

export type TermsConditionsFilter = z.infer<typeof termsConditionsFilterSchema>;

export const updateTermsConditionsSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  languageId: z.string(),
});
export type UpdateTermsConditionsRequest = z.infer<
  typeof updateTermsConditionsSchema
>;

export const earningWithdrawalTNC = z.object({
  id: z.string(),
  content: z.string(),
  languageId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Language: landingLanguageSchema,
});

export type EarningWithdrawalTNCData = z.infer<typeof earningWithdrawalTNC>;
