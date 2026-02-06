import { useQuery } from '@tanstack/react-query';
import { PolicyFilter } from '../types';
import policyApiService from './api';

export const useGetPaymentPolicy = (filter: PolicyFilter) => {
  return useQuery({
    queryKey: ['payment-policy', filter],
    queryFn: () => policyApiService.getPaymentPolicy(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetRefundPolicy = (filter: PolicyFilter) => {
  return useQuery({
    queryKey: ['refund-policy', filter],
    queryFn: () => policyApiService.getRefundPolicy(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetPrivacyPolicy = (filter: PolicyFilter) => {
  return useQuery({
    queryKey: ['privacy-policy', filter],
    queryFn: () => policyApiService.getPrivacyPolicy(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetRecoveryPolicy = (filter: PolicyFilter) => {
  return useQuery({
    queryKey: ['recovery-policy', filter],
    queryFn: () => policyApiService.getRecoveryPolicy(filter),
    refetchOnWindowFocus: false,
  });
};
