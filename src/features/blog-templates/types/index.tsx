import { z } from "zod";
import { categorySchema } from "../../settings/category/types";
import { ScreenKeysEnum } from "../../base/types/backend-defined-enums";
import { publishedTemplateSchema } from "@/features/dev-mode/types";
import {
  fileUploadResponseSchema,
  oneSiteUserOrderSchema,
  oneSiteUserSchema,
} from "@/features/base/types";
import { blogLanguageSchema } from "@/features/blog-preferences/types";
import { subCategorySchema } from "@/features/sub-category/types";

export const thumbnailSchema = z.object({
  [ScreenKeysEnum.LAPTOP]: z
    .string({ required_error: "Required" })
    .min(1, { message: "Image is required" }),
  [ScreenKeysEnum.TABLET]: z
    .string({ required_error: "Required" })
    .min(1, { message: "Image is required" }),
  [ScreenKeysEnum.MOBILE]: z
    .string({ required_error: "Required" })
    .min(1, { message: "Image is required" }),
});

export type ThumbnailData = z.infer<typeof thumbnailSchema>;

export const blogTemplateSchema = publishedTemplateSchema;

export type BlogTemplateData = z.infer<typeof blogTemplateSchema>;

export const blogTemplatesFilterSchema = z.object({
  search: z.string(),
  category: z.string().optional(),
  pageIndex: z.number(),
  rowPerPage: z.number(),
});

export type BlogTemplatesFilter = z.infer<typeof blogTemplatesFilterSchema>;

export const templateByCategorySchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  totalTemplates: z.number(),
  totalUseCount: z.number(),
  totalSalesCount: z.number(),
});

export type TemplateByCategoryData = z.infer<typeof templateByCategorySchema>;

export const templateOverviewSchema = z.object({
  uploadedTemplates: z.number(),
  templatesInUse: z.number(),
  readyTemplates: z.number(),
  templateByCategories: z.array(templateByCategorySchema),
});

export type TemplateOverviewData = z.infer<typeof templateOverviewSchema>;

export const templateSaleListSchema = z.object({
  id: z.string(),
  userName: z.string(),
  price: z.number(),
  createdAt: z.string(),
  status: z.enum(["SUCCESSFUL", "FAILED"]),
});

export type TemplateSaleListData = z.infer<typeof templateSaleListSchema>;

// here is schema actually use

export const templatePagePreviewSchema = z.object({
  pages: z.array(
    z.object({
      languageId: z.string(),
      page_name: z.string().min(1, "Page Name is required"),
    })
  ),
  thumbnail: thumbnailSchema,
  imageUrls: thumbnailSchema, // to store just urls of images
});

export type TemplatePagePreviewData = z.infer<typeof templatePagePreviewSchema>;

export const pageMetaSchema = z.object({
  id: z.string(),
  name: z.string(),
  providedSection: z.array(z.enum(["TOP", "CENTER", "BOTTOM"])),
});

export const templateDetailsSchema = publishedTemplateSchema.extend({
  MobileThumb: fileUploadResponseSchema,
  TabletThumb: fileUploadResponseSchema,
  TemplateCategory: categorySchema,
  TemplateOnPerks: z.array(z.string()),
  TemplateOnTemplateLang: z.array(blogLanguageSchema),
  TemplateDescription: z.array(
    z.object({
      id: z.string(),
      languageId: z.string(),
      description: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  TemplateHighlight: z.array(
    z.object({
      id: z.string(),
      languageId: z.string(),
      highlight: z.string(),
      templateId: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  TemplateOnTemplateSubCategory: z.array(
    z.object({
      id: z.string(),
      TemplateSubCategory: subCategorySchema,
    })
  ),
  CreatedBy: z.object({
    id: z.string(),
    name: z.string(),
    Avatar: fileUploadResponseSchema,
  }),
  UploadedBy: z.object({
    id: z.string(),
    name: z.string(),
    Avatar: fileUploadResponseSchema,
  }),
  uploadedAt: z.string(),
  totalBuyers: z.number(),
  PageMeta: z.array(pageMetaSchema),
});

export type TemplateDetailsData = z.infer<typeof templateDetailsSchema>;

export const templateSetUpSchema = z.object({
  id: z.string(),
  code: z.string().optional(),
  thumbnail: thumbnailSchema,
  template_name: z.string().min(1, "Required"),
  template_url: z.string().min(1, "Required"),
  template_category_id: z.string({ required_error: "Required" }),
  template_sub_category_id: z
    .array(z.string())
    .min(1, "Please choose at least one sub category"),
  previews: z.array(templatePagePreviewSchema),
  price: z.any().refine((value) => Number(value) >= 1, "Price must be at least $1"),
  perks: z.array(z.string()).max(3, "Maximum 3 perks are allowed"),
  highlights: z.array(
    z.object({
      languageId: z.string(),
      highlight: z.string().min(1, "Highlight Text is required"),
    })
  ),
  descriptions: z.array(
    z.object({
      languageId: z.string(),
      description: z.string().min(1, "Main Description is required"),
    })
  ),
  copyright: z.string().min(1, "Required"),
  template_code: z.string().min(1, "Required"),
});

export type TemplateSetUpRequest = z.infer<typeof templateSetUpSchema>;

const previewWithoutImageUrls = templatePagePreviewSchema.omit({
  imageUrls: true,
});

export const templateSetUpApiPayloadSchema = templateSetUpSchema.extend({
  previews: z.array(previewWithoutImageUrls),
});

export type TemplateSetupApiPayload = z.infer<
  typeof templateSetUpApiPayloadSchema
>;

export const blogTemplateSaleHistorySchema = z.object({
  id: z.string(),
  OneSiteUser: oneSiteUserSchema,
  OneSiteUserOrder: z.array(oneSiteUserOrderSchema),
});

export type BlogTemplateSaleHistoryData = z.infer<
  typeof blogTemplateSaleHistorySchema
>;

export const BlogTemplateSaleHistoryFilterSchema = z.object({
  word: z.string(),
});

export type BlogTemplateSaleHistoryFilter = z.infer<
  typeof BlogTemplateSaleHistoryFilterSchema
>;

export const toggleTemplateStatusSchema = z.object({
  template_id: z.string(),
});

export type ToggleTemplateStatusRequest = z.infer<
  typeof toggleTemplateStatusSchema
>;
