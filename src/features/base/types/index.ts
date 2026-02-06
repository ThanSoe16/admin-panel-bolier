import { z } from "zod";
import { JSX } from "react";

export interface MetaResponse {
  success: boolean;
  message: string;
  devMessage?: string;
}
export interface APIResponse<T> {
  meta?: MetaResponse;
  body?: {
    currentPage?: number;
    total?: number;
    pageCount?: number;
    rowPerPage?: number;
    otp?: string;
    data: T;
  };
}

export interface APITResponse<T> {
  meta?: MetaResponse;
  body?: {
    data: {
      data: T;
      currentPage?: number;
      total?: number;
      pageCount?: number;
      rowPerPage?: number;
      otp?: string;
    };
  };
}
export interface APISResponse<T> {
  meta?: MetaResponse;
  body?: T;
}

export interface ErrorResponse {
  message: any;
  error: any;
  statusCode: number;
}

export const fileUploadRequestScheam = z.object({
  file: z.instanceof(File),
});

export type FileUploadRequest = z.infer<typeof fileUploadRequestScheam>;

export const fileUploadResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FileUploadResponse = z.infer<typeof fileUploadResponseSchema>;

export const passwordSchema = z
  .string()
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[\W_]/, {
    message: "Password must contain at least one special character",
  })
  .regex(/^(?!.*[#-]).*$/, { message: "Password cannot contain # or -" })
  .min(6, { message: "Password must be at least 6 characters long" });

export const phoneSchema = z
  .string()
  .optional()
  .refine((val) => !val || /^09\d{7,13}$/.test(val), {
    message: "Phone number must be 9-15 digits long",
  });

export interface IOptions {
  label: string | JSX.Element;
  value: string;
}

export const dateFilterSchema = z.object({
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
  date: z.string().optional(),
  type: z.string().optional(),
  word: z.string().optional(),
});
export type DateFilter = z.infer<typeof dateFilterSchema>;

export const templateCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  templateCategoryId: z.string(),
  languageId: z.string(),
});
export type TemplateCategoryData = z.infer<typeof templateCategorySchema>;

export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  templateCode: z.string(),
  LaptopThumb: fileUploadResponseSchema,
  MobileThumb: fileUploadResponseSchema,
  TabletThumb: fileUploadResponseSchema,
  TemplateCategory: z.object({
    TemplateCategoryContent: z.array(templateCategorySchema),
  }),
  price: z.number(),
});
export type TemplateData = z.infer<typeof templateSchema>;

export const oneSiteUserSchema = z.object({
  id: z.string(),
  oneSiteUserId: z.string(),
  generatedAccountId: z.string(),
  username: z.string(),
  email: z.string(),
  image: z.string(),
  status: z.string(),
  joinData: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type OneSiteUserData = z.infer<typeof oneSiteUserSchema>;

export const oneSiteUserOrderSchema = z.object({
  id: z.string(),
  content: z.string(),
  transactionNo: z.string(),
  oneSiteUserId: z.string(),
  purchasedDomain: z.string(),
  purchasedTemplateId: z.string(),
  merchantBlogId: z.string(),
  PaymentStatus: z.string(),
  price: z.number(),
  renew_price: z.number(),
  serviceFee: z.number(),
  total: z.number(),
  FeeType: z.string(),
  ServiceType: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OneSiteUserOrderData = z.infer<typeof oneSiteUserOrderSchema>;

export const paginationFilterSchema = z.object({
  search: z.string().optional(),
  rowPerPage: z.number().optional(),
  pageIndex: z.number().optional(),
});

export type PaginationFilter = z.infer<typeof paginationFilterSchema>;

export const paginationSFilterSchema = z.object({
  search: z.string().optional(),
  limit: z.number().optional(),
  page: z.number().optional(),
});

export type PaginationSFilter = z.infer<typeof paginationSFilterSchema>;

export interface SEOPreviewData {
  url: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  canonical: string;
  metaKeywords: string;
}
