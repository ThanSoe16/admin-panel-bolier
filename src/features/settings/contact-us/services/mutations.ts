import contactUsApiService from './api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { UpdateContactApiType } from '../types';

export const useUpdateContactUs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactApiType }) =>
      contactUsApiService.updateContactUs({ id, data }),
    onSettled: async (_, error) => {
      if (error) {
      } else {
        await queryClient.invalidateQueries({ queryKey: ['contact-us'] });
      }
    },
  });
};
