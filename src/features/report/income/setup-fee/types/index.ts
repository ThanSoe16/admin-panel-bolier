import { z } from 'zod';
import { templateIncomeFilter } from '../../purchase-templates/types';
import { oneSiteUserOrderSchema, templateSchema } from '@/features/base/types';

export const setupFeeFilter = templateIncomeFilter.omit({
  category: true,
});
export type SetupFeeFilter = z.infer<typeof setupFeeFilter>;

export const setupFeeTypeTableSchema = z.object({
  type: z.string(),
  totalAmount: z.number(),
  count: z.number(),
});
export type SetupFeeTypeTableData = z.infer<typeof setupFeeTypeTableSchema>;

export const setupFeeListSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  BlogNameAndLogo: z.array(z.object({ name: z.string() })),
  OneSiteUserOrder: z.array(oneSiteUserOrderSchema),
  OneSiteUserPurchasedTemplate: z.object({
    id: z.string(),
    Template: templateSchema,
  }),
  //not for daily
  month: z.string(),
  date: z.string(),
  amount: z.number(),
});
export type SetupFeeListData = z.infer<typeof setupFeeListSchema>;

export const setupFeeResponseSchema = z.object({
  total: z.array(setupFeeTypeTableSchema),
  blogs: z.array(setupFeeListSchema),
});
export type SetupFeeReportResponse = z.infer<typeof setupFeeResponseSchema>;
