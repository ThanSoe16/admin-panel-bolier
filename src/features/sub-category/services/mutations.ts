import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  CreateSubCategoryRequest,
  OrderSubCategoryRequest,
  UpdateSubCategoryRequest,
} from "../types";
import subCategoryApiService from "./api";

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubCategoryRequest) =>
      subCategoryApiService.createSubCategory(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("created successfully");
      await queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
    },
  });
};

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateSubCategoryRequest) =>
      subCategoryApiService.updateSubCategory(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("created successfully");
      await queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
    },
  });
};

export const useToggleSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => subCategoryApiService.toggleSubCategory(id),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("created successfully");
      await queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
    },
  });
};

export const useOrderSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderSubCategoryRequest) =>
      subCategoryApiService.orderSubCategory(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
    },
  });
};
