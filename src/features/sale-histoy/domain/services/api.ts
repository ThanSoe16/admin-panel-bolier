import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { DomainSaleHistoryDetailResponse } from "../types";

const domainSaleHistoryApiService = {
  getdomainSaleHistoryDetails: async (params: {id: string}) => {
    const response = await appAxios.get<APIResponse<DomainSaleHistoryDetailResponse>>(
      `sales-history/domain-sale-detail/${params?.id}`
    );
    return response.data;
  },
};

export default domainSaleHistoryApiService;
