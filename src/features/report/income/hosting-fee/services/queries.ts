import { HostingFeeFilter } from "../types";
import hostingFeeIncomeReportApiService from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetHostingFeeIncomeReport = (filter: HostingFeeFilter) => {
  return useQuery({
    queryKey: ["hosting-income-report", filter],
    queryFn: () =>
      hostingFeeIncomeReportApiService.getHostingFeeIncomeReport(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetHostingFeeIncomeMonthlyReport = (
  filter: HostingFeeFilter
) => {
  return useQuery({
    queryKey: ["hosting-income-monthly-report", filter],
    queryFn: () =>
      hostingFeeIncomeReportApiService.getHostingFeeIncomeMonthlyReport(filter),
    refetchOnWindowFocus: false,
  });
};
