import { toast } from "sonner";
import { blogTemplatesApiService } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadBlogTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogTemplatesApiService.uploadTemplate,
    onSettled: async (_, error, variables) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.refetchQueries({
          queryKey: ["template-details", { id: variables.id }],
        });
        await queryClient.refetchQueries({
          queryKey: ["pending-templates"],
        });
        await queryClient.refetchQueries({
          queryKey: ["published-templates"],
        });
        await queryClient.refetchQueries({ queryKey: ["blog-templates"] });
        await queryClient.refetchQueries({
          queryKey: ["template-overview"],
        });
      }
    },
  });
};

export const useToggleTemplateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogTemplatesApiService.toggleTemplateStatus,
    onSettled: async (_, error, variables) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["template-details", { id: variables.template_id }],
        });
        await queryClient.invalidateQueries({ queryKey: ["blog-templates"] });
      }
    },
  });
};
