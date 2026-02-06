import appAxios from "@/lib/appAxios";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { HostingFeeFilter, HostingFeeReportResponse } from "../types";
import { APIResponse } from "@/features/base/types";

const hostingFeeIncomeReportApiService = {
  getHostingFeeIncomeReport: async (filter: HostingFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<HostingFeeReportResponse>>(
      `statistics-report/income-report/hosting-fees-detail?${params}`
    );
    return response.data;
  },
  getHostingFeeIncomeMonthlyReport: async (filter: HostingFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<HostingFeeReportResponse>>(
      `statistics-report/income-report/hosting-fees-by-date?${params}`
    );
    return response.data;
  },
};

export default hostingFeeIncomeReportApiService;
