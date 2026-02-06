import { useMutation, useQueryClient } from "@tanstack/react-query";
import paymentAccountApiService from "./api";
import { toast } from "sonner";
import {
  CreatePaymentAccountRequest,
  UpdatePaymentAccountRequest,
} from "../types";
import { OrderCategoryRequest } from "@/features/settings/category/types";

export const useCreatePaymentAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePaymentAccountRequest) =>
      paymentAccountApiService.createPaymentAccount(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdatePaymentAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePaymentAccountRequest) =>
      paymentAccountApiService.updatePaymentAccount(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useTogglePaymentAccountStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      paymentAccountApiService.togglePaymentAccountStatus(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useOrderPaymentAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderCategoryRequest) =>
      paymentAccountApiService.orderPaymentAccount(data),
    onSuccess: async () => {
      toast.success("Payment account ordered successfully");
      await queryClient.invalidateQueries({ queryKey: ["payment-accounts"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};
