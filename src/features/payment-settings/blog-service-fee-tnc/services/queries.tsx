import { useQuery } from "@tanstack/react-query";
import { blogServiceFeeTNCService } from "./api";

export const useGetBlogServiceFeeTNC = () => {
  return useQuery({
    queryKey: ["blog-service-fee-tnc"],
    queryFn: () => blogServiceFeeTNCService.getBlogServiceFeeTermsConditions(),
  });
};

export const useGetMembershipPlanTNC = () => {
  return useQuery({
    queryKey: ["membership-plan-tnc"],
    queryFn: () => blogServiceFeeTNCService.getMembershipPlanTNC(),
  });
};
