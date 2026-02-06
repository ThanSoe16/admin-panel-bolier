import { useMutation, useQueryClient } from "@tanstack/react-query";
import acceptedReceivingApiService from "./api";
import {
  CreateReceivingPaymentRequest,
  UpdateReceivingPaymentRequest,
} from "../types";
import { toast } from "sonner";

export const useCreateAcceptedReceivingPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReceivingPaymentRequest) =>
      acceptedReceivingApiService.createAcceptedReceivingMethod(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["accepted-receiving-payment"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdateAcceptedReceivingPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateReceivingPaymentRequest) =>
      acceptedReceivingApiService.updateAcceptedReceivingMethod(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["accepted-receiving-payment"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useToggleAcceptedReceivingPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      acceptedReceivingApiService.toggleAcceptedReceivingStatus(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["accepted-receiving-payment"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdateReceivingAccountConfig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (maxReceivingAccount: number) =>
      acceptedReceivingApiService.updateReceivingAccountConfig(
        maxReceivingAccount
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["receiving-account-config"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};
