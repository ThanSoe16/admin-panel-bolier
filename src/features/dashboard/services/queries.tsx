import { dashboardApiService } from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApiService.getDashboardData,
  });
};
