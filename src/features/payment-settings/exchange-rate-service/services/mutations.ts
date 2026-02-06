import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateExchangeRateRequest,
  UpdateExchangeRateAllRequest,
  UpdateExchangeRateRequest,
} from "../types";
import exchangeRateServiceApiService from "./api";
import { toast } from "sonner";
import { OrderCategoryRequest } from "@/features/settings/category/types";

export const useCreateExchangeRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExchangeRateRequest) =>
      exchangeRateServiceApiService.createExchangeRate(data),
    onSuccess: async () => {
      toast.success("Exchange rate created successfully");
      await queryClient.invalidateQueries({ queryKey: ["exchange-rate"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useToggleExchangeRateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      exchangeRateServiceApiService.toggleExchangeRateStatus(id),
    onSuccess: async () => {
      toast.success("Exchange rate status updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["exchange-rate"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdateExchangeRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateExchangeRateRequest) =>
      exchangeRateServiceApiService.updateExchangeRate(data),
    onSuccess: async (response, variable) => {
      toast.success("Exchange rate updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["exchange-rate"] });
      await queryClient.invalidateQueries({
        queryKey: ["exchange-rate-history", { id: variable.id }],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdateExchangeRateAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateExchangeRateAllRequest) =>
      exchangeRateServiceApiService.updateExchangeRateAll(data),
    onSuccess: async (response, variable) => {
      toast.success("Exchange rates updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["exchange-rate"] });
      await queryClient.invalidateQueries({
        queryKey: ["exchange-rate-history"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdateExchangeRateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderCategoryRequest) =>
      exchangeRateServiceApiService.updateExchangeRateOrder(data),
    onSuccess: async (response) => {
      toast.success("Exchange rate order updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["exchange-rate"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};
