import { landingLanguageSchema } from "@/features/base/types/backend-defined-enums";
import { z } from "zod";

const contentSchema = z.object({
  id: z.string(),
  mainTitle: z.string(),
  description: z.string(),
  socialTitle: z.string(),
  languageId: z.string(),
  Language: landingLanguageSchema,
})

export const contactSchema = z.object({
  id: z.string(),
  office: z.string(),
  email: z.string(),
  phoneNumbers: z.array(z.string()),
  operationHours: z.string(),
  ContactUsContent: z.array(contentSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ContactUSType = z.infer<typeof contactSchema>;

const updateContentSchema = z.object({
  id: z.string(),
  mainTitle: z.string().min(3, { message: "Main Title must be at least 3 characters" }),
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  socialTitle: z.string().min(3, { message: "Social Title must be at least 3 characters" }),
})

export const updateContactUsSchema = contactSchema.pick({
  office: true,
  email: true,
  phoneNumbers: true,
  operationHours: true,
}).extend({
  office: z.string({message: "Office is required"}).min(3, { message: "Office must be at least 3 characters" }).max(255, { message: "Office must be at most 255 characters" }),
  email: z.string({message: "Email is required"}).email({message: "Invalid Email Format"}),
  phoneNumbers: z.string({message: "Phone Number is required"}).min(3, { message: "Phone Number must be at least 8 characters" }),
  operationHours: z.string({message: "Operation Hours is required"}).min(3, { message: "Operation Hours must be at least 3 characters" }).max(255, { message: "Operation Hours must be at most 255 characters" }),
  contents: z.array(updateContentSchema),
});

export type UpdateContactUSType = z.infer<typeof updateContactUsSchema>;

export const updateContactApiSchema = updateContactUsSchema.omit({
  phoneNumbers: true,
}).extend({
  phoneNumbers: z.array(z.string().min(1, { message: "Phone Number must be at least 8 characters" })),
})

export type UpdateContactApiType = z.infer<typeof updateContactApiSchema>;