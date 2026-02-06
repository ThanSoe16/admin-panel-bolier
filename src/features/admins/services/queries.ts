import { useQuery } from '@tanstack/react-query';
import adminsApiService from './api';
import { AdminFilter, RoleFilter } from '../types';

export const useGetRoles = (filter: RoleFilter) => {
  return useQuery({
    queryKey: ['roles', filter],
    queryFn: () => adminsApiService.getRolesPermissions(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetRoleDetail = (id: string) => {
  return useQuery({
    queryKey: ['role-detail', id],
    queryFn: () => adminsApiService.getRolesPermissionDetail(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetAdmins = (filter: AdminFilter) => {
  return useQuery({
    queryKey: ['admins', filter],
    queryFn: () => adminsApiService.getAdmins(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetAdminDetail = (id: string) => {
  return useQuery({
    queryKey: ['admin-detail', id],
    queryFn: () => adminsApiService.getAdminDetail(id),
    refetchOnWindowFocus: false,
  });
};
