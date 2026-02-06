import serverSaleHistoryApiService from "./api";
import { useQuery } from "@tanstack/react-query";
import { SaleHistoryFilter } from "../../types";

export const useGetServerSaleHistory = (filter: SaleHistoryFilter) => {
  return useQuery({
    queryKey: ["server-sale-history", filter],
    queryFn: () => serverSaleHistoryApiService.getServerSaleHistory(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetServerSaleHistoryDetails = (params: {id: string}) => {
  return useQuery({
    queryKey: ["server-sale-history-details", params],
    queryFn: () => serverSaleHistoryApiService.getServerSaleHistoryDetails(params),
    refetchOnWindowFocus: false,
  })
};