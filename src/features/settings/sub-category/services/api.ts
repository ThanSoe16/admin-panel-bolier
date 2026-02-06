import { APIResponse } from '@/features/base/types';
import appAxios from '@/lib/appAxios';
import {
  CreateSubCategoryRequest,
  OrderSubCategoryRequest,
  SubCategoryData,
  SubCategoryFilter,
  UpdateSubCategoryRequest,
} from '../types';
import { objectToQueryString } from '@/utils/objectToQueryString';

const subCategoryApiService = {
  getSubCategories: async (filter: SubCategoryFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<SubCategoryData[]>>(
      `/admin-settings/template-sub-category/list?${params}`,
    );
    return response.data;
  },
  createSubCategory: async (data: CreateSubCategoryRequest) => {
    const { ...rest } = data;
    const response = await appAxios.post<APIResponse<SubCategoryData[]>>(
      `/admin-settings/template-sub-category/create`,
      rest,
    );
    return response.data;
  },
  updateSubCategory: async (data: UpdateSubCategoryRequest) => {
    const { id, ...rest } = data;
    const response = await appAxios.put<APIResponse<SubCategoryData[]>>(
      `/admin-settings/template-sub-category/update/${id}`,
      rest,
    );
    return response.data;
  },
  toggleSubCategory: async (id: string) => {
    const response = await appAxios.patch<APIResponse<SubCategoryData[]>>(
      `/admin-settings/template-sub-category/toggle/${id}`,
    );
    return response.data;
  },
  orderSubCategory: async (data: OrderSubCategoryRequest) => {
    const response = await appAxios.patch<APIResponse<SubCategoryData[]>>(
      `/admin-settings/template-sub-category/update-order`,
      data,
    );
    return response.data;
  },
};
export default subCategoryApiService;
