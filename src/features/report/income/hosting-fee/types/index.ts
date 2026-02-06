import { z } from "zod";
import { templateIncomeFilter } from "../../purchase-templates/types";
import { oneSiteUserSchema } from "@/features/base/types";

export const hostingFeeFilter = templateIncomeFilter
  .extend({
    filter: z.string().optional(),
  })
  .omit({
    category: true,
  });
export type HostingFeeFilter = z.infer<typeof hostingFeeFilter>;

export const hostingFeeTableSchema = z.object({
  name: z.string(),
  total: z.number(),
  count: z.number(),
});
export type HostingFeeTableData = z.infer<typeof hostingFeeTableSchema>;

export const hostingFeeListSchema = z.object({
  id: z.string(),
  MerchantBlogBillingStatus: z.string(),
  total: z.number(),
  createdAt: z.string(),
  MerchantBlog: z.object({
    isOneTime: z.boolean(),
    OneSiteUser: oneSiteUserSchema,
    BlogNameAndLogo: z.array(z.object({ name: z.string(), logo: z.string() })),
    blogDomain: z.string(),
  }),
  //not for daily
  month: z.string(),
  date: z.string(),
  amount: z.number(),
  count: z.number(),
});
export type HostingFeeListData = z.infer<typeof hostingFeeListSchema>;

export const hostingFeeReportSchema = z.object({
  totalHostingFees: hostingFeeTableSchema,
  newHostingFees: hostingFeeTableSchema,
  renewHostingFees: hostingFeeTableSchema,
  hostingFeesList: z.array(hostingFeeListSchema),
});
export type HostingFeeReportResponse = z.infer<typeof hostingFeeReportSchema>;
