import { fileUploadResponseSchema } from "@/features/base/types";
import { z } from "zod";

export const baseCurrencySchema = z.object({
  id: z.string(),
  name: z.string(),
  currencyCode: z.string(),
  iso4217: z.string(),
  countryCode: z.string(),
  countryName: z.string(),
  fileId: z.string(),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  File: fileUploadResponseSchema,
});
export type BaseCurrencyData = z.infer<typeof baseCurrencySchema>;

export const exchangeRateSchema = z.object({
  id: z.string(),
  order: z.number(),
  baseCurrencyId: z.string(),
  exchangeRate: z.number(),
  exchangeServiceFee: z.number(),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  File: fileUploadResponseSchema,
  BaseCurrency: baseCurrencySchema,
});
export type ExchangeRateData = z.infer<typeof exchangeRateSchema>;

export const createExchangeRateSchema = z.object({
  fileId: z.string().optional(),
  baseCurrencyId: z.string().min(1, {
    message: "Country is required",
  }),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  exchangeRate: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Exchange rate must be greater than 0",
  }),
  exchangeServiceFee: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Exchange service fee must be greater than 0",
  }),
});
export type CreateExchangeRateRequest = z.infer<
  typeof createExchangeRateSchema
>;

export const updateExchangeRateSchema = z.object({
  id: z.string(),
  fileId: z.string().optional().nullable(),
  baseCurrencyId: z.string().min(1, {
    message: "Country is required",
  }),
  Status: z.enum(["ACTIVE", "INACTIVE"]),
  exchangeRate: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Exchange rate must be greater than 0",
  }),
  exchangeServiceFee: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Exchange service fee must be greater than 0",
  }),
});
export type UpdateExchangeRateRequest = z.infer<
  typeof updateExchangeRateSchema
>;

export const updateExchangeRateAllSchema = z.object({
  currencies: z.array(updateExchangeRateSchema),
});
export type UpdateExchangeRateAllRequest = z.infer<
  typeof updateExchangeRateAllSchema
>;

export const exchangeRateHistorySchema = z.object({
  id: z.string(),
  currencyId: z.string(),
  exchangeRate: z.number(),
  exchangeServiceFee: z.number(),
  Status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Currency: exchangeRateSchema,
});
export type ExchangeRateHistoryData = z.infer<typeof exchangeRateHistorySchema>;

export const exchangeRateFilterSchema = z.object({
  id: z.string(),
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type ExchangeRateFilter = z.infer<typeof exchangeRateFilterSchema>;
