import { APIResponse } from '@/features/base/types';
import appAxios from '@/lib/appAxios';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { PolicyData, PolicyFilter, UpdatePolicyRequest } from '../types';

const policyApiService = {
  getPaymentPolicy: async (filter: PolicyFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<PolicyData[]>>(
      `/admin-settings/payment-policy?${params}`,
    );
    return response.data;
  },
  updatePaymentPolicy: async (data: UpdatePolicyRequest) => {
    const response = await appAxios.patch<APIResponse<PolicyData[]>>(
      `/admin-settings/payment-policy/update`,
      { data: [data] },
    );
    return response.data;
  },
  getRefundPolicy: async (filter: PolicyFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<PolicyData[]>>(
      `/admin-settings/refund-policy?${params}`,
    );
    return response.data;
  },
  updaterefundPolicy: async (data: UpdatePolicyRequest) => {
    const response = await appAxios.patch<APIResponse<PolicyData[]>>(
      `/admin-settings/refund-policy/update`,
      { data: [data] },
    );
    return response.data;
  },
  getPrivacyPolicy: async (filter: PolicyFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<PolicyData[]>>(
      `/admin-settings/privacy-policy?${params}`,
    );
    return response.data;
  },
  updatePrivacyPolicy: async (data: UpdatePolicyRequest) => {
    const response = await appAxios.patch<APIResponse<PolicyData[]>>(
      `/admin-settings/privacy-policy/update`,
      { data: [data] },
    );
    return response.data;
  },
  getRecoveryPolicy: async (filter: PolicyFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<PolicyData[]>>(
      `/admin-settings/recovery-policy?${params}`,
    );
    return response.data;
  },
  updateRecoveryPolicy: async (data: UpdatePolicyRequest) => {
    const response = await appAxios.patch<APIResponse<PolicyData[]>>(
      `/admin-settings/recovery-policy/update`,
      { data: [data] },
    );
    return response.data;
  },
};
export default policyApiService;
