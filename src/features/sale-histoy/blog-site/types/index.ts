import { z } from "zod";
import { oneSiteUserSchema, templateSchema } from "@/features/base/types";
import { FeeTypeEnum } from "@/features/users/types";

export const blogSiteSaleHistorySchema = z.object({
  id: z.string(),
  total: z.number(),
  createdAt: z.string(),
  PaymentStatus: z.string(),
  MerchantBlog: z.object({
    BlogNameAndLogo: z.array(z.object({ name: z.string(), logo: z.string() })),
    Template: templateSchema,
  }),
  OneSiteUser: oneSiteUserSchema,
});
export type BlogSiteSaleHistoryResponse = z.infer<
  typeof blogSiteSaleHistorySchema
>;

export const blogSiteSaleHistoryDetailSchema = z.object({
  id: z.string(),
  transactionNo: z.string(),
  PaymentStatus: z.string(),
  serviceFee: z.number(),
  total: z.number(),
  FeeType: FeeTypeEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
  OneSiteUser: oneSiteUserSchema,
  MerchantBlog: z.object({
    name: z.string(),
    MerchantBlogStatus: z.string(),
    Template: templateSchema,
  }),
});
export type BlogSiteSaleHistoryDetailResponse = z.infer<
  typeof blogSiteSaleHistoryDetailSchema
>;
