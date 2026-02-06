import domainSaleHistoryApiService from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetDomainSaleHistoryDetails = (params: { id: string }) => {
  return useQuery({
    queryKey: ["domain-sale-history-details", params],
    queryFn: () =>
      domainSaleHistoryApiService.getdomainSaleHistoryDetails(params),
    refetchOnWindowFocus: false,
  });
};
