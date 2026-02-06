import { blogServiceFeeTNCService } from "./api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateBlogServiceFeeTermsConditionsRequest } from "../types";

export const useUpdateBlogServiceFeeTermsConditions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBlogServiceFeeTermsConditionsRequest) =>
      blogServiceFeeTNCService.updateTermsConditions(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({
        queryKey: ["blog-service-fee-tnc"],
      });
    },
  });
};

export const useUpdateMembershipPlanTNC = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBlogServiceFeeTermsConditionsRequest) =>
      blogServiceFeeTNCService.updateMembershipPlanTNC(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({
        queryKey: ["membership-plan-tnc"],
      });
    },
  });
};
