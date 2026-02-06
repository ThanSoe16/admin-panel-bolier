import { TemplateStatusEnum } from "@/features/base/types/backend-defined-enums";
import { z } from "zod";
import { fileUploadResponseSchema } from "@/features/base/types";
import { categorySchema } from "@/features/settings/category/types";

const colorSchema = z.object({
  name: z.string(),//theme name or something
  colorCode: z.array(z.object({
    name: z.string(),
    code: z.string(),
  }))
})

export const pendingTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  folderName: z.string().nullable(),
  templateUrl: z.string(),
  price: z.number(),
  colors: z.array(colorSchema),
  templateCode: z.string(),
  laptopThumbId: z.string(),
  tabletThumbId: z.string(),
  mobileThumbId: z.string(),
  perks: z.array(z.string()),
  templateCategoryId: z.string(),
  Status: z.nativeEnum(TemplateStatusEnum),
  favorites: z.number(),
  copyright: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdById: z.string(),
  updatedById: z.string().nullable(),
  LaptopThumb: fileUploadResponseSchema,
  CreatedBy: z.object({
    id: z.string(),
    name: z.string()
  }),
  TemplateCategory: categorySchema,
  TemplatePreviews: z.array(z.object({
    index: z.number(),
    pages: z.array(z.object({
      page_name: z.string(),
      languageId: z.string()
    })),
    thumbnail: z.object({
      laptop: fileUploadResponseSchema,
      tablet: fileUploadResponseSchema,
      mobile: fileUploadResponseSchema
    })
  }))
})

export type PendingTemplateData = z.infer<typeof pendingTemplateSchema>

export const pendingTemplatesFilterSchema = z.object({
  pageIndex: z.number(),
  rowPerPage: z.number(),
})

export type PendingTemplatesFilter = z.infer<typeof pendingTemplatesFilterSchema>;

export const recentDevActivitySchema = z.object({
  templateCode: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  CreatedBy: z.object({
    id: z.string(),
    name: z.string(),
    Avatar: fileUploadResponseSchema
  })
});

export type RecentDevActivityData = z.infer<typeof recentDevActivitySchema>;


export const publishedTemplateSchema = pendingTemplateSchema.extend({
  UploadedBy: z.object({
    id: z.string(),
    name: z.string(),
    Avatar: fileUploadResponseSchema
  }),
  totalBuyers: z.number(),
});

export type PublishedTemplateData = z.infer<typeof publishedTemplateSchema>;

export const publishedTemplatesFilterSchema = z.object({
  search: z.string(),
  pageIndex: z.number(),
  rowPerPage: z.number(),
})

export type PublishedTemplatesFilter = z.infer<typeof publishedTemplatesFilterSchema>;