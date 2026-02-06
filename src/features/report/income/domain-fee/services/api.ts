import appAxios from "@/lib/appAxios";
import { objectToQueryString } from "@/utils/objectToQueryString";
import {
  DomainFeeFilter,
  DomainRegisterationFeeReportResponse,
  DomainRenewalFeeReportResponse,
} from "../types";
import { APIResponse } from "@/features/base/types";

const domainFeeIncomeReportApiService = {
  getDomainRegistrationFeeIncomeReport: async (filter: DomainFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<
      APIResponse<DomainRegisterationFeeReportResponse>
    >(
      `statistics-report/income-report/domain-registration-fees-detail?${params}`
    );
    return response.data;
  },
  getDomainRegistrationFeeIncomeMonthlyReport: async (
    filter: DomainFeeFilter
  ) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<
      APIResponse<DomainRegisterationFeeReportResponse>
    >(
      `statistics-report/income-report/domain-registration-fees-by-date?${params}`
    );
    return response.data;
  },
  getDomainRenewalFeeIncomeReport: async (filter: DomainFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<
      APIResponse<DomainRenewalFeeReportResponse>
    >(`statistics-report/income-report/domain-renewal-fees-detail?${params}`);
    return response.data;
  },
  getDomainRenewalFeeIncomeMonthlyReport: async (filter: DomainFeeFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<
      APIResponse<DomainRenewalFeeReportResponse>
    >(`statistics-report/income-report/domain-renewal-fees-by-date?${params}`);
    return response.data;
  },
};

export default domainFeeIncomeReportApiService;
