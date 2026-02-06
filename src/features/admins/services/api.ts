import { APIResponse } from '@/features/base/types';
import appAxios from '@/lib/appAxios';
import {
  AdminData,
  AdminFilter,
  CreateAdminRequest,
  CreateRoleRequest,
  RoleData,
  RoleFilter,
  UpdateAdminRequest,
  UpdateRoleRequest,
} from '../types';
import { objectToQueryString } from '@/utils/objectToQueryString';

const adminsApiService = {
  getRolesPermissions: async (filter: RoleFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<RoleData[]>>(
      `role-and-permission/roles?${params}`,
    );
    return response.data;
  },
  getRolesPermissionDetail: async (id: string) => {
    const response = await appAxios.get<APIResponse<RoleData>>(`role-and-permission/roles/${id}`);
    return response.data;
  },
  createRolesPermissions: async (data: CreateRoleRequest) => {
    const response = await appAxios.post<APIResponse<RoleData>>('role-and-permission/roles', data);
    return response.data;
  },
  updateRolesPermissions: async (data: UpdateRoleRequest) => {
    const { id, ...rest } = data;
    const response = await appAxios.put<APIResponse<RoleData>>(
      `role-and-permission/roles/${data.id}`,
      rest,
    );
    return response.data;
  },
  getAdmins: async (filter: AdminFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<AdminData[]>>(`auth/admin/all?${params}`);
    return response.data;
  },
  getAdminDetail: async (id: string) => {
    const response = await appAxios.get<APIResponse<AdminData>>(`auth/admin/${id}`);
    return response.data;
  },
  createAdmin: async (data: CreateAdminRequest) => {
    const { profileUrl, ...rest } = data;
    const response = await appAxios.post<APIResponse<AdminData>>('auth/admin/create', rest);
    return response.data;
  },
  updateAdmin: async (data: UpdateAdminRequest) => {
    const { profileUrl, id, ...rest } = data;
    const response = await appAxios.patch<APIResponse<AdminData>>(`auth/admin/${id}`, rest);
    return response.data;
  },
};

export default adminsApiService;
