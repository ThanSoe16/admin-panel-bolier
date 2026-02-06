import { z } from "zod"
import { oneSiteUserSchema, templateSchema } from "@/features/base/types";

export const hostingSaleHistorySchema = z.object({
  id: z.string(),
  paidDate: z.string(),
  total: z.number(),
  MerchantBlogBillingStatus: z.string(),
  MerchantBlog: z.object({
    name: z.string(),
    BlogNameAndLogo:z.array(z.object({name:z.string()})),
    OneSiteUser: z.object({ username: z.string() })
  })
})
export type HostingSaleHistoryResponse = z.infer<typeof hostingSaleHistorySchema>;

export const hostingSaleHistoryDetailSchema = z.object({
  id: z.string(),
  MerchantBlogBillingStatus: z.string(),
  total: z.number(),
  createdAt: z.string(),
  transactionNo: z.string(),
  dueDate: z.string(),
  updatedAt: z.string(),
  MerchantBlog: z.object({
    name: z.string(),
    BlogNameAndLogo:z.array(z.object({name:z.string()})),
    MerchantBlogStatus: z.string(),
    blogDomain: z.string(),
    publishedAt:z.string(),
    Template: templateSchema,
    OneSiteUser: oneSiteUserSchema,
  })
})
export type HostingSaleHistoryDetailResponse = z.infer<typeof hostingSaleHistoryDetailSchema>;