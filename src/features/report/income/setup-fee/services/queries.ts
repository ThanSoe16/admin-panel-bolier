import { SetupFeeFilter } from '../types';
import setupFeeIncomeReportApiService from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetSetupFeeIncomeReport = (filter: SetupFeeFilter) => {
  return useQuery({
    queryKey: ['setup-income-report', filter],
    queryFn: () => setupFeeIncomeReportApiService.getSetupFeeIncomeReport(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetSetupFeeIncomeMonthlyReport = (filter: SetupFeeFilter) => {
  return useQuery({
    queryKey: ['setup-income-monthly-report', filter],
    queryFn: () => setupFeeIncomeReportApiService.getSetupFeeIncomeMonthlyReport(filter),
    refetchOnWindowFocus: false,
  });
};
