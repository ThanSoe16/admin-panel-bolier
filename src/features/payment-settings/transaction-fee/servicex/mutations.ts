import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateTransactionFeeRequest,
  UpdateWithdrawFeeRequest,
} from "../types";
import transactionFeeApiService from "./api";
import { toast } from "sonner";

export const useUpdateTransactionFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTransactionFeeRequest) =>
      transactionFeeApiService.updateTransactionFee(data),
    onSuccess: async () => {
      toast.success("Transaction fee updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["transaction-fee"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useToggleTransactionFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      transactionFeeApiService.toggleTransactionFee(id),
    onSuccess: async () => {
      toast.success("Transaction fee status updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["transaction-fee"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdateWithdrawFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateWithdrawFeeRequest) =>
      transactionFeeApiService.updateWithdrawFee(data),
    onSuccess: async () => {
      toast.success("Withdraw fee updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["withdraw-fee"] });
      await queryClient.invalidateQueries({
        queryKey: ["withdraw-fee-history"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};
