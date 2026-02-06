import { oneSiteUserSchema, templateSchema } from '@/features/base/types';
import { z } from 'zod';

export const templateCategorySchema = z.object({
  templateCategoryId: z.string(),
  totalTemplates: z.number(),
  name: z.string(),
});
export type TemplateCategoryData = z.infer<typeof templateCategorySchema>;

export const popularTemplateSchema = z.object({
  id: z.string(),
  templateCode: z.string(),
  name: z.string(),
  TemplateCategory: z.object({
    TemplateCategoryContent: z.array(templateCategorySchema),
  }),
  purchaseCount: z.number(),
  lastPurchasedAt: z.string(),
});

export type PopularTemplateData = z.infer<typeof popularTemplateSchema>;

export const templateSaleSchema = z.object({
  id: z.string(),
  PaymentStatus: z.string(),
  transactionNo: z.string(),
  price: z.number(),
  createdAt: z.string(),
  merchantBlogId: z.string(),
  OneSiteUser: oneSiteUserSchema,
  OneSiteUserPurchasedTemplate: z.object({
    id: z.string(),
    createdAt: z.string(),
    Template: templateSchema,
  }),
  //for not daily
  date: z.string(),
  month: z.string(),
  count: z.number(),
});

export type TemplateSaleData = z.infer<typeof templateSaleSchema>;

export const templateReportSchema = z.object({
  templateCategories: z.array(templateCategorySchema),
  totalCategories: z.number(),
  popularTemplates: z.array(popularTemplateSchema),
  todtodayTemplateSaleList: z.array(templateSaleSchema),
  templateSaleList: z.array(templateSaleSchema),
});
export type TemplateReportResponse = z.infer<typeof templateReportSchema>;
