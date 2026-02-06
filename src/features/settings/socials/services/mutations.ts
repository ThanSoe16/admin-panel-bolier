import SocialLinksApiService from './api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { SocialLinksDragType, SocialLinksForm } from '../types';

export const useUpdateSocialLinks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ links }: { links: SocialLinksForm[] }) =>
      SocialLinksApiService.updateSocialLinks({ links }),
    onSettled: async (_, error) => {
      if (error) {
      } else {
        await queryClient.invalidateQueries({ queryKey: ['social-links'] });
      }
    },
  });
};

export const useDragAndSortSocialLinks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: SocialLinksDragType }) =>
      SocialLinksApiService.dragAndSortSocialLinks({ data }),
    onSettled: async (_, error) => {
      if (error) {
      } else {
        await queryClient.invalidateQueries({ queryKey: ['social-links'] });
      }
    },
  });
};
