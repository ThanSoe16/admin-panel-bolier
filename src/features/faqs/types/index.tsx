import { FAQTypesEnum } from '@/features/base/types/backend-defined-enums';
import { landingLanguageSchema } from '@/features/landing-languages/types';
import { z } from 'zod';

export const faqSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(FAQTypesEnum),
  questionNumber: z.number(),
  FaqContent: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
      languageId: z.string(),
      faqId: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      Language: landingLanguageSchema,
    }),
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FAQData = z.infer<typeof faqSchema>;

export const faqFilterSchema = z.object({
  type: z.nativeEnum(FAQTypesEnum).optional(),
});

export type FAQFilterData = z.infer<typeof faqFilterSchema>;

export const createFAQSchema = z.object({
  type: z.nativeEnum(FAQTypesEnum),
  contents: z.array(
    z.object({
      question: z.string().min(1, 'Question is required'),
      answer: z.string().min(1, 'Answer is required'),
      languageId: z.string(),
    }),
  ),
});

export type CreateFAQRequest = z.infer<typeof createFAQSchema>;

export const updateFAQSchema = z.object({
  contents: z.array(
    z.object({
      id: z.string(),
      question: z.string().min(1, 'Question is required'),
      answer: z.string().min(1, 'Answer is required'),
      languageId: z.string(),
    }),
  ),
});

export type UpdateFAQRequest = z.infer<typeof updateFAQSchema>;
