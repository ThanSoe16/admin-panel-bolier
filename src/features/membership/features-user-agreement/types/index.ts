import { z } from "zod";
import { status } from "../../plans/types";
import { fileUploadResponseSchema } from "@/features/base/types";

export const userAgreementSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Status: status,
});

export type UserAgreementData = z.infer<typeof userAgreementSchema>;

export const updateUserAgreementSchema = z.object({
  id: z.string(),
  content: z
    .string()
    .min(3, { message: "Content must be at least 3 characters" }),
});
export type UpdateUserAgreementRequest = z.infer<
  typeof updateUserAgreementSchema
>;

export const featureSchema = z.object({
  id: z.string(),
  order: z.number(),
  fileId: z.string(),
  title: z.string(),
  description: z.string(),
  Status: status,
  createdAt: z.string(),
  updateAt: z.string(),
  File: fileUploadResponseSchema,
});
export type FeatureData = z.infer<typeof featureSchema>;

export const createFeatureSchema = z.object({
  fileId: z.string().min(1, { message: "File is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
export type CreateFeatureRequest = z.infer<typeof createFeatureSchema>;

export const updateFeatureSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  fileId: z.string().min(1, { message: "File is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
export type UpdateFeatureRequest = z.infer<typeof updateFeatureSchema>;
