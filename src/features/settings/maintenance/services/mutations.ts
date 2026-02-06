import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateMaintenanceRequest } from "../types";
import maintenanceApiService from "./api";

export const useUpdateMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMaintenanceRequest) =>
      maintenanceApiService.updateMaintenance(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response) => {
      toast.success(response?.meta?.message);
      await queryClient.invalidateQueries({ queryKey: ["maintenance"] });
    },
  });
};

export const useUpdateMaintenanceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => maintenanceApiService.updateMaintenanceStatus(),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response) => {
      toast.success(response?.meta?.message);
      await queryClient.invalidateQueries({ queryKey: ["maintenance"] });
    },
  });
};
