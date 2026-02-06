import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreatePaymentMethodRequest,
  UpdatePaymentMethodRequest,
} from "../types";
import paymentMethodApiService from "./api";
import { toast } from "sonner";
import { OrderCategoryRequest } from "@/features/settings/category/types";

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePaymentMethodRequest) =>
      paymentMethodApiService.createPaymentMethod(data),
    onSuccess: async () => {
      toast.success("Payment method created successfully");
      await queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePaymentMethodRequest) =>
      paymentMethodApiService.updatePaymentMethod(data),
    onSuccess: async () => {
      toast.success("Payment method updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useTogglePaymentMethodStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      paymentMethodApiService.togglePaymentMethodStatus(id),
    onSuccess: async () => {
      toast.success("Payment method status updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useOrderPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderCategoryRequest) =>
      paymentMethodApiService.orderPaymentMethod(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("Payment method order updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
  });
};
