import appAxios from "@/lib/appAxios";
import { APIResponse, PaginationFilter } from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import {
  BaseCurrencyData,
  CreateExchangeRateRequest,
  ExchangeRateData,
  ExchangeRateFilter,
  ExchangeRateHistoryData,
  UpdateExchangeRateAllRequest,
  UpdateExchangeRateRequest,
} from "../types";
import { OrderCategoryRequest } from "@/features/settings/category/types";

const exchangeRateServiceApiService = {
  getBaseCurrencyList: async (filter: PaginationFilter) => {
    const queryString = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<BaseCurrencyData[]>>(
      `currency/get-base-currency-list?${queryString}`
    );
    return response.data;
  },
  getExchangeRates: async (filter: PaginationFilter) => {
    const queryString = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<ExchangeRateData[]>>(
      `currency/get-currency-list?${queryString}`
    );
    return response.data;
  },
  createExchangeRate: async (data: CreateExchangeRateRequest) => {
    const response = await appAxios.post<APIResponse<ExchangeRateData>>(
      `currency/create-currency`,
      data
    );
    return response.data;
  },
  toggleExchangeRateStatus: async (id: string) => {
    const response = await appAxios.patch<APIResponse<ExchangeRateData>>(
      `currency/toggle-currency-status/${id}`
    );
    return response.data;
  },
  updateExchangeRate: async (data: UpdateExchangeRateRequest) => {
    const { id, ...rest } = data;
    const response = await appAxios.put<APIResponse<ExchangeRateData>>(
      `currency/update-currency/${id}`,
      rest
    );
    return response.data;
  },
  updateExchangeRateAll: async (data: UpdateExchangeRateAllRequest) => {
    const response = await appAxios.put<APIResponse<ExchangeRateData>>(
      `currency/update-currencies`,
      data
    );
    return response.data;
  },
  getExchangeRateHistory: async (filter: ExchangeRateFilter) => {
    const { id, ...rest } = filter;
    const queryString = objectToQueryString(rest);
    const response = await appAxios.get<APIResponse<ExchangeRateHistoryData[]>>(
      `currency/get-exchange-records/${id}?${queryString}`
    );
    return response.data;
  },
  updateExchangeRateOrder: async (data: OrderCategoryRequest) => {
    const response = await appAxios.put<APIResponse<ExchangeRateData>>(
      `currency/update-currency-order`,
      data
    );
    return response.data;
  },
};

export default exchangeRateServiceApiService;
