import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import {
  RegistrationTermsConditionsData,
  UpdateRegistrationTermsConditionsRequest
} from "../types";
import { RegistrationTermsConditionsTypeEnum } from "@/features/base/types/backend-defined-enums";
import { objectToQueryString } from "@/utils/objectToQueryString";

export const registrationTNCService = {
  getRegistrationTermsConditions: async ({
    type
  }: {
    type: RegistrationTermsConditionsTypeEnum;
  }) => {
    const query = objectToQueryString({
      type
    })
    const response = await appAxios.get<APIResponse<RegistrationTermsConditionsData>>(
      `/membership-admin/get-membership-otp-service-fee-tnc-by-type?${query}`
    );
    return response.data;
  },

  updateTermsConditions: async (data: UpdateRegistrationTermsConditionsRequest) => {
    const response = await appAxios.put<APIResponse<RegistrationTermsConditionsData>>(
      `/membership-admin/update-membership-otp-service-fee-tnc/${data?.id}`,
      {
        content: data?.content,
      }
    );
    return response.data;
  },
}