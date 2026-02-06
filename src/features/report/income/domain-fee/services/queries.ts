import { DomainFeeFilter } from '../types';
import domainFeeIncomeReportApiService from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetDomainRegistrationFeeIncomeReport = (filter: DomainFeeFilter) => {
  return useQuery({
    queryKey: ['domain-registration-income-report', filter],
    queryFn: () => domainFeeIncomeReportApiService.getDomainRegistrationFeeIncomeReport(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetDomainRegistrationFeeIncomeMonthlyReport = (filter: DomainFeeFilter) => {
  return useQuery({
    queryKey: ['domain-registration-income-monthly-report', filter],
    queryFn: () =>
      domainFeeIncomeReportApiService.getDomainRegistrationFeeIncomeMonthlyReport(filter),
    refetchOnWindowFocus: false,
  });
};
export const useGetDomainRenewalFeeIncomeReport = (filter: DomainFeeFilter) => {
  return useQuery({
    queryKey: ['domain-renewal-income-report', filter],
    queryFn: () => domainFeeIncomeReportApiService.getDomainRenewalFeeIncomeReport(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetDomainRenewalFeeIncomeMonthlyReport = (filter: DomainFeeFilter) => {
  return useQuery({
    queryKey: ['domain-renewal-income-monthly-report', filter],
    queryFn: () => domainFeeIncomeReportApiService.getDomainRenewalFeeIncomeMonthlyReport(filter),
    refetchOnWindowFocus: false,
  });
};
