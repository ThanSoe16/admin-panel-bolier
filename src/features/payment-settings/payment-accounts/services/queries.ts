import { useQuery } from "@tanstack/react-query";
import paymentAccountApiService from "./api";
import { PaginationFilter } from "@/features/base/types";

export const useGetPaymentAccounts = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ["payment-accounts", filter],
    queryFn: () => paymentAccountApiService.getPaymentAccount(filter),
    refetchOnWindowFocus: false,
  });
};
