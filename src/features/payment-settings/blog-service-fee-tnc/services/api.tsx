import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import {
  BlogServiceFeeTermsConditionsData,
  UpdateBlogServiceFeeTermsConditionsRequest,
} from "../types";

export const blogServiceFeeTNCService = {
  getBlogServiceFeeTermsConditions: async () => {
    const response = await appAxios.get<
      APIResponse<BlogServiceFeeTermsConditionsData>
    >(`/membership-admin/get-membership-service-fee-tnc`);
    return response.data;
  },

  updateTermsConditions: async (
    data: UpdateBlogServiceFeeTermsConditionsRequest
  ) => {
    const response = await appAxios.put<
      APIResponse<BlogServiceFeeTermsConditionsData>
    >(`/membership-admin/update-membership-service-fee-tnc/${data?.id}`, {
      content: data?.content,
    });
    return response.data;
  },
  getMembershipPlanTNC: async () => {
    const response = await appAxios.get<
      APIResponse<BlogServiceFeeTermsConditionsData>
    >(`/membership-admin/get-membership-plan-tnc`);
    return response.data;
  },

  updateMembershipPlanTNC: async (
    data: UpdateBlogServiceFeeTermsConditionsRequest
  ) => {
    const response = await appAxios.put<
      APIResponse<BlogServiceFeeTermsConditionsData>
    >(`/membership-admin/update-membership-plan-tnc/${data?.id}`, {
      content: data?.content,
    });
    return response.data;
  },
};
