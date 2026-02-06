import { z } from 'zod';
import { templateIncomeFilter } from '../../purchase-templates/types';
import { oneSiteUserSchema } from '@/features/base/types';

export const maintainFeeFilter = templateIncomeFilter
  .extend({
    filter: z.string().optional(),
  })
  .omit({
    category: true,
  });
export type MaintainFeeFilter = z.infer<typeof maintainFeeFilter>;

export const maintainFeeTableSchema = z.object({
  name: z.string(),
  total: z.number(),
  count: z.number(),
});
export type MaintainFeeTableData = z.infer<typeof maintainFeeTableSchema>;

export const maintainFeeListSchema = z.object({
  id: z.string(),
  PaymentStatus: z.string(),
  total: z.number(),
  createdAt: z.string(),
  paidDate: z.string().optional(),
  MerchantBlog: z.object({
    OneSiteUser: oneSiteUserSchema,
    BlogNameAndLogo: z.array(z.object({ name: z.string(), logo: z.string() })),
    MerchantBlogBilling: z.array(z.object({ isOneTime: z.boolean() })),
  }),
  //not for daily
  month: z.string(),
  date: z.string(),
  amount: z.number(),
  count: z.number(),
});
export type MaintainFeeListData = z.infer<typeof maintainFeeListSchema>;

export const maintainFeeReportSchema = z.object({
  totalMaintainFees: maintainFeeTableSchema,
  newMaintainFees: maintainFeeTableSchema,
  renewMaintainFees: maintainFeeTableSchema,
  maintainFeesList: z.array(maintainFeeListSchema),
});
export type MaintainFeeReportResponse = z.infer<typeof maintainFeeReportSchema>;
