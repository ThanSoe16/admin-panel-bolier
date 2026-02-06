import { z } from "zod";

export const ContactUsFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
  createdAt: z.string(),
});

export type ContactUsFormsType = z.infer<typeof ContactUsFormSchema>;
