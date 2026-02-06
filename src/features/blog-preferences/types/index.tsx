import { fileUploadResponseSchema } from "@/features/base/types";
import { z } from "zod";

export const blogLanguageSchema = z.object({
  id: z.string(),
  index: z.number(),
  isDefault: z.boolean(),
  fileId: z.string(),
  name: z.string(),
  key: z.string(),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  File: fileUploadResponseSchema,
});

export type BlogLanguageData = z.infer<typeof blogLanguageSchema>;

export const reOrderRowSchema = z.object({
  id1: z.string(),
  id2: z.string(),
});

export type ReOrderRowType = z.infer<typeof reOrderRowSchema>;

export const createBlogLanguageSchema = z.object({
  fileId: z.string().min(1, "Image is required"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be at most 30 characters"),
  key: z.string(),
  isDefault: z.boolean(),
});

export type CreateBlogLanguageRequest = z.infer<
  typeof createBlogLanguageSchema
>;

export const updateBlogLanguageSchema = createBlogLanguageSchema;

export type UpdateBlogLanguageRequest = z.infer<
  typeof updateBlogLanguageSchema
>;

export const blogMerchantAccountLimitSchema = z.object({
  id: z.string(),
  numberOfMerchant: z.number(),
});

export type BlogMerchantAccountLimitData = z.infer<typeof blogMerchantAccountLimitSchema>;

export const updateBlogMerchantAccountLimitSchema = z.object({
  numberOfMerchant: z.number().gt(0, "Number of merchant must be greater than 0"),
});

export type UpdateBlogMerchantAccountLimitRequest = z.infer<typeof updateBlogMerchantAccountLimitSchema>;

