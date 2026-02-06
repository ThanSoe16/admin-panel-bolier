import z from 'zod';

export const otpSettingsSchema = z.object({
  id: z.string(),
  expireTime: z.number(),
  expireUnit: z.enum(['MINUTE', 'HOUR']),
  maxRetry: z.number(),
  otpLockTime: z.number(),
  otpLockUnit: z.enum(['MINUTE', 'HOUR']),
  maxWrongAttempt: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OTPSettingsData = z.infer<typeof otpSettingsSchema>;

export const updateOTPSettingsSchema = z.object({
  expireTime: z.number(),
  expireUnit: z.enum(['MINUTE', 'HOUR']),
  maxRetry: z.number(),
  otpLockTime: z.number(),
  otpLockUnit: z.enum(['MINUTE', 'HOUR']),
  maxWrongAttempt: z.number(),
});
export type UpdateOTPSettingsRequest = z.infer<typeof updateOTPSettingsSchema>;
