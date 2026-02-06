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

const hostingDetailsSchema = z.object({
  id: z.string(),
  templateId: z.string(),
  templateName: z.string(),
  domainLink: z.string(),
  publishedOn: z.string()
})

const feeDetailsSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  hostingFee: z.number(),
  subTotal: z.number().optional(),
  total: z.number()
})

const paymentDetailsSchema = z.object({
  id: z.string(),
  status: z.union([
    z.literal("Successful"),
    z.literal("In Progress"),
    z.literal("Failed")
  ]),
  method: z.string(),
  madeOn: z.string()
})

const hostingSalesDataSchema = z.object({
  id: z.string(),
  user: userDetailsSchema,
  hosting: hostingDetailsSchema,
  fee: feeDetailsSchema,
  payment: paymentDetailsSchema
})

export type HostingSalesData = z.infer<typeof hostingSalesDataSchema>
