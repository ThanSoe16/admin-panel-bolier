import appAxios from '@/lib/appAxios';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { TemplateIncomeFilter, TemplateIncomeResponse } from '../types';
import { APIResponse } from '@/features/base/types';

const templateIncomeReportApiService = {
  getTemplateIncomeReport: async (filter: TemplateIncomeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<TemplateIncomeResponse>>(
      `statistics-report/income-report/purchase-template-detail?${params}`,
    );
    return response.data;
  },
  getTemplateIncomeMonthlyReport: async (filter: TemplateIncomeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<TemplateIncomeResponse>>(
      `statistics-report/income-report/purchase-template-by-date?${params}`,
    );
    return response.data;
  },
};

export default templateIncomeReportApiService;
