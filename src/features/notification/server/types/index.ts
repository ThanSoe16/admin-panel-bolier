import { z } from "zod"
import { oneSiteUserSchema, templateSchema } from "@/features/base/types";

export const serverNotificationDetailsSchema = z.object({
  id: z.string(),
  dueDate: z.string(),
  total: z.number(),
  paidDate: z.string(),
  MerchantBlogBillingStatus: z.string(),
  MerchantBlog: z.object({
    name: z.string(),
    OneSiteUser: oneSiteUserSchema,
    OneSiteUserPurchasedTemplate: z.object({
      Template: templateSchema
    }),
  numberOfBlogs:z.number(),
  })
})
export type ServerNotificationDetailsData = z.infer<typeof serverNotificationDetailsSchema>;