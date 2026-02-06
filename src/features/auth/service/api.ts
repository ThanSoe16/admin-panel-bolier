import { APIResponse } from '@/features/base/types';
import { Admin, ChangePasswordAPIPayload, LoginForm, LoginResponse } from './../types/index';
import appAxios from '@/lib/appAxios';

const authApiService = {
  login: async (data: LoginForm) => {
    const response = await appAxios.post<APIResponse<LoginResponse>>('/auth/admin/login', data);
    return response.data;
  },

  getMe: async () => {
    const response = await appAxios.get<APIResponse<Admin>>('/auth/admin/whoami');
    return response.data;
  },

  changePassword: async (data: ChangePasswordAPIPayload) => {
    const response = await appAxios.patch<APIResponse<Admin>>('/auth/admin/change-password', data);
    return response.data;
  },

  // getUsers: async (page = 1) => {
  //   const response = await appAxios.get<APIResponse<TokenData[]>>(
  //     `/users?page=${page}&page_size=10`
  //   );
  //   return response.data;
  // },

  // getProducts: async ({ pageParam }: { pageParam: number }) => {
  //   const response = await appAxios.get<APIResponse<TokenData[]>>(
  //     `/products?page=${pageParam + 1}&page_size=10`
  //   );
  //   return response.data;
  // },

  // getUserData: async () => {
  //   const response = await appAxios.get<APIResponse<TokenData>>("/user");
  //   return response.data;
  // },

  // getUserDetail: async () => {
  //   const response = await appAxios.get<APIResponse<TokenData>>("/user");
  //   return response.data;
  // },

  // updateUser: async (id: string, data: UpdateUserForm) => {
  //   const response = await appAxios.put<APIResponse<UserData>>(
  //     `/user/${id}`,
  //     data
  //   );
  //   return response.data;
  // },

  // deleteUser: async (id: string) => {
  //   const response = await appAxios.delete<APIResponse<UserData>>(
  //     `/user/${id}`
  //   );
  //   return response.data;
  // },
};

export default authApiService;
