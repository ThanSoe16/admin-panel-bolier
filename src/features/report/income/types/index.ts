import { FeeTypeEnum } from '@/features/users/types';
import { z } from 'zod';

export const totalIncomeSchema = z.object({
  _sum: z.object({ total: z.number() }),
});
export type TotalIcomeData = z.infer<typeof totalIncomeSchema>;
export const incomeResultSchema = z.object({
  feeType: FeeTypeEnum,
  total: z.number(),
});
export type IncomeResultData = z.infer<typeof incomeResultSchema>;

export const incomeReportSchema = z.object({
  totalIncome: totalIncomeSchema,
  results: z.array(incomeResultSchema),
});
export type IncomeReportResponse = z.infer<typeof incomeReportSchema>;

export const dIncomeReportSchema = z.object({
  id: z.string(),
  type: z.string(),
  pageType: z.enum(['purchase-template', 'setup-fee', 'hosting-fee', 'maintain-fee', 'server-fee']),
  amount: z.number(),
  status: z.enum(['COMPLETED', 'PENDING', 'FAILED']),
  date: z.string(),
  customer: z.string(),
});

export type IncomeReportData = z.infer<typeof dIncomeReportSchema>;

//**********************FOR PURCHASE TEMPLATE */
export const purchaseTemplateSchema = z.object({
  id: z.string(),
  userName: z.string(),
  categories: z.string(),
  paymentStatus: z.string(),
  purchasedOn: z.string(),
  totalAmount: z.number(),
});

export type PurchaseTemplateData = z.infer<typeof purchaseTemplateSchema>;

export const purchaseTemplateYearlySchema = z.object({
  date: z.string(),
  count: z.number(),
});

export type PurchaseTemplateYearlyData = z.infer<typeof purchaseTemplateYearlySchema>;

export const purchaseTemplateCategorySchema = z.object({
  type: z.string(),
  amount: z.number(),
  count: z.number(),
});

export type PurchaseTemplateCategoryData = z.infer<typeof purchaseTemplateCategorySchema>;

//**********************FOR SETUP FEE */
export const setupFeeSchema = z.object({
  id: z.string(),
  userName: z.string(),
  categories: z.string(),
  paymentStatus: z.string(),
  purchasedOn: z.string(),
  totalAmount: z.number(),
});

export type SetupFeeData = z.infer<typeof setupFeeSchema>;

export const setupFeeYearlySchema = z.object({
  id: z.string(),
  date: z.string(),
  count: z.number(),
});

export type SetupFeeYearlyData = z.infer<typeof setupFeeYearlySchema>;

export const setupFeeCategorySchema = z.object({
  type: z.string(),
  amount: z.number(),
  count: z.number(),
});

export type SetupFeeCategoryData = z.infer<typeof setupFeeCategorySchema>;

//**********************FOR HOSTING FEE */
export const hostingFeeDailySchema = z.object({
  id: z.string(),
  domainName: z.string(),
  blogName: z.string(),
  type: z.string(),
  purchasedOn: z.string(),
  totalAmount: z.string(),
  paymentStatus: z.string(),
});

export type HostingFeeDailyData = z.infer<typeof hostingFeeDailySchema>;

export const hostingFeeYearlySchema = setupFeeYearlySchema;

export type HostingFeeYearlyData = z.infer<typeof hostingFeeYearlySchema>;

export const hostingFeeCategorySchema = setupFeeCategorySchema;

export type HostingFeeCategoryData = z.infer<typeof hostingFeeCategorySchema>;

//**********************FOR MAINTAIN FEE */
export const maintainFeeDailySchema = hostingFeeDailySchema;

export type MaintainFeeDailyData = z.infer<typeof maintainFeeDailySchema>;

export const maintainFeeYearlySchema = setupFeeYearlySchema;

export type MaintainFeeYearlyData = z.infer<typeof maintainFeeYearlySchema>;

export const maintainFeeCategorySchema = setupFeeCategorySchema;

export type MaintainFeeCategoryData = z.infer<typeof maintainFeeCategorySchema>;

//**********************FOR SERVER FEE */
export const serverFeeDailySchema = hostingFeeDailySchema;

export type ServerFeeDailyData = z.infer<typeof serverFeeDailySchema>;

export const serverFeeYearlySchema = setupFeeYearlySchema;

export type ServerFeeYearlyData = z.infer<typeof serverFeeYearlySchema>;

export const serverFeeCategorySchema = setupFeeCategorySchema;

export type ServerFeeCategoryData = z.infer<typeof serverFeeCategorySchema>;
