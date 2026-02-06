import appAxios from '@/lib/appAxios';
import { APIResponse, DateFilter } from '@/features/base/types';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { TemplateReportResponse } from '../types';

const templateReportApiService = {
  getTemplateReport: async (filter: DateFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<TemplateReportResponse>>(
      `statistics-report/template-report?${params}`,
    );
    return response.data;
  },
};

export default templateReportApiService;
