import { z } from "zod";

export const domainSaleHistoryDetailSchema = z.object({
  domainName: z.string(),
  purchasedFrom: z.string(),
  inUse: z.boolean(),
  domainPurchasedType: z.string(),
  linkedStatus: z.boolean(),
  expiredAt: z.string(),
  registeredAt: z.string(),
  currentRenewalPrice: z.number(),
  subTotal: z.number(),
  serviceFee: z.number(),
  totalPrice: z.number(),
  username: z.string(),
  email: z.string(),
  paymentStatus: z.string(),
  paymentDate: z.string()
})

export type DomainSaleHistoryDetailResponse = z.infer<
  typeof domainSaleHistoryDetailSchema
>;
