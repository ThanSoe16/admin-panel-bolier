import { toast } from "sonner";
import blogPreferenceApiService from "./api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useReOrderBlogLanguages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogPreferenceApiService.reOrderBlogLanguages,
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["blog-languages"] });
      }
    },
  });
};

export const useCreateBlogLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogPreferenceApiService.createBlogLanguage,
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["blog-languages"] });
      }
    },
  });
};

export const useUpdateBlogLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogPreferenceApiService.updateBlogLanguage,
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["blog-languages"] });
      }
    },
  });
};

export const useUpdateBlogLanguageStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogPreferenceApiService.updateStatus,
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["blog-languages"] });
      }
    },
  });
};

export const useUpdateBlogMerchantAccountLimit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogPreferenceApiService.updateBlogMerchantAccountLimit,
    onSettled: async (_, error) => {
      if (error) {
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["blog-merchant-account-limit"],
        });
      }
    },
  });
};
