import { z } from 'zod';
import { permissions } from '@/data/permissions-list';

export type PermissionConfigItem = {
  name: string;
  title: string;
  permissions: readonly string[];
  subMenu?: readonly PermissionConfigItem[];
};

// Helper to extract keys recursively from the readonly configuration
type ExtractPermissionNames<T> = T extends readonly (infer U)[]
  ? ExtractPermissionNames<U>
  : T extends { name: infer N; subMenu?: infer S }
    ? N | ExtractPermissionNames<S>
    : never;

export type PermissionKey = ExtractPermissionNames<typeof permissions>;

// Helper to generate schema dynamically
const generatePermissionSchema = () => {
  const shape: Record<string, z.ZodTypeAny> = {};

  const processItem = (item: any) => {
    if (item.name && item.permissions) {
      // Ensure specific permissions are used if available, otherwise fallback
      const perms = item.permissions.length > 0 ? item.permissions : ['VIEW'];
      // z.enum requires at least one value. Using spread with casting to satisfy Zod's input requirements
      shape[item.name] = z.array(z.enum(perms as [string, ...string[]])).catch([]);
    }
    if (item.subMenu) {
      item.subMenu.forEach(processItem);
    }
  };

  permissions.forEach(processItem);
  return z.object(shape);
};

export const permissionSchema = generatePermissionSchema();

// We manually define PermissionData to ensure it uses the specific keys and not just 'string'
// Because inferred type from dynamic z.object might be too loose or generic
export type PermissionData = {
  [K in PermissionKey]: string[];
};
