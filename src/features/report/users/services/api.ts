import appAxios from '@/lib/appAxios';
import { APIResponse, DateFilter } from '@/features/base/types';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { UserReportResponse } from '../types';

const userReportApiService = {
  getUserReport: async (filter: DateFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<UserReportResponse>>(
      `statistics-report/users-report?${params}`,
    );
    return response.data;
  },
};

export default userReportApiService;
