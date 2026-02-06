import { MaintainFeeFilter } from '../types';
import maintainFeeIncomeReportApiService from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetMaintainFeeIncomeReport = (filter: MaintainFeeFilter) => {
  return useQuery({
    queryKey: ['maintain-income-report', filter],
    queryFn: () => maintainFeeIncomeReportApiService.getMaintainFeeIncomeReport(filter),
    refetchOnWindowFocus: false,
  });
};
export const useGetMaintainFeeIncomeMonthlyReport = (filter: MaintainFeeFilter) => {
  return useQuery({
    queryKey: ['maintain-income-monthly-report', filter],
    queryFn: () => maintainFeeIncomeReportApiService.getMaintainFeeIncomeMonthlyReport(filter),
    refetchOnWindowFocus: false,
  });
};
