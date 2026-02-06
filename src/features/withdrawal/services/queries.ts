import { PaginationFilter } from '@/features/base/types';
import withdrawalApiService from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetWithdrawal = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ['withdrawal-history', filter],
    queryFn: () => withdrawalApiService.getWithdrawalHistory(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetWithdrawalHistoryById = (id: string) => {
  return useQuery({
    queryKey: ['withdrawal-history-detail', id],
    queryFn: () => withdrawalApiService.getWithdrawalHistoryById(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetWithdrawalRequests = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ['withdrawal-requests', filter],
    queryFn: () => withdrawalApiService.getWithdrawalRequests(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetWithdrawalRequestById = (id: string) => {
  return useQuery({
    queryKey: ['withdrawal-request-detail', id],
    queryFn: () => withdrawalApiService.getWithdrawalRequestById(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetWithdrawalSetting = () => {
  return useQuery({
    queryKey: ['withdrawal-setting'],
    queryFn: () => withdrawalApiService.getWithdrawalSetting(),
    refetchOnWindowFocus: false,
  });
};
