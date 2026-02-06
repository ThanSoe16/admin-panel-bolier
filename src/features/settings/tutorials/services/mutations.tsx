import { toast } from 'sonner';
import tutorialsApiService from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTutorial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tutorialsApiService.createTutorial,
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['tutorials'] });
      }
    },
  });
};

export const useUpdateTutorial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tutorialsApiService.updateTutorial,
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['tutorials'] });
      }
    },
  });
};

export const useDeleteTutorial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tutorialsApiService.deleteTutorial,
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['tutorials'] });
      }
    },
  });
};
