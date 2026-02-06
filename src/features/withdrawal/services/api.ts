import { objectToQueryString } from "@/utils/objectToQueryString";
import appAxios from "@/lib/appAxios";
import {
  APIResponse,
  APISResponse,
  PaginationFilter,
} from "@/features/base/types";
import {
  ApproveWithdrawalRequestRequest,
  RejectWithdrawalRequestRequest,
  UpdateWithdrawalSettingRequest,
  WithdrawalHistoryData,
  WithdrawalRequestData,
  WithdrawalRequestDetailData,
  WithdrawalSettingData,
} from "../types";

const withdrawalApiService = {
  getWithdrawalHistory: async (filter: PaginationFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<WithdrawalRequestData[]>>(
      `/admin-withdraw/get-withdraw-history-list?${params}`
    );
    return response.data;
  },
  getWithdrawalHistoryById: async (id: string) => {
    const response = await appAxios.get<
      APISResponse<WithdrawalRequestDetailData>
    >(`/admin-withdraw/get-withdraw-history-detail/${id}`);
    return response.data;
  },
  getWithdrawalRequests: async (filter: PaginationFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<WithdrawalRequestData[]>>(
      `/admin-withdraw/get-withdraw-request-list?${params}`
    );
    return response.data;
  },
  getWithdrawalRequestById: async (id: string) => {
    const response = await appAxios.get<
      APISResponse<WithdrawalRequestDetailData>
    >(`/admin-withdraw/get-withdraw-request-detail/${id}`);
    return response.data;
  },
  approveWithdrawalRequest: async (data: ApproveWithdrawalRequestRequest) => {
    const response = await appAxios.patch<
      APISResponse<WithdrawalRequestDetailData>
    >(`/admin-withdraw/approve-onesite-user-withdraw-request/${data.id}`, {
      paymentProofId: data.paymentProofId,
    });
    return response.data;
  },
  rejectWithdrawalRequest: async (data: RejectWithdrawalRequestRequest) => {
    const response = await appAxios.patch<
      APISResponse<WithdrawalRequestDetailData>
    >(`/admin-withdraw/reject-onesite-user-withdraw-request/${data.id}`, {
      reason: data.reason,
    });
    return response.data;
  },
  getWithdrawalSetting: async () => {
    const response = await appAxios.get<APIResponse<WithdrawalSettingData>>(
      `/membership-admin/get-withdraw-settings`
    );
    return response.data;
  },
  updateWithdrawalSetting: async (data: UpdateWithdrawalSettingRequest) => {
    const updatedData = {
      monthlyWithdrawDate: parseInt(data.monthlyWithdrawDate),
      monthlyWithdrawLimit: parseInt(data.monthlyWithdrawLimit),
      dailyTransactionLimit: parseInt(data.dailyTransactionLimit),
    };
    const response = await appAxios.patch<APIResponse<WithdrawalRequestData>>(
      `/membership-admin/update-withdraw-setting`,
      updatedData
    );
    return response.data;
  },
};
export default withdrawalApiService;
