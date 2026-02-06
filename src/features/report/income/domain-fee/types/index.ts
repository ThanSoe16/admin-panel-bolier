import { z } from 'zod';
import { templateIncomeFilter } from '../../purchase-templates/types';
import { oneSiteUserSchema } from '@/features/base/types';

export const domainFeeFilter = templateIncomeFilter
  .extend({
    filter: z.string().optional(),
  })
  .omit({
    category: true,
  });
export type DomainFeeFilter = z.infer<typeof domainFeeFilter>;

export const domainFeeTableSchema = z.object({
  name: z.string(),
  total: z.number(),
  count: z.number(),
});
export type DomainFeeTableData = z.infer<typeof domainFeeTableSchema>;

export const domainFeeListSchema = z.object({
  id: z.string(),
  PaymentStatus: z.string(),
  total: z.number(),
  createdAt: z.string(),
  domain_expired_at: z.string(),
  purchasedDomain: z.string(),
  domain_auto_renew: z.boolean(),
  OneSiteUser: oneSiteUserSchema,
  //not for daily
  month: z.string(),
  date: z.string(),
  amount: z.number(),
});
export type DomainFeeListData = z.infer<typeof domainFeeListSchema>;

export const domainRegistrationFeeReportSchema = z.object({
  totalDomainRegistrationFees: domainFeeTableSchema,
  newDomainRegistrationFees: domainFeeTableSchema,
  domainRegisteredList: z.array(domainFeeListSchema),
});
export type DomainRegisterationFeeReportResponse = z.infer<
  typeof domainRegistrationFeeReportSchema
>;

export const domainRenewalFeeReportSchema = z.object({
  totalDomainRenewalFees: domainFeeTableSchema,
  newDomainRenewalFees: domainFeeTableSchema,
  domainRenewalList: z.array(domainFeeListSchema),
});
export type DomainRenewalFeeReportResponse = z.infer<typeof domainRenewalFeeReportSchema>;
