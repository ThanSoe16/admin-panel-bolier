import { z } from 'zod';
import { permissionSchema } from './permission.type';
import { fileUploadResponseSchema, passwordSchema, phoneSchema } from '@/features/base/types';

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  permissions: permissionSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  Status: z.enum(['ACTIVE', 'INACTIVE']),
  userCount: z.number(),
});

export type RoleData = z.infer<typeof roleSchema>;

export const roleFilterSchema = z.object({
  word: z.string().optional(),
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
});

export type RoleFilter = z.infer<typeof roleFilterSchema>;

export const createRoleSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  permissions: permissionSchema,
});

export type CreateRoleRequest = z.infer<typeof createRoleSchema>;

export const updateRoleSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  permissions: permissionSchema,
  Status: z.enum(['ACTIVE', 'INACTIVE']),
});

export type UpdateRoleRequest = z.infer<typeof updateRoleSchema>;

export const adminSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  loginId: z.string(),
  permissions: permissionSchema,
  AdminAccountStatus: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string(),
  updatedAt: z.string(),
  avatarId: z.string(),
  Avatar: fileUploadResponseSchema,
  adminRoleId: z.string(),
  AdminRole: roleSchema,
  encryptedPassword: z.string(),
  key: z.string(),
  iv: z.string(),
});

export type AdminData = z.infer<typeof adminSchema>;

export const adminFilterSchema = z.object({
  word: z.string().optional(),
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
  adminRoleId: z.string().optional(),
});

export type AdminFilter = z.infer<typeof adminFilterSchema>;

export const createAdminSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: phoneSchema,
  loginId: z.string().min(3, { message: 'Login ID is required' }),
  password: passwordSchema,
  adminRoleId: z.string().min(1, { message: 'Admin role is required' }),
  avatarId: z.string().optional(),
  profileUrl: z.string().optional(),
});

export type CreateAdminRequest = z.infer<typeof createAdminSchema>;

export const updateAdminSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  loginId: z.string().min(1, { message: 'Login ID is required' }),
  password: passwordSchema.optional(),
  adminRoleId: z.string().min(1, { message: 'Admin role is required' }),
  avatarId: z.string().optional().nullable(),
  profileUrl: z.string().optional(),
  AdminAccountStatus: z.enum(['ACTIVE', 'INACTIVE']),
});

export type UpdateAdminRequest = z.infer<typeof updateAdminSchema>;
