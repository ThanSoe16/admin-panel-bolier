import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import {
  CreateFeatureRequest,
  FeatureData,
  UpdateFeatureRequest,
  UpdateUserAgreementRequest,
  UserAgreementData,
} from "../types";

const featureAgreementApiService = {
  getFeatures: async () => {
    const response = await appAxios.get<APIResponse<FeatureData[]>>(
      `/membership-admin/get-membership-feature`
    );
    return response.data;
  },

  createFeature: async (req: CreateFeatureRequest) => {
    const response = await appAxios.post<APIResponse<UserAgreementData>>(
      `/membership-admin/create-membership-feature`,
      req
    );
    return response.data;
  },

  updateFeature: async (req: UpdateFeatureRequest) => {
    const { id, ...rest } = req;
    const response = await appAxios.put<APIResponse<UserAgreementData>>(
      `/membership-admin/update-membership-feature/${id}`,
      rest
    );
    return response.data;
  },
  deleteFeature: async (id: string) => {
    const response = await appAxios.delete<APIResponse<UserAgreementData>>(
      `/membership-admin/delete-membership-feature-by-id/${id}`
    );
    return response.data;
  },

  getUserAgreement: async () => {
    const response = await appAxios.get<APIResponse<UserAgreementData>>(
      `/membership-admin/get-membership-user-agreement`
    );
    return response.data;
  },
  createUserAgreement: async (content: string) => {
    const response = await appAxios.post<APIResponse<UserAgreementData>>(
      `/membership-admin/create-membership-user-agreement`,
      { content: content }
    );
    return response.data;
  },
  updateUserAgreement: async (data: UpdateUserAgreementRequest) => {
    const { id, content } = data;
    const response = await appAxios.put<APIResponse<UserAgreementData>>(
      `/membership-admin/update-membership-user-agreement/${id}`,
      { content: content }
    );
    return response.data;
  },
};
export default featureAgreementApiService;
