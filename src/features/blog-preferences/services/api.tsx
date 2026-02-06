
import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import { BlogLanguageData, BlogMerchantAccountLimitData, CreateBlogLanguageRequest, UpdateBlogLanguageRequest, UpdateBlogMerchantAccountLimitRequest } from "../types";

const blogPreferenceApiService = {
  getLanguages: async () => {
    const response = await appAxios.get<APIResponse<BlogLanguageData[]>>(
      "/blog-preferences/list"
    );
    return response.data;
  },

  reOrderBlogLanguages: async (data: any) => {
    const response = await appAxios.patch<APIResponse<BlogLanguageData[]>>(
      "/blog-preferences/update-order",
      data
    );
    return response.data;
  },

  createBlogLanguage: async (data: CreateBlogLanguageRequest) => {
    const response = await appAxios.post<APIResponse<BlogLanguageData>>(
      "/blog-preferences/create",
      data
    );
    return response.data;
  },

  updateBlogLanguage: async (params: {
    id: string,
    data: UpdateBlogLanguageRequest
  }) => {
    const response = await appAxios.put<APIResponse<BlogLanguageData>>(
      `/blog-preferences/update/${params.id}`,
      params.data
    );
    return response.data;
  },

  updateStatus: async (id: string) => {
    const response = await appAxios.patch<APIResponse<BlogLanguageData>>(
      `/blog-preferences/toggle/${id}`,
    );
    return response.data;
  },

  getBlogMerchantAccountLimit: async () => {
    const response = await appAxios.get<APIResponse<BlogMerchantAccountLimitData>>(
      `/blog-preferences/merchant-count`
    );
    return response.data;
  },

  updateBlogMerchantAccountLimit: async (params:{
    id: string,
    data: UpdateBlogMerchantAccountLimitRequest
  }) => {
    const response = await appAxios.put<APIResponse<BlogMerchantAccountLimitData>>(
      `/blog-preferences/merchant-count/${params.id}`,
      params.data
    );
    return response.data;
  }
}

export default blogPreferenceApiService