import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import {
  CategoryData,
  CategoryFilter,
  CreateCategoryRequest,
  OrderCategoryRequest,
  UpdateCategoryRequest,
} from "../types";
import { objectToQueryString } from "@/utils/objectToQueryString";

const categoryApiService = {
  getCategories: async (filter: CategoryFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<CategoryData[]>>(
      `/admin-settings/template-category/list?${params}`
    );
    return response.data;
  },
  createCategory: async (data: CreateCategoryRequest) => {
    const { ...rest } = data;
    const response = await appAxios.post<APIResponse<CategoryData[]>>(
      `/admin-settings/template-category/create`,
      rest
    );
    return response.data;
  },
  updateCategory: async (data: UpdateCategoryRequest) => {
    const { id, ...rest } = data;
    const response = await appAxios.put<APIResponse<CategoryData[]>>(
      `/admin-settings/template-category/update/${id}`,
      rest
    );
    return response.data;
  },
  toggleCategory: async (id: string) => {
    const response = await appAxios.patch<APIResponse<CategoryData[]>>(
      `/admin-settings/template-category/toggle/${id}`
    );
    return response.data;
  },
  orderCategory: async (data: OrderCategoryRequest) => {
    const response = await appAxios.patch<APIResponse<CategoryData[]>>(
      `/admin-settings/template-category/update-order`,
      data
    );
    return response.data;
  },
};
export default categoryApiService;
