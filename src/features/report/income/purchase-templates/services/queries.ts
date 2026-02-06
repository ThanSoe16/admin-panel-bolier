import { TemplateIncomeFilter } from '../types';
import templateIncomeReportApiService from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetTemplateIncomeReport = (filter: TemplateIncomeFilter) => {
  return useQuery({
    queryKey: ['template-income-report', filter],
    queryFn: () => templateIncomeReportApiService.getTemplateIncomeReport(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetTemplateIncomeMonthlyReport = (filter: TemplateIncomeFilter) => {
  return useQuery({
    queryKey: ['template-income-monthly-report', filter],
    queryFn: () => templateIncomeReportApiService.getTemplateIncomeMonthlyReport(filter),
    refetchOnWindowFocus: false,
  });
};
