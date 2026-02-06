import Cookies from 'js-cookie';
import { PermissionData } from '@/features/admins/types/permission.type';

const COOKIE_OPTIONS = {
  expires: 365 * 10, // 10 years
  secure: true,
  sameSite: 'lax',
} as const;

export const setAuthCookies = (accessToken: string, permissions?: string) => {
  Cookies.set('token', JSON.stringify(accessToken), COOKIE_OPTIONS);
  if (permissions) {
    Cookies.set('permissions', permissions, COOKIE_OPTIONS);
  }
};

export const clearAuthCookies = () => {
  Cookies.remove('token');
  Cookies.remove('permissions');
};
