import { ServerFeeFilter } from '../types';
import serverFeeIncomeReportApiService from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetServerFeeIncomeReport = (filter: ServerFeeFilter) => {
  return useQuery({
    queryKey: ['server-income-report', filter],
    queryFn: () => serverFeeIncomeReportApiService.getServerFeeIncomeReport(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetServerFeeIncomeMonthlyReport = (filter: ServerFeeFilter) => {
  return useQuery({
    queryKey: ['server-income-monthly-report', filter],
    queryFn: () => serverFeeIncomeReportApiService.getServerFeeIncomeMonthlyReport(filter),
    refetchOnWindowFocus: false,
  });
};
