import { useQuery } from "@tanstack/react-query";
import termsConditionApiService from "./api";

export const useGetTermsConditions = () => {
  return useQuery({
    queryKey: ["terms-conditions"],
    queryFn: () => termsConditionApiService.getTermsConditions(),
    refetchOnWindowFocus: false,
  });
};

export const useGetEarningWithdrawalTNC = () => {
  return useQuery({
    queryKey: ["earning-withdrawal-tnc"],
    queryFn: () => termsConditionApiService.getEarningWithdrawalTNC(),
    refetchOnWindowFocus: false,
  });
};
