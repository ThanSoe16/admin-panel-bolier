import appAxios from "@/lib/appAxios";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { ServerFeeFilter, ServerFeeReportResponse } from "../types";
import { APIResponse } from "@/features/base/types";

const serverFeeIncomeReportApiService = {
  getServerFeeIncomeReport: async (filter: ServerFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<ServerFeeReportResponse>>(
      `statistics-report/income-report/server-fees-detail?${params}`
    );
    return response.data;
  },
  getServerFeeIncomeMonthlyReport: async (filter: ServerFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<ServerFeeReportResponse>>(
      `statistics-report/income-report/server-fees-by-date?${params}`
    );
    return response.data;
  },
};

export default serverFeeIncomeReportApiService;
