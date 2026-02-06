import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  username: z.string(),
  temporary_token: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserData = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  full_name: z.string(),
  username: z.string(),
});
export type UpdateUserForm = z.infer<typeof updateUserSchema>;

// here are really used api, upper are for just sample but can't delete

export const loginSchema = z.object({
  loginId: z.string().min(1, { message: "Login ID is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const tokenSchema = z.object({
  id: z.string(),
  token: z.string(),
});
export type TokenData = z.infer<typeof tokenSchema>;

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

const PermissionSchema = z.object({
  id: z.string(),
  value: z.string(),
});

const AdminRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  permissions: z.array(PermissionSchema),
});

export const AdminSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  loginId: z.string(),
  adminRoleId: z.string(),
  avatarId: z.string().nullable(),
  AdminAccountStatus: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Avatar: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  AdminRole: AdminRoleSchema,
  encryptedPassword: z.string(),
  key: z.string(),
  iv: z.string(),
});

export type Admin = z.infer<typeof AdminSchema>;

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(12, { message: "Password must not exceed 12 characters" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Password must contain at least one special character",
  });

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password must match new password.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from the current password.",
    path: ["newPassword"],
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export const changePasswordAPISchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

export type ChangePasswordAPIPayload = z.infer<typeof changePasswordAPISchema>;
