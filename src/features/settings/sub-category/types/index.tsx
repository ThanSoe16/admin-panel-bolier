import { categorySchema } from '@/features/settings/category/types';
import { z } from 'zod';

export const subCategoryTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  templateSubCategoryId: z.string(),
  languageId: z.string(),
});
export type SubCategoryTemplateData = z.infer<typeof subCategoryTemplateSchema>;
export const subCategorySchema = z.object({
  id: z.string(),
  index: z.number(),
  Status: z.enum(['ACTIVE', 'INACTIVE']),
  templateCategoryId: z.string(),
  createdById: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  TemplateSubCategoryContent: z.array(subCategoryTemplateSchema),
  TemplateCategory: categorySchema,
});

export type SubCategoryData = z.infer<typeof subCategorySchema>;

export const subCategoryFilterSchema = z.object({
  word: z.string().optional(),
  pageIndex: z.number().optional(),
  rowPerPage: z.number().optional(),
  categoryId: z.string().optional(),
});

export type SubCategoryFilter = z.infer<typeof subCategoryFilterSchema>;
export const createSubCategorySchema = z.object({
  templateCategoryId: z.string().min(1, { message: 'Category is Required' }),
  items: z.array(
    z.object({
      langId: z.string().min(1, { message: 'Language is Required' }),
      name: z
        .string()
        .transform((val) => val.trim())
        .refine((val) => val.length > 0, {
          message: 'Sub Category Name must be at least 1 character',
        }),
    }),
  ),
});

export type CreateSubCategoryRequest = z.infer<typeof createSubCategorySchema>;
export const updateSubCategorySchema = z.object({
  id: z.string(),
  templateCategoryId: z.string().min(1, { message: 'Category is Required' }),
  items: z.array(
    z.object({
      langId: z.string().min(1, { message: 'Language is Required' }),
      name: z
        .string()
        .transform((val) => val.trim())
        .refine((val) => val.length > 0, {
          message: 'Sub Category Name must be at least 1 character',
        }),
    }),
  ),
});

export type UpdateSubCategoryRequest = z.infer<typeof updateSubCategorySchema>;
export const orderSubCategorySchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      index: z.number(),
    }),
  ),
});

export type OrderSubCategoryRequest = z.infer<typeof orderSubCategorySchema>;
