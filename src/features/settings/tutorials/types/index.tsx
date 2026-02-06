import { z } from 'zod'
import { fileUploadResponseSchema } from '@/features/base/types';
import { TutorialsEnum } from '@/features/base/types/backend-defined-enums';
import { landingLanguageSchema } from '@/features/landing-languages/types';

export const tutorialsFilter = z.object({
  type:z.nativeEnum(TutorialsEnum)
})
export type TutorialsFilter = z.infer<typeof tutorialsFilter>;

export const tutorialSchema = z.object({
  id: z.string(),
  Status: z.string(),
  VideoType: z.string(),
  videoLink: z.string(),
  videoId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  adminId: z.string(),
  Video: fileUploadResponseSchema,
  Admin: z.object({ id: z.string(), name: z.string() }),
  TutorialContent: z.array(
    z.object({
      id: z.string(),
      tutorialVideoId: z.string(),
      name: z.string(),
      description: z.string(),
      languageId: z.string(),
      Language: landingLanguageSchema
    })
  )
});

export type TutorialData = z.infer<typeof tutorialSchema>;

export const createTutorialSchema = z.object({
  VideoType: z.nativeEnum(TutorialsEnum),
  videoLink: z.string(),
  videoId: z.string(),
  TutorialContent: z.array(
    z.object({
      languageId: z.string(),
      name: z.string(),
      description: z.string()
    })
  )
});

export type CreateTutorialRequest = z.infer<typeof createTutorialSchema>;

export const updateTutorialSchema = createTutorialSchema.extend({
  TutorialContent: z.array(
    z.object({
      id:z.string(),
      languageId: z.string(),
      name: z.string(),
      description: z.string()
    })
  )
})

export type UpdateTutorialRequest = z.infer<typeof updateTutorialSchema>;