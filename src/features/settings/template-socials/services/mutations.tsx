import { UpdateTemplateSocialStatusRequest } from "../types";
import templateSocialsApiService from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTemplateSocialStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      data: UpdateTemplateSocialStatusRequest;
      id: string;
    }) => templateSocialsApiService.updateTemplateSocialStatus(params),
    onSettled: async (_, error) => {
      if (error) {
        const errorResponse: any = error;

        toast.error(errorResponse?.response?.data?.meta?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["template-socials"] });
      }
    },
  });
};
