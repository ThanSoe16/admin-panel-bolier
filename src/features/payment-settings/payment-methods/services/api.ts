import appAxios from "@/lib/appAxios";
import {
  APIResponse,
  APITResponse,
  PaginationFilter,
  PaginationSFilter,
} from "@/features/base/types";
import {
  CreatePaymentMethodRequest,
  PaymentMethodData,
  UpdatePaymentMethodRequest,
} from "../types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { OrderCategoryRequest } from "@/features/settings/category/types";

const paymentMethodApiService = {
  getPaymentMethod: async (filter: PaginationSFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<PaymentMethodData[]>>(
      `membership-admin/get-payment-method?${params}`
    );
    return response.data;
  },
  createPaymentMethod: async (req: CreatePaymentMethodRequest) => {
    const response = await appAxios.post<APIResponse<PaymentMethodData>>(
      `membership-admin/create-payment-method`,
      req
    );
    return response.data;
  },
  updatePaymentMethod: async (req: UpdatePaymentMethodRequest) => {
    const { id, ...rest } = req;
    const response = await appAxios.put<APIResponse<PaymentMethodData>>(
      `membership-admin/update-payment-method/${id}`,
      rest
    );
    return response.data;
  },
  togglePaymentMethodStatus: async (id: string) => {
    const response = await appAxios.patch<APIResponse<PaymentMethodData>>(
      `membership-admin/toggle-payment-method-by-id/${id}`
    );
    return response.data;
  },
  orderPaymentMethod: async (data: OrderCategoryRequest) => {
    const response = await appAxios.put<APIResponse<PaymentMethodData[]>>(
      `/membership-admin/update-membership-payment-method-order`,
      data
    );
    return response.data;
  },
};

export default paymentMethodApiService;
