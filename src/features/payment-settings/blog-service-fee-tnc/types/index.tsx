
import { z } from "zod";

export const blogServiceFeeTermsConditionsSchema = z.object({
  id: z.string(),
  content: z.string(),
  Status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BlogServiceFeeTermsConditionsData = z.infer<
  typeof blogServiceFeeTermsConditionsSchema
>;

export const updateBlogServiceFeeTermsConditionsSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export type UpdateBlogServiceFeeTermsConditionsRequest = z.infer<
  typeof updateBlogServiceFeeTermsConditionsSchema
>;


