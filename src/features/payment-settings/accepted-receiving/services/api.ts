import appAxios from "@/lib/appAxios";
import {
  APIResponse,
  DateFilter,
  PaginationFilter,
} from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import {
  AcceptedReceivingPaymentData,
  CreateReceivingPaymentRequest,
  ReceivingAccountConfigData,
  UpdateReceivingPaymentRequest,
} from "../types";

const acceptedReceivingApiService = {
  getReceivingPayment: async (filter: PaginationFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<
      APIResponse<AcceptedReceivingPaymentData[]>
    >(`membership-admin/get-accepted-payment-method?${params}`);
    return response.data;
  },
  createAcceptedReceivingMethod: async (req: CreateReceivingPaymentRequest) => {
    const response = await appAxios.post<
      APIResponse<AcceptedReceivingPaymentData>
    >(`membership-admin/create-accepted-payment-method`, req);
    return response.data;
  },
  updateAcceptedReceivingMethod: async (req: UpdateReceivingPaymentRequest) => {
    const { id, ...rest } = req;
    const response = await appAxios.put<
      APIResponse<AcceptedReceivingPaymentData>
    >(`membership-admin/update-accepted-payment-method/${id}`, rest);
    return response.data;
  },
  toggleAcceptedReceivingStatus: async (id: string) => {
    const response = await appAxios.patch<
      APIResponse<AcceptedReceivingPaymentData>
    >(`membership-admin/toggle-accepted-payment-method-by-id/${id}`);
    return response.data;
  },
  getReceivingAccountConfig: async () => {
    const response = await appAxios.get<
      APIResponse<ReceivingAccountConfigData>
    >(`membership-admin/get-membership-receiving-account-config`);
    return response.data;
  },
  updateReceivingAccountConfig: async (maxReceivingAccount: number) => {
    const response = await appAxios.patch<
      APIResponse<ReceivingAccountConfigData>
    >(`membership-admin/update-membership-receiving-account-config`, {
      maxReceivingAccount,
    });
    return response.data;
  },
};

export default acceptedReceivingApiService;
