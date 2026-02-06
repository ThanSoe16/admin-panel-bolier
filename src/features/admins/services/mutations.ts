import { APIResponse, ErrorResponse } from '@/features/base/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  AdminData,
  CreateAdminRequest,
  CreateRoleRequest,
  RoleData,
  UpdateAdminRequest,
  UpdateRoleRequest,
} from '../types';
import { AxiosError } from 'axios';
import adminsApiService from './api';
import { toast } from 'sonner';

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<APIResponse<RoleData>, AxiosError<ErrorResponse>, CreateRoleRequest>({
    mutationFn: (data: CreateRoleRequest) => adminsApiService.createRolesPermissions(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('updated successfully');
      router.back();
      await queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse<RoleData>, AxiosError<ErrorResponse>, UpdateRoleRequest>({
    mutationFn: (data: UpdateRoleRequest) => adminsApiService.updateRolesPermissions(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['roles'] });
      await queryClient.invalidateQueries({
        queryKey: ['role-detail', variables.id],
      });
    },
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<APIResponse<AdminData>, AxiosError<ErrorResponse>, CreateAdminRequest>({
    mutationFn: (data: CreateAdminRequest) => adminsApiService.createAdmin(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('created successfully');
      await queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<APIResponse<AdminData>, AxiosError<ErrorResponse>, UpdateAdminRequest>({
    mutationFn: (data: UpdateAdminRequest) => adminsApiService.updateAdmin(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['admins'] });
      await queryClient.invalidateQueries({
        queryKey: ['admin-detail', variables.id],
      });
    },
  });
};
