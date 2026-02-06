import { useQuery } from "@tanstack/react-query";
import featureAgreementApiService from "./api";

export const useGetFeatures = () => {
  return useQuery({
    queryKey: ["features"],
    queryFn: () => featureAgreementApiService.getFeatures(),
    refetchOnWindowFocus: false,
  });
};
export const useGetUserAgreement = () => {
  return useQuery({
    queryKey: ["user-agreement"],
    queryFn: () => featureAgreementApiService.getUserAgreement(),
    refetchOnWindowFocus: false,
  });
};
