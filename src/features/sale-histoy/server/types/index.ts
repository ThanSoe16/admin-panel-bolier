import { z } from "zod";
import { oneSiteUserSchema, templateSchema } from "@/features/base/types";

export const serverSaleHistorySchema = z.object({
  id: z.string(),
  initialDate: z.string(),
  dueDate: z.string(),
  paidDate: z.string(),
  total: z.number(),
  MerchantBlogBillingStatus: z.string(),
  MerchantBlog: z.object({
    name: z.string(),
    blogDomain: z.string(),
    OneSiteUser: oneSiteUserSchema,
    BlogNameAndLogo: z.array(z.object({ name: z.string() })),
  }),
});
export type ServerSaleHistoryResponse = z.infer<typeof serverSaleHistorySchema>;

export const serverSaleHistoryDetailSchema = z.object({
  id: z.string(),
  initialDate: z.string(),
  paidDate: z.string(),
  FeeType: z.string(),
  transactionNo: z.string(),
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
export type ServerSaleHistoryDetailResponse = z.infer<
  typeof serverSaleHistoryDetailSchema
>;
