import { APIResponse } from '@/features/base/types';
import appAxios from '@/lib/appAxios';
import { DashboardData } from '../types';

export const dashboardApiService = {
  getDashboardData: async () => {
    const response = await appAxios.get<APIResponse<DashboardData>>(
      `/admin-dashboard/dashboard-data`,
    );
    return response.data;
  },
};
