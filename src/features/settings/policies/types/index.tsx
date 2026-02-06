import { landingLanguageSchema } from '@/features/landing-languages/types';
import { z } from 'zod';

export const policySchema = z.object({
  id: z.string(),
  description: z.string(),
  languageId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Language: landingLanguageSchema,
});

export type PolicyData = z.infer<typeof policySchema>;

export const policyFilterSchema = z.object({
  word: z.string().optional(),
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
});

export type PolicyFilter = z.infer<typeof policyFilterSchema>;

export const updatePolicySchema = z.object({
  id: z.string(),
  description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
  languageId: z.string(),
});
export type UpdatePolicyRequest = z.infer<typeof updatePolicySchema>;
