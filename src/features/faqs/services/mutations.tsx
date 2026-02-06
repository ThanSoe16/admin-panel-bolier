import { toast } from "sonner";
import faqsApiService from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: faqsApiService.createFaq,
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["faqs"] });
      }
    },
  });
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: faqsApiService.updateFaq,
    onSettled: async (_, error, variables) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["faq", variables.id],
        });
        await queryClient.invalidateQueries({ queryKey: ["faqs"] });
      }
    },
  });
};
