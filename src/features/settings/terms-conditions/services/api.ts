import { APIResponse } from '@/features/base/types';
import appAxios from '@/lib/appAxios';
import {
  EarningWithdrawalTNCData,
  TermsConditionsData,
  UpdateTermsConditionsRequest,
} from '../types';

const termsConditionApiService = {
  getTermsConditions: async () => {
    const response = await appAxios.get<APIResponse<TermsConditionsData[]>>(
      `/admin-settings/terms-and-conditions`,
    );
    return response.data;
  },
  updateTermsConditions: async (data: UpdateTermsConditionsRequest) => {
    const response = await appAxios.patch<APIResponse<TermsConditionsData[]>>(
      `/admin-settings/terms-and-conditions/update`,
      {
        data: [data],
      },
    );
    return response.data;
  },
  getEarningWithdrawalTNC: async () => {
    const response = await appAxios.get<APIResponse<{ data: EarningWithdrawalTNCData[] }>>(
      `/membership-admin/get-membership-withdraw-tnc`,
    );
    return response.data;
  },
  updateEarningWithdrawalTNC: async (data: UpdateTermsConditionsRequest) => {
    const response = await appAxios.put<APIResponse<TermsConditionsData[]>>(
      `/membership-admin/update-membership-withdrawTNC/${data.id}`,
      {
        content: data.description,
      },
    );
    return response.data;
  },
};
export default termsConditionApiService;
