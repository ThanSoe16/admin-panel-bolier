import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateTermsConditionsRequest } from '../types';
import termsConditionApiService from './api';
import { toast } from 'sonner';

export const useUpdateTermsConditions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTermsConditionsRequest) =>
      termsConditionApiService.updateTermsConditions(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['terms-conditions'] });
    },
  });
};

export const useUpdateEarningWithdrawalTNC = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTermsConditionsRequest) =>
      termsConditionApiService.updateEarningWithdrawalTNC(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success('updated successfully');
      await queryClient.invalidateQueries({
        queryKey: ['earning-withdrawal-tnc'],
      });
    },
  });
};
