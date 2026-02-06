import {
  APIResponse,
  PaginationFilter,
  PaginationSFilter,
} from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import { objectToQueryString } from "@/utils/objectToQueryString";
import {
  TransactionFeeData,
  TransactionFeeHistoryData,
  TransactionHistoyFilter,
  UpdateTransactionFeeRequest,
  UpdateWithdrawFeeRequest,
  WithdrawFeeData,
  WithdrawHistoyFilter,
} from "../types";

const transactionFeeApiService = {
  getTransactionFee: async (filter: PaginationSFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<TransactionFeeData[]>>(
      `currency/get-transaction-fee-list?${params}`
    );
    return response.data;
  },
  updateTransactionFee: async (data: UpdateTransactionFeeRequest) => {
    const { id, ...rest } = data;
    const updatedData = { ...rest, amount: parseFloat(rest.amount) };
    const response = await appAxios.put<APIResponse<PaymentMethodData>>(
      `currency/update-transaction-fee/${id}`,
      updatedData
    );
    return response.data;
  },
  toggleTransactionFee: async (id: string) => {
    const response = await appAxios.patch<APIResponse<PaymentMethodData>>(
      `currency/toggle-transaction-fee/${id}`
    );
    return response.data;
  },
  getTransactionFeeHistory: async (filter: TransactionHistoyFilter) => {
    const { id, ...rest } = filter;
    const params = objectToQueryString(rest);
    const response = await appAxios.get<
      APIResponse<TransactionFeeHistoryData[]>
    >(`currency/get-transaction-fee-history/${id}?${params}`);
    return response.data;
  },
  getWithdrawFee: async () => {
    const response = await appAxios.get<APIResponse<WithdrawFeeData>>(
      `membership-admin/get-withdraw-fee-settings`
    );
    return response.data;
  },
  updateWithdrawFee: async (data: UpdateWithdrawFeeRequest) => {
    const updatedData = { ...data, amount: parseFloat(data.amount) };
    const response = await appAxios.patch<APIResponse<WithdrawFeeData>>(
      `membership-admin/update-withdraw-fee-setting`,
      updatedData
    );
    return response.data;
  },
  getWithdrawFeeHistory: async (filter: WithdrawHistoyFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<WithdrawFeeData[]>>(
      `membership-admin/get-withdraw-fee-history?${params}`
    );
    return response.data;
  },
};

export default transactionFeeApiService;
