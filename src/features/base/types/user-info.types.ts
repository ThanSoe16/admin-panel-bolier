import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  username: z.string(),
  temporary_token: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserData = z.infer<typeof userSchema>;
