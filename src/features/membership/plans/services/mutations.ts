import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateMembershipPlanRequest,
  UpdateMembershipPlanRequest,
} from "../types";
import membershipPlanApiService from "./api";
import { toast } from "sonner";

export const useCreateMembershipPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMembershipPlanRequest) =>
      membershipPlanApiService.createMembershipPlan(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["membership-plans"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdateMembershipPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMembershipPlanRequest) =>
      membershipPlanApiService.updateMembershipPlan(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["membership-plans"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useToggleMembershipPlanStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      membershipPlanApiService.toggleMembershipPlanStatus(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["membership-plans"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};
