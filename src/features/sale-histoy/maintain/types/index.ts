import { z } from "zod";
import { oneSiteUserSchema, templateSchema } from "@/features/base/types";

export const maintainSaleHistorySchema = z.object({
  id: z.string(),
  initialDate: z.string(),
  dueDate: z.string(),
  paidDate: z.string(),
  total: z.number(),
  MerchantBlogBillingStatus: z.string(),
  MerchantBlog: z.object({
    BlogNameAndLogo: z.array(z.object({ name: z.string() })),
    name: z.string(),
    blogDomain: z.string(),
    OneSiteUser: oneSiteUserSchema,
  }),
});
export type MaintainSaleHistoryResponse = z.infer<
  typeof maintainSaleHistorySchema
>;

export const maintainSaleHistoryDetailSchema = z.object({
  id: z.string(),
  initialDate: z.string(),
  paidDate: z.string(),
  transactionNo: z.string(),
  FeeType: z.string(),
  MerchantBlogBillingStatus: z.string(),
  createdAt: z.string(),
  total: z.number(),
  MerchantBlog: z.object({
    name: z.string(),
    MerchantBlogStatus: z.string(),
    OneSiteUser: oneSiteUserSchema,
    Template: templateSchema,
  }),
});
export type MaintainSaleHistoryDetailResponse = z.infer<
  typeof maintainSaleHistoryDetailSchema
>;
