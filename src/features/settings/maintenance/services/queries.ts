import { useQuery } from '@tanstack/react-query';
import maintenanceApiService from './api';

export const useGetMaintenanceData = () => {
  return useQuery({
    queryKey: ['maintenance'],
    queryFn: () => maintenanceApiService.getMaintenance(),
    refetchOnWindowFocus: false,
  });
};
