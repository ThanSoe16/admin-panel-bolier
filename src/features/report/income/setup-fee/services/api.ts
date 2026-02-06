import appAxios from '@/lib/appAxios';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { SetupFeeFilter, SetupFeeReportResponse } from '../types';
import { APIResponse } from '@/features/base/types';

const setupFeeIncomeReportApiService = {
  getSetupFeeIncomeReport: async (filter: SetupFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<SetupFeeReportResponse>>(
      `statistics-report/income-report/blog-setup-fees-detail?${params}`,
    );
    return response.data;
  },
  getSetupFeeIncomeMonthlyReport: async (filter: SetupFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<SetupFeeReportResponse>>(
      `statistics-report/income-report/blog-setup-fees-by-date?${params}`,
    );
    return response.data;
  },
};

export default setupFeeIncomeReportApiService;
