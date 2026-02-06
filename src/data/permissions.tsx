import {
  PermissionData,
  PermissionKey,
  PermissionConfigItem,
} from '@/features/admins/types/permission.type';
import { permissions as permissionsList } from './permissions-list';

export const permissions: readonly PermissionConfigItem[] = permissionsList;
export type { PermissionKey };

// Helper to generate default permissions structure (empty arrays)
const generateDefaults = (): PermissionData => {
  const defaults: any = {};

  const processItem = (item: any) => {
    if (item.name) {
      defaults[item.name] = [];
    }
    if (item.subMenu) {
      item.subMenu.forEach(processItem);
    }
  };

  permissions.forEach(processItem);
  return defaults as PermissionData;
};

// Helper to generate "all permissions" structure (all allowed actions enabled)
const generateAllEnabled = (): PermissionData => {
  const all: any = {};

  const processItem = (item: any) => {
    if (item.name && item.permissions) {
      all[item.name] = [...item.permissions];
    }
    if (item.subMenu) {
      item.subMenu.forEach(processItem);
    }
  };

  permissions.forEach(processItem);
  return all as PermissionData;
};

export const allDefaultPermissions: PermissionData = generateDefaults();
export const allPermissionsDefaults: PermissionData = generateAllEnabled();
