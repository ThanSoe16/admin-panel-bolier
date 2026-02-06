import { objectToQueryString } from '@/utils/objectToQueryString';
import {
  UserData,
  UserDetailData,
  UserDomainData,
  UserDomainDetail,
  UserEarningHistoryData,
  UserEarningSummary,
  UserFilter,
  UserPurchasedBlog,
  UserPurchaseTemplatesData,
  UserTransaction,
} from '../types';
import appAxios from '@/lib/appAxios';
import { APIResponse, APISResponse } from '@/features/base/types';
import { WithdrawalHistoryData, WithdrawalRequestData } from '@/features/withdrawal/types';

const userApiService = {
  getUsers: async (filter: UserFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<UserData[]>>(`/users/users-list?${params}`);
    return response.data;
  },
  getUserDetail: async (id: string) => {
    const response = await appAxios.get<APISResponse<UserDetailData>>(`/users/user-detail/${id}`);
    return response.data;
  },
  getUserTransaction: async (filter: UserFilter) => {
    const { id, ...rest } = filter;
    const params = objectToQueryString(rest);
    const response = await appAxios.get<APIResponse<UserTransaction[]>>(
      `/users/user-transaction-list/${id}?${params}`,
    );
    return response.data;
  },
  getUserDomains: async (filter: UserFilter) => {
    const { id, ...rest } = filter;
    const params = objectToQueryString(rest);
    const response = await appAxios.get<APIResponse<UserDomainData[]>>(
      `/users/user-purchased-domains-list/${id}?${params}`,
    );
    return response.data;
  },
  getUserPurchasedTemplates: async (filter: UserFilter) => {
    const { id, ...rest } = filter;
    const params = objectToQueryString(rest);
    const response = await appAxios.get<APIResponse<UserPurchaseTemplatesData[]>>(
      `/users/user-purchased-templates-list/${id}?${params}`,
    );
    return response.data;
  },
  getUserPurchasedBlogs: async (filter: UserFilter) => {
    const { id, ...rest } = filter;
    const params = objectToQueryString(rest);
    const response = await appAxios.get<APIResponse<UserPurchasedBlog[]>>(
      `/users/user-purchased-blogs-list/${id}?${params}`,
    );
    return response.data;
  },
  getUserDomainsDetail: async (id: string) => {
    const response = await appAxios.get<APIResponse<UserDomainDetail>>(
      `/sales-history/domain-sale-detail/${id}`,
    );
    return response.data;
  },
  getUserEarningSummary: async (id: string) => {
    const response = await appAxios.get<APIResponse<UserEarningSummary>>(
      `/admin-withdraw/get-user-earning-summary/${id}`,
    );
    return response.data;
  },
  getUserWithdrawHistory: async (id: string) => {
    const response = await appAxios.get<APIResponse<WithdrawalRequestData[]>>(
      `/admin-withdraw/get-user-withdraw-history/${id}`,
    );
    return response.data;
  },
  getUserEarningHistory: async (id: string) => {
    const response = await appAxios.get<APIResponse<UserEarningHistoryData[]>>(
      `/admin-withdraw/get-user-earning-history/${id}`,
    );
    return response.data;
  },
};
export default userApiService;
