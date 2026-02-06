import { fileUploadResponseSchema } from "@/features/base/types";
import { z } from "zod";

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  invoiceFor: z.string(),
  invoiceAmount: z.number(),
  CPU: z.string(),
  Storage: z.number(),
  RAM: z.number(),
  tax: z.number(),
  total: z.number(),
  InvoiceStatus: z.enum(["PAID", "UNPAID", "OVERDUE", "PENDING"]),
  saveSpecification: z.boolean(),
  oneSiteUserId: z.string(),
  merchantBlogId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  oneSiteUserOrderId: z.string(),
  OneSiteUser: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    image: fileUploadResponseSchema,
  }),
  MerchantBlog: z.object({
    id: z.string(),
    BlogNameAndLogo: z.array(
      z.object({
        name: z.string(),
      })
    ),
    previewDomain: z.string(),
    blogDomain: z.string(),
    isCustomDomain: z.boolean(),
  }),
  billingPeriodFrom: z.string(),
  billingPeriodTo: z.string(),
  payablePeriodFrom: z.string(),
  payablePeriodTo: z.string(),
});

export type InvoiceData = z.infer<typeof invoiceSchema>;

export const invoiceFilterSchema = z.object({
  InvoiceStatus: z.enum(["PAID", "UNPAID", "OVERDUE", "PENDING"]).optional(),
  month: z.string().optional(),
  word: z.string().optional(),
  rowPerPage: z.number().optional(),
  pageIndex: z.number().optional(),
  userId: z.string().optional(),
});

export type InvoiceFilter = z.infer<typeof invoiceFilterSchema>;

export const createInvoiceSchema = z.object({
  invoiceNumber: z.string(),
  invoiceFor: z.string(),
  invoiceAmount: z
    .string()
    .refine(
      (value) => Number(value) >= 1,
      "Invoice Amount must be at least $1"
    ),
  CPU: z.string(),
  Storage: z.string(),
  RAM: z.string(),
  tax: z.string(),
  saveSpecification: z.boolean(),
  oneSiteUserId: z.string(),
  merchantBlogId: z.string(),
  invoiceStatus: z.enum(["PENDING", "PAID"]).optional(),
});

export type CreateInvoiceRequest = z.infer<typeof createInvoiceSchema>;

export const updateInvoiceSchema = z.object({
  invalidId: z.string().optional(),
  id: z.string(),
  invoiceNumber: z.string(),
  invoiceFor: z.string(),
  invoiceAmount: z
    .string()
    .refine(
      (value) => Number(value) >= 1,
      "Invoice Amount must be at least $1"
    ),
  CPU: z.string(),
  Storage: z.string(),
  RAM: z.string(),
  tax: z.string(),
  saveSpecification: z.boolean(),
  oneSiteUserId: z.string(),
  merchantBlogId: z.string(),
  invoiceStatus: z.enum(["PENDING", "PAID"]).optional(),
});

export type UpdateInvoiceRequest = z.infer<typeof updateInvoiceSchema>;

export const userInvoiceSchema = z.object({
  id: z.string(),
  oneSiteUserId: z.string(),
  name: z.string(),
  panelDomain: z.string(),
  imageId: z.null(),
  templateId: z.string(),
  oneSiteUserPurchasedTemplateId: z.string(),
  MerchantBlogStatus: z.string(),
  publishedAt: z.null(),
  achieveDate: z.null(),
  permanentlyDeletedDate: z.null(),
  createdAt: z.string(),
  updatedAt: z.string(),
  previewDomain: z.null(),
  blogDomain: z.null(),
  isCustomDomain: z.boolean(),
  BlogNameAndLogo: z.array(z.object({ name: z.string() })),
  OneSiteUser: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    image: z.null(),
  }),
  billingPeriodFrom: z.string(),
  blogCreatedAt: z.string(),
  latestServerFeeDate: z.string().nullable(),
});
export type UserInvoiceData = z.infer<typeof userInvoiceSchema>;
