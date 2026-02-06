import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import {
  CreateFAQRequest,
  FAQData,
  FAQFilterData,
  UpdateFAQRequest,
} from "../types";
import { objectToQueryString } from "@/utils/objectToQueryString";

const faqsApiService = {
  getFaqs: async (filters: FAQFilterData) => {
    const params = objectToQueryString(filters);
    const response = await appAxios.get<APIResponse<FAQData[]>>(
      `/admin-settings/faq?${params}`
    );
    return response.data;
  },

  getFaqById: async (id: string) => {
    const response = await appAxios.get<APIResponse<FAQData>>(
      `/admin-settings/faq/${id}`
    );
    return response.data;
  },

  createFaq: async (data: CreateFAQRequest) => {
    const response = await appAxios.post<APIResponse<CreateFAQRequest>>(
      "/admin-settings/faq",
      data
    );
    return response.data;
  },

  updateFaq: async (params: { id: string; data: UpdateFAQRequest }) => {
    const response = await appAxios.patch<APIResponse<UpdateFAQRequest>>(
      `/admin-settings/faq/update`,
      params.data
    );

    return response.data;
  },
};

export default faqsApiService;
