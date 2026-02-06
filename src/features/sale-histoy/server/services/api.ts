import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { ServerSaleHistoryDetailResponse, ServerSaleHistoryResponse } from "../types";
import { SaleHistoryFilter } from "../../types";

const serverSaleHistoryApiService = {
  getServerSaleHistory: async (filter: SaleHistoryFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<ServerSaleHistoryResponse[]>>(
      `sales-history/server-fees-sales?${params}`
    );
    return response.data;
  },
  getServerSaleHistoryDetails: async (params: {id: string}) => {
    const response = await appAxios.get<APIResponse<ServerSaleHistoryDetailResponse>>(
      `sales-history/server-fees-sales-detail/${params?.id}`
    );
    return response.data;
  },
};

export default serverSaleHistoryApiService;
