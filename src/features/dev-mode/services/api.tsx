import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { PendingTemplateData, PendingTemplatesFilter, PublishedTemplateData, PublishedTemplatesFilter, RecentDevActivityData } from "../types";
import { objectToQueryString } from "@/utils/objectToQueryString";

export const devModeApiService = {
  getPendingTemplates: async (params: PendingTemplatesFilter) => {
    const paramsString = objectToQueryString(params);
    const response = await appAxios.get<APIResponse<PendingTemplateData[]>>(
      `/dev-mode/pending-templates?${paramsString}`
    );
    return response.data;
  },

  getRecentDevActivities: async () => {
    const response = await appAxios.get<APIResponse<RecentDevActivityData[]>>(
      "/dev-mode/activities"
    );
    return response.data;
  },

  getPublishedTemplates: async (params: PublishedTemplatesFilter) => {
    const paramsString = objectToQueryString(params);
    const response = await appAxios.get<APIResponse<PublishedTemplateData[]>>(
      `/dev-mode/published-templates?${paramsString}`
    );
    return response.data;
  },
};