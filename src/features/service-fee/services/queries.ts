import { RoleFilter } from "@/features/admins/types";
import { useQuery } from "@tanstack/react-query";
import serviceFeeApiService from "./api";

export const useGetMaintainFee = (filter: RoleFilter) => {
  return useQuery({
    queryKey: ["maintain-fee", filter],
    queryFn: () => serviceFeeApiService.getMaintainFee(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetSetupFee = (filter: RoleFilter) => {
  return useQuery({
    queryKey: ["setup-fee", filter],
    queryFn: () => serviceFeeApiService.getSetupFee(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetHostingFee = (filter: RoleFilter) => {
  return useQuery({
    queryKey: ["hosting-fee", filter],
    queryFn: () => serviceFeeApiService.getHostingFee(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetHostingRenewFee = (filter: RoleFilter) => {
  return useQuery({
    queryKey: ["hosting-renew-fee", filter],
    queryFn: () => serviceFeeApiService.getHostingRenewFee(filter),
    refetchOnWindowFocus: false,
  });
};
