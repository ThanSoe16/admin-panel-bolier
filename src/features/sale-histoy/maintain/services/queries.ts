import maintainSaleHistoryApiService from "./api";
import { useQuery } from "@tanstack/react-query";
import { SaleHistoryFilter } from "../../types";

export const useGetMaintainSaleHistory = (filter: SaleHistoryFilter) => {
  return useQuery({
    queryKey: ["maintain-sale-history", filter],
    queryFn: () => maintainSaleHistoryApiService.getMaintainSaleHistory(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetMaintainSaleHistoryDetails = (params: {id: string}) => {
  return useQuery({
    queryKey: ["maintain-sale-history-details", params],
    queryFn: () => maintainSaleHistoryApiService.getMaintainSaleHistoryDetails(params),
    refetchOnWindowFocus: false,
  })
};