import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdatePolicyRequest } from "../types";
import policyApiService from "./api";

export const useUpdatePaymentPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePolicyRequest) =>
      policyApiService.updatePaymentPolicy(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["payment-policy"] });
    },
  });
};

export const useUpdateRefundPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePolicyRequest) =>
      policyApiService.updaterefundPolicy(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["refund-policy"] });
    },
  });
};

export const useUpdatePrivacyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePolicyRequest) =>
      policyApiService.updatePrivacyPolicy(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["privacy-policy"] });
    },
  });
};

export const useUpdateRecoveryPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePolicyRequest) =>
      policyApiService.updateRecoveryPolicy(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["recovery-policy"] });
    },
  });
};
