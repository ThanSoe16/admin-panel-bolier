import { useQuery } from "@tanstack/react-query";
import paymentMethodApiService from "./api";
import { PaginationFilter } from "@/features/base/types";

export const useGetPaymentMethods = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ["payment-methods", filter],
    queryFn: () => paymentMethodApiService.getPaymentMethod(filter),
    refetchOnWindowFocus: false,
  });
};
