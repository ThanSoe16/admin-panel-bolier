import blogsiteSaleHistoryApiService from "./api";
import { useQuery } from "@tanstack/react-query";
import { SaleHistoryFilter } from "../../types";

export const useGetBlogSiteSaleHistory = (filter: SaleHistoryFilter) => {
  return useQuery({
    queryKey: ["blog-site-sale-history", filter],
    queryFn: () => blogsiteSaleHistoryApiService.getBlogSiteSaleHistory(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetBlogSiteSaleHistoryDetails = (params: { id: string }) => {
  return useQuery({
    queryKey: ["blog-site-sale-history-details", params],
    queryFn: () =>
      blogsiteSaleHistoryApiService.getBlogSiteSaleHistoryDetails(params),
    refetchOnWindowFocus: false,
  });
};
