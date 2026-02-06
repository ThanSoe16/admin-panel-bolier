import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { MaintainSaleHistoryDetailResponse, MaintainSaleHistoryResponse } from "../types";
import { SaleHistoryFilter } from "../../types";

const maintainSaleHistoryApiService = {
  getMaintainSaleHistory: async (filter: SaleHistoryFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<MaintainSaleHistoryResponse[]>>(
      `sales-history/maintain-fees-sales?${params}`
    );
    return response.data;
  },
  getMaintainSaleHistoryDetails: async (params: {id: string}) => {
    const response = await appAxios.get<APIResponse<MaintainSaleHistoryDetailResponse>>(
      `sales-history/maintain-fees-sales-detail/${params?.id}`
    );
    return response.data;
  },
};

export default maintainSaleHistoryApiService;
