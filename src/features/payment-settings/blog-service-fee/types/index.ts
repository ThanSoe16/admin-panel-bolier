import { z } from "zod";
import { paymentMethodSchema } from "../../payment-methods/types";

export const blogServiceFeeSchema = z.object({
  id: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  paymentMethod: paymentMethodSchema,
  type: z.enum(["PERCENTAGE", "AMOUNT"]),
  fee: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BlogServiceFeeData = z.infer<typeof blogServiceFeeSchema>;

export const updateBlogServiceFeeSchema = z.object({
  id: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  type: z.enum(["PERCENTAGE", "AMOUNT"]),
  fee: z.number(),
});
export type updateBlogServiceFeeRequest = z.infer<
  typeof updateBlogServiceFeeSchema
>;
