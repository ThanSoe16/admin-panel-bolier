import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ApproveWithdrawalRequestRequest,
  RejectWithdrawalRequestRequest,
  UpdateWithdrawalSettingRequest,
} from '../types';
import withdrawalApiService from './api';
import { toast } from 'sonner';

export const useUpdateWithdrawalSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateWithdrawalSettingRequest) =>
      withdrawalApiService.updateWithdrawalSetting(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['withdrawal-setting'] });
    },
  });
};

export const useApproveWithdrawalRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApproveWithdrawalRequestRequest) =>
      withdrawalApiService.approveWithdrawalRequest(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('withdrawal request approved successfully');
      await queryClient.invalidateQueries({
        queryKey: ['withdrawal-requests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['withdrawal-request-detail', variables.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ['withdrawal-history'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['withdrawal-history-detail', variables.id],
      });
    },
  });
};

export const useRejectWithdrawalRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RejectWithdrawalRequestRequest) =>
      withdrawalApiService.rejectWithdrawalRequest(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('withdrawal request rejected successfully');
      await queryClient.invalidateQueries({
        queryKey: ['withdrawal-requests'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['withdrawal-request-detail', variables.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ['withdrawal-history'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['withdrawal-history-detail', variables.id],
      });
    },
  });
};
