import { useQuery } from "@tanstack/react-query";
import exchangeRateServiceApiService from "./api";
import { PaginationFilter } from "@/features/base/types";
import { ExchangeRateFilter } from "../types";

export const useGetBaseCurrencyList = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ["base-currency-list", filter],
    queryFn: () => exchangeRateServiceApiService.getBaseCurrencyList(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetExchangeRate = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ["exchange-rate", filter],
    queryFn: () => exchangeRateServiceApiService.getExchangeRates(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetExchangeRateHistory = (filter: ExchangeRateFilter) => {
  return useQuery({
    queryKey: ["exchange-rate-history", filter],
    queryFn: () => exchangeRateServiceApiService.getExchangeRateHistory(filter),
    refetchOnWindowFocus: false,
    enabled: !!filter.id,
  });
};
