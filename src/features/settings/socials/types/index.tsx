import { z } from 'zod';

export const socialLinkSchema = z.object({
  id: z.string(),
  name: z.string(),
  sortingNumber: z.number(),
  fileId: z.string(),
  linkAddress: z.string(),
  Status: z.string(),
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

export type SocialLinksType = z.infer<typeof socialLinkSchema>;

export const socailLinkFormSchema = z.object({
  name: z.string(),
  fileId: z.string(),
  linkAddress: z.string(),
  status: z.string(),
  id: z.string().optional(),
});

export type SocialLinksForm = z.infer<typeof socailLinkFormSchema>;

export const socialLinkDragSchema = z.object({
  id1: z.string(),
  id2: z.string(),
});
export type SocialLinksDragType = z.infer<typeof socialLinkDragSchema>;

export const socialLinkIconSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SocialLinkIconsType = z.infer<typeof socialLinkIconSchema>;
