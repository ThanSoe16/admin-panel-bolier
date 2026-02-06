import { z } from "zod"
import { oneSiteUserSchema, templateSchema } from "@/features/base/types";

export const maintainNotificationDetailsSchema = z.object({
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
    })
  })
})
export type MaintainNotificationDetailsData = z.infer<typeof maintainNotificationDetailsSchema>;