import { fileUploadResponseSchema } from "@/features/base/types";
import { TemplateSocialStatusEnum } from "@/features/base/types/backend-defined-enums";
import { z } from "zod";



export const templateSocialSchema = z.object({
  id: z.string(),
  name: z.string(),
  linkAddress: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Status: z.nativeEnum(TemplateSocialStatusEnum),
  fileId: z.string(),
  File: fileUploadResponseSchema
})

export type TemplateSocialData = z.infer<typeof templateSocialSchema>

export const updateTemplateSocialStatusSchema = templateSocialSchema.pick({
  Status: true,
})

export type UpdateTemplateSocialStatusRequest = z.infer<typeof updateTemplateSocialStatusSchema>