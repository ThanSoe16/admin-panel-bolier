import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CreateFeatureRequest,
  UpdateFeatureRequest,
  UpdateUserAgreementRequest,
} from "../types";
import featureAgreementApiService from "./api";

export const useCreateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: CreateFeatureRequest) =>
      featureAgreementApiService.createFeature(req),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("created successfully");
      await queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });
};

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: UpdateFeatureRequest) =>
      featureAgreementApiService.updateFeature(req),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });
};
export const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => featureAgreementApiService.deleteFeature(id),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });
};

export const useCreateUserAgreement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      featureAgreementApiService.createUserAgreement(content),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["user-agreement"] });
    },
  });
};
export const useUpdateUserAgreement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserAgreementRequest) =>
      featureAgreementApiService.updateUserAgreement(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["user-agreement"] });
    },
  });
};
