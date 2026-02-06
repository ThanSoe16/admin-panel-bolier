import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { HostingSaleHistoryDetailResponse, HostingSaleHistoryResponse } from "../types";
import { SaleHistoryFilter } from "../../types";

const hostingSaleHistoryApiService = {
  getHostingSaleHistory: async (filter: SaleHistoryFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<HostingSaleHistoryResponse[]>>(
      `sales-history/hosting-fees-sales?${params}`
    );
    return response.data;
  },
  getHostingSaleHistoryDetails: async (params: {id: string}) => {
    const response = await appAxios.get<APIResponse<HostingSaleHistoryDetailResponse>>(
      `sales-history/hosting-fees-sales-detail/${params?.id}`
    );
    return response.data;
  },
};

export default hostingSaleHistoryApiService;
