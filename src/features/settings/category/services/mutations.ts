import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategoryRequest, OrderCategoryRequest, UpdateCategoryRequest } from '../types';
import categoryApiService from './api';
import { toast } from 'sonner';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoryApiService.createCategory(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('created successfully');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) => categoryApiService.updateCategory(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('created successfully');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useToggleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryApiService.toggleCategory(id),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('created successfully');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useOrderCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderCategoryRequest) => categoryApiService.orderCategory(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
