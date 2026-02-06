import { z } from 'zod';

export const landingLanguageSchema = z.object({
  id: z.string(),
  fileId: z.string(),
  name: z.string(),
  key: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string(),
  updatedAt: z.string(),
  File: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type LandingLanguage = z.infer<typeof landingLanguageSchema>;
