import appAxios from '@/lib/appAxios';
import { APIResponse, DateFilter } from '@/features/base/types';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { IncomeReportResponse } from '../types';

const incomeReportApiService = {
  getIncomeReport: async (filter: DateFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<IncomeReportResponse>>(
      `statistics-report/income-report?${params}`,
    );
    return response.data;
  },
};

export default incomeReportApiService;
