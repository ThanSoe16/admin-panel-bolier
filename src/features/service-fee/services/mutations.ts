import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceFeeApiService from "./api";
import { toast } from "sonner";

export const useCreateMaintainFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (maintainFee: string) =>
      serviceFeeApiService.createMaintainFee(maintainFee),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["maintain-fee"] });
    },
  });
};

export const useCreateSetupFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (setupFee: string) =>
      serviceFeeApiService.createSetupFee(setupFee),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["setup-fee"] });
    },
  });
};

export const useCreateHostingFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hostingFee: string) =>
      serviceFeeApiService.createHostingFee(hostingFee),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      // toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["hosting-fee"] });
    },
  });
};

export const useCreateHostingRenewFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hostingRenewFee: string) =>
      serviceFeeApiService.createHostingRenewFee(hostingRenewFee),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["hosting-renew-fee"] });
    },
  });
};
