import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { TemplateSaleHistoryDetailResponse, TemplateSaleHistoryResponse } from "../types";
import { SaleHistoryFilter } from "../../types";

const templateSaleHistoryApiService = {
  getTemplateSaleHistory: async (filter: SaleHistoryFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<TemplateSaleHistoryResponse[]>>(
      `sales-history/template-sales?${params}`
    );
    return response.data;
  },
  getTemplateSaleHistoryDetails: async (params: {id: string}) => {
    const response = await appAxios.get<APIResponse<TemplateSaleHistoryDetailResponse>>(
      `manage-blog/template-sale-detail/${params?.id}`
    );
    return response.data;
  },
};

export default templateSaleHistoryApiService;
