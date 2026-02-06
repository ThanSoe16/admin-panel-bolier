import appAxios from '@/lib/appAxios';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { MaintainFeeFilter, MaintainFeeReportResponse } from '../types';
import { APIResponse } from '@/features/base/types';

const maintainFeeIncomeReportApiService = {
  getMaintainFeeIncomeReport: async (filter: MaintainFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<MaintainFeeReportResponse>>(
      `statistics-report/income-report/maintain-fees-detail?${params}`,
    );
    return response.data;
  },
  getMaintainFeeIncomeMonthlyReport: async (filter: MaintainFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<MaintainFeeReportResponse>>(
      `statistics-report/income-report/maintain-fees-by-date?${params}`,
    );
    return response.data;
  },
};

export default maintainFeeIncomeReportApiService;
