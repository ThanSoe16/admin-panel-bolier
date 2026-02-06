import { z } from "zod"
import { oneSiteUserOrderSchema, oneSiteUserSchema, templateSchema } from "@/features/base/types";

export const templateIncomeFilter = z.object({
  type:z.string(),
  date:z.string(),
  category:z.string().optional(),
  pageIndex:z.number().optional(),
  rowPerPage:z.number().optional(),
  word:z.string().optional(),
})
export type TemplateIncomeFilter = z.infer<typeof templateIncomeFilter>;

export const templateSaleSchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  salesCount: z.number(),
  totalPrice: z.number()
})
export type TemplateSaleData = z.infer<typeof templateSaleSchema>;

export const salesSummarySchema = z.object({
  totalTemplates: z.number(),
  totalAmount: z.number(),
  totalCount: z.number()
})
export type SalesSummaryData = z.infer<typeof salesSummarySchema>;

export const purchasedTemplateSchema =  z.object({
  id: z.string(),
  templateId: z.string(),
  price: z.number(),
  createdAt: z.string(),
  Template: templateSchema,
  OneSiteUser: oneSiteUserSchema,
  OneSiteUserOrder: z.array(oneSiteUserOrderSchema),
  //not for daily
  date: z.string(),
  month: z.string(),
  amount: z.number(),
  count: z.number(),
})

export type PurchasedTemplateData = z.infer<typeof purchasedTemplateSchema>;

export const templateIncomeSchema = z.object({
  templateSales: z.array(templateSaleSchema),
  salesSummary: salesSummarySchema,
  purchasedTemplatesList: z.array(purchasedTemplateSchema)
})
export type TemplateIncomeResponse = z.infer<typeof templateIncomeSchema>;