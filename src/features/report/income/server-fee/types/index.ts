import { z } from 'zod';
import { templateIncomeFilter } from '../../purchase-templates/types';
import { oneSiteUserSchema } from '@/features/base/types';

export const serverFeeFilter = templateIncomeFilter
  .extend({
    filter: z.string().optional(),
  })
  .omit({
    category: true,
  });
export type ServerFeeFilter = z.infer<typeof serverFeeFilter>;

export const serverFeeTableSchema = z.object({
  name: z.string(),
  total: z.number(),
  count: z.number(),
});
export type ServerFeeTableData = z.infer<typeof serverFeeTableSchema>;

export const serverFeeListSchema = z.object({
  id: z.string(),
  MerchantBlogBillingStatus: z.string(),
  total: z.number(),
  createdAt: z.string(),
  MerchantBlog: z.object({
    BlogNameAndLogo: z.array(z.object({ name: z.string() })),
    OneSiteUser: oneSiteUserSchema,
  }),
  //not for daily
  month: z.string(),
  date: z.string(),
  amount: z.number(),
  count: z.number(),
});
export type ServerFeeListData = z.infer<typeof serverFeeListSchema>;

export const serverFeeReportSchema = z.object({
  totalServerFees: serverFeeTableSchema,
  newServerFees: serverFeeTableSchema,
  renewServerFees: serverFeeTableSchema,
  serverFeesList: z.array(serverFeeListSchema),
});
export type ServerFeeReportResponse = z.infer<typeof serverFeeReportSchema>;
