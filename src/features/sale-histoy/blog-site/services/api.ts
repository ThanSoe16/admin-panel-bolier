import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { BlogSiteSaleHistoryDetailResponse, BlogSiteSaleHistoryResponse } from "../types";
import { SaleHistoryFilter } from "../../types";

const blogsiteSaleHistoryApiService = {
  getBlogSiteSaleHistory: async (filter: SaleHistoryFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<BlogSiteSaleHistoryResponse[]>>(
      `sales-history/blog-site-sales?${params}`
    );
    return response.data;
  },
  getBlogSiteSaleHistoryDetails: async (params: {id: string}) => {
    const response = await appAxios.get<APIResponse<BlogSiteSaleHistoryDetailResponse>>(
      `sales-history/blog-site-sale-detail/${params?.id}`
    );
    return response.data;
  },
};

export default blogsiteSaleHistoryApiService;
