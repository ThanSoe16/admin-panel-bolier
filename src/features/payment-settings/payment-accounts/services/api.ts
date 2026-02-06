import appAxios from "@/lib/appAxios";
import {
  APIResponse,
  PaginationFilter,
  PaginationSFilter,
} from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import {
  CreatePaymentAccountRequest,
  PaymentAccountData,
  UpdatePaymentAccountRequest,
} from "../types";
import { OrderCategoryRequest } from "@/features/settings/category/types";

const paymentAccountApiService = {
  getPaymentAccount: async (filter: PaginationSFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<PaymentAccountData[]>>(
      `membership-admin/get-payment-account?${params}`
    );
    return response.data;
  },
  createPaymentAccount: async (req: CreatePaymentAccountRequest) => {
    const response = await appAxios.post<APIResponse<PaymentAccountData>>(
      `membership-admin/create-payment-account`,
      req
    );
    return response.data;
  },
  updatePaymentAccount: async (req: UpdatePaymentAccountRequest) => {
    const { id, ...rest } = req;
    const response = await appAxios.put<APIResponse<PaymentAccountData>>(
      `membership-admin/update-payment-account/${id}`,
      rest
    );
    return response.data;
  },
  togglePaymentAccountStatus: async (id: string) => {
    const response = await appAxios.patch<APIResponse<PaymentAccountData>>(
      `membership-admin/toggle-payment-account-by-id/${id}`
    );
    return response.data;
  },
  orderPaymentAccount: async (data: OrderCategoryRequest) => {
    const response = await appAxios.put<APIResponse<PaymentAccountData[]>>(
      `/membership-admin/update-membership-payment-account-order`,
      data
    );
    return response.data;
  },
};

export default paymentAccountApiService;
