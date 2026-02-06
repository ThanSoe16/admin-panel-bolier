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

const serverDetailsSchema = z.object({
  id: z.string(),
  startedOn: z.string(),
  month: z.string(),
  fee: z.number(),
  frequency: z.union([z.literal("month"), z.literal("year")])
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

const serverSalesDataSchema = z.object({
  id: z.string(),
  user: userDetailsSchema,
  blog: blogDetailsSchema,
  server: serverDetailsSchema,
  payment: paymentDetailsSchema
})

export type ServerSalesData = z.infer<typeof serverSalesDataSchema>
