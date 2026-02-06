import templateReportApiService from "./api";
import { useQuery } from "@tanstack/react-query";
import { DateFilter } from "@/features/base/types";

export const useGetTemplateReport = (filter: DateFilter) => {
  return useQuery({
    queryKey: ["template-report", filter],
    queryFn: () => templateReportApiService.getTemplateReport(filter),
    refetchOnWindowFocus: false,
  });
};
