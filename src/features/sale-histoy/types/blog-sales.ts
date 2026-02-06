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

const templateDetailsSchema = z.object({
  name: z.string(),
  id: z.string(),
  category: z.string(),
  price: z.number()
})

const blogDetailsSchema = z.object({
  name: z.string(),
  id: z.string(),
})

const feeDetailsSchema = z.object({
  hostingFee: z.number(),
  subTotal: z.number().optional(),
  total: z.number(),
  invoiceNumber: z.string()
})

const paymentDetailsSchema = z.object({
  status: z.union([
    z.literal("Successful"),
    z.literal("In Progress"),
    z.literal("Failed")
  ]),
  method: z.string(),
  madeOn: z.string()
})

const BlogSiteSaleSchema = z.object({
  id: z.string(),
  user: userDetailsSchema,
  template: templateDetailsSchema,
  fee: feeDetailsSchema,
  blog: blogDetailsSchema,
  payment: paymentDetailsSchema
})

export type BlogSiteSaleData = z.infer<typeof BlogSiteSaleSchema>
