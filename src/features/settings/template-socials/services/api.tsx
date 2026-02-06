import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import {
  TemplateSocialData,
  UpdateTemplateSocialStatusRequest,
} from "../types";

const templateSocialsApiService = {
  getTemplateSocials: async () => {
    const response = await appAxios.get<APIResponse<TemplateSocialData[]>>(
      `/admin-settings/share-template-social`
    );
    return response.data;
  },

  updateTemplateSocialStatus: async (params: {
    data: UpdateTemplateSocialStatusRequest;
    id: string;
  }) => {
    const response = await appAxios.patch<APIResponse<TemplateSocialData[]>>(
      `/admin-settings/share-template-social/${params.id}`,
      params.data
    );
    return response.data;
  },
};

export default templateSocialsApiService;
