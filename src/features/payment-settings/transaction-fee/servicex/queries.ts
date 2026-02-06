import { PaginationFilter } from "@/features/base/types";
import { useQuery } from "@tanstack/react-query";
import transactionFeeApiService from "./api";
import { TransactionHistoyFilter, WithdrawHistoyFilter } from "../types";

export const useGetTransactionFee = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ["transaction-fee", filter],
    queryFn: () => transactionFeeApiService.getTransactionFee(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetTransactionFeeHistory = (
  filter: TransactionHistoyFilter
) => {
  return useQuery({
    queryKey: ["transaction-fee-history", filter],
    queryFn: () => transactionFeeApiService.getTransactionFeeHistory(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetWithdrawFee = () => {
  return useQuery({
    queryKey: ["withdraw-fee"],
    queryFn: () => transactionFeeApiService.getWithdrawFee(),
    refetchOnWindowFocus: false,
  });
};

export const useGetWithdrawFeeHistory = (filter: WithdrawHistoyFilter) => {
  return useQuery({
    queryKey: ["withdraw-fee-history", filter],
    queryFn: () => transactionFeeApiService.getWithdrawFeeHistory(filter),
    refetchOnWindowFocus: false,
  });
};
