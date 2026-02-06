import { z } from "zod"
import { oneSiteUserOrderSchema, oneSiteUserSchema, templateSchema } from "@/features/base/types";

export const templateSaleHistorySchema = z.object({
  id: z.string(),
  oneSiteUserId: z.string(),
  templateId: z.string(),
  price: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Template: templateSchema,
  OneSiteUser: oneSiteUserSchema,
  OneSiteUserOrder: z.array(oneSiteUserOrderSchema)
})
export type TemplateSaleHistoryResponse = z.infer<typeof templateSaleHistorySchema>;

export const templateSaleHistoryDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  OneSiteUser: oneSiteUserSchema,
  OneSiteUserOrder: z.array(oneSiteUserOrderSchema),
  Template: templateSchema
})
export type TemplateSaleHistoryDetailResponse = z.infer<typeof templateSaleHistoryDetailSchema>;