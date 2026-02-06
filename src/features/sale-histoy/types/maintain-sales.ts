import { z } from "zod"

const userDetailsSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  joinedOn: z.string(),
  status: z.union([
    z.literal("Verified"),
    z.literal("Pending"),
    z.literal("Suspended")
  ])
})

const blogDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  domainUrl: z.string(),
  templateId: z.string(),
  templateName: z.string(),
  category: z.string(),
  price: z.number()
})

const maintenanceDetailsSchema = z.object({
  id: z.string(),
  status: z.union([
    z.literal("Active"),
    z.literal("Expired"),
    z.literal("Pending")
  ]),
  startedOn: z.string(),
  expiresOn: z.string(),
  billingPeriod: z.object({
    startDate: z.string(),
    endDate: z.string()
  }),
  renewedOn: z.string(),
  fee: z.number(),
  frequency: z.union([z.literal("year"), z.literal("month")])
})

const paymentDetailsSchema = z.object({
  id: z.string(),
  status: z.union([
    z.literal("Successful"),
    z.literal("In Progress"),
    z.literal("Failed")
  ]),
  method: z.string(),
  madeOn: z.string(),
  invoiceNumber: z.string()
})

const maintainSalesDataSchema = z.object({
  id: z.string(),
  user: userDetailsSchema,
  blog: blogDetailsSchema,
  maintenance: maintenanceDetailsSchema,
  payment: paymentDetailsSchema
})

export type MaintainSalesData = z.infer<typeof maintainSalesDataSchema>
