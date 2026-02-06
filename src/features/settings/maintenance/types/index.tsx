import { z } from 'zod';
import { landingLanguageSchema } from '@/features/landing-languages/types';

export const maintenanceContentSchema = z.object({
  id: z.string(),
  message: z.string(),
  languageId: z.string(),
  Language: landingLanguageSchema,
});
export type MaintenanceContent = z.infer<typeof maintenanceContentSchema>;

export const maintenanceSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  lastMaintenanceAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  MaintenanceContent: z.array(maintenanceContentSchema),
});

export type MaintenanceDataResponse = z.infer<typeof maintenanceSchema>;

export const updateMaintenanceDataSchema = z.object({
  id: z.string(),
  message: z.string().min(3, { message: 'Description must be at least 3 characters' }),
});
export type UpdateMaintenanceData = z.infer<typeof updateMaintenanceDataSchema>;

export const updateMaintenanceSchema = z.object({
  MaintenanceContent: z.array(updateMaintenanceDataSchema),
});
export type UpdateMaintenanceRequest = z.infer<typeof updateMaintenanceSchema>;
