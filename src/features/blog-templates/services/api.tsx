import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { BlogTemplateData, BlogTemplateSaleHistoryData, BlogTemplateSaleHistoryFilter, BlogTemplatesFilter, TemplateDetailsData, TemplateOverviewData, TemplateSetupApiPayload, ToggleTemplateStatusRequest } from "../types";
import { objectToQueryString } from "@/utils/objectToQueryString";

export const blogTemplatesApiService = {
  getBlogTemplates: async (params: BlogTemplatesFilter) => {
    const paramsString = objectToQueryString(params);
    const response = await appAxios.get<APIResponse<BlogTemplateData[]>>(
      `/manage-blog/templates?${paramsString}`
    );
    return response.data;
  },

  getTemplateDetails: async (params: {
    id: string
  }) => {
    const response = await appAxios.get<APIResponse<TemplateDetailsData>>(
      `/dev-mode/template-detail/${params?.id}`
    );
    return response.data;
  },

  uploadTemplate: async (params: TemplateSetupApiPayload) => {
    const response = await appAxios.post<APIResponse<TemplateDetailsData>>(
      `/dev-mode/publish-template`,
      params
    );
    return response.data;
  },

  toggleTemplateStatus: async (data: ToggleTemplateStatusRequest) => {
    const response = await appAxios.post<APIResponse<TemplateDetailsData>>(
      `/dev-mode/toggle-status`,
      data
    );
    return response.data;
  },

  getBlogTemplateSaleHistory: async (params:{
    id: string;
    filter: BlogTemplateSaleHistoryFilter
  }) => {
    const paramsString = objectToQueryString(params.filter);
    const response = await appAxios.get<APIResponse<BlogTemplateSaleHistoryData[]>>(
      `/manage-blog/template-sale-list/${params?.id}?${paramsString}`
    );
    return response.data;
  },

  getTemplateOverview: async () => {
    const response = await appAxios.get<APIResponse<TemplateOverviewData>>(
      `/manage-blog/templates-overview`
    );
    return response.data;
  }
};