import { useQuery } from "@tanstack/react-query";
import AcceptedReceivingApiService from "./api";
import { PaginationFilter } from "@/features/base/types";

export const useGetAcceptedReceivingPayment = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ["accepted-receiving-payment", filter],
    queryFn: () => AcceptedReceivingApiService.getReceivingPayment(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetReceivingAccountConfig = () => {
  return useQuery({
    queryKey: ["receiving-account-config"],
    queryFn: () => AcceptedReceivingApiService.getReceivingAccountConfig(),
    refetchOnWindowFocus: false,
  });
};
