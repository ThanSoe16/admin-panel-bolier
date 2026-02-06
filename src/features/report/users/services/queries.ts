import userReportApiService from './api';
import { useQuery } from '@tanstack/react-query';
import { DateFilter } from '@/features/base/types';

export const useGetUserReport = (filter: DateFilter) => {
  return useQuery({
    queryKey: ['user-report', filter],
    queryFn: () => userReportApiService.getUserReport(filter),
    refetchOnWindowFocus: false,
  });
};
