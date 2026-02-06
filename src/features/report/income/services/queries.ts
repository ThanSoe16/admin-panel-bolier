import incomeReportApiService from "./api";
import { useQuery } from "@tanstack/react-query";
import { DateFilter } from "@/features/base/types";

export const useGetIncomeReport = (filter: DateFilter) => {
  return useQuery({
    queryKey: ["income-report", filter],
    queryFn: () => incomeReportApiService.getIncomeReport(filter),
    refetchOnWindowFocus: false,
  });
};
