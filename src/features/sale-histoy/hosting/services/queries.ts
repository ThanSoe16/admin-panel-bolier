import hostingSaleHistoryApiService from "./api";
import { useQuery } from "@tanstack/react-query";
import { SaleHistoryFilter } from "../../types";

export const useGetHostingSaleHistory = (filter: SaleHistoryFilter) => {
  return useQuery({
    queryKey: ["hosting-sale-history", filter],
    queryFn: () => hostingSaleHistoryApiService.getHostingSaleHistory(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetHostingSaleHistoryDetails = (params: {id: string}) => {
  return useQuery({
    queryKey: ["hosting-sale-history-details", params],
    queryFn: () => hostingSaleHistoryApiService.getHostingSaleHistoryDetails(params),
    refetchOnWindowFocus: false,
  })
};