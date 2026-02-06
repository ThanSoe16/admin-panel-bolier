import { fileUploadResponseSchema, templateCategorySchema } from '@/features/base/types';
import { z } from 'zod';

export const categoryTemplateSchema = templateCategorySchema;
export type CategoryTemplateData = z.infer<typeof categoryTemplateSchema>;

export const categorySchema = z.object({
  id: z.string(),
  index: z.number(),
  engName: z.string(),
  Status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdById: z.string(),
  Thumbnail: fileUploadResponseSchema,
  TemplateCategoryContent: z.array(categoryTemplateSchema),
});

export type CategoryData = z.infer<typeof categorySchema>;

export const categoryFilterSchema = z.object({
  word: z.string().optional(),
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
});

export type CategoryFilter = z.infer<typeof categoryFilterSchema>;

export const createCategorySchema = z.object({
  fileId: z.string().min(1, { message: 'Image is required' }),
  url: z.string().min(1, { message: 'Image is required' }),
  name: z.string().min(1, { message: 'Image is required' }),
  items: z.array(
    z.object({
      langId: z.string().min(1, { message: 'Language is required' }),
      name: z
        .string()
        .transform((val) => val.trim())
        .refine((val) => val.length > 0, {
          message: 'Category Name must be at least 1 character',
        }),
    }),
  ),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
export const updateCategorySchema = z.object({
  id: z.string().min(1, { message: 'Image is required' }),
  fileId: z.string().min(1, { message: 'Image is required' }),
  url: z.string().min(1, { message: 'Image is required' }),
  name: z.string(),
  items: z.array(
    z.object({
      langId: z.string().min(1, { message: 'Language is required' }),
      name: z
        .string()
        .transform((val) => val.trim())
        .refine((val) => val.length > 0, {
          message: 'Category Name must be at least 1 character',
        }),
    }),
  ),
});

export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;
export const orderCategorySchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      index: z.number(),
    }),
  ),
});

export type OrderCategoryRequest = z.infer<typeof orderCategorySchema>;
