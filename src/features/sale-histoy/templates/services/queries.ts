import { SaleHistoryFilter } from "../../types";
import templateSaleHistoryApiService from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetTemplateSaleHistory = (filter: SaleHistoryFilter) => {
  return useQuery({
    queryKey: ["template-sale-history", filter],
    queryFn: () => templateSaleHistoryApiService.getTemplateSaleHistory(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetTemplateSaleHistoryDetails = (params: {id: string}) => {
  return useQuery({
    queryKey: ["template-sale-historydetails", params],
    queryFn: () => templateSaleHistoryApiService.getTemplateSaleHistoryDetails(params),
    refetchOnWindowFocus: false,
  })
};