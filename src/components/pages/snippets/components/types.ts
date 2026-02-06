import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().url(),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = z.object({
  name: z.string({message: "Name is required"}),
  email: z.string({message: "Email is required"}).email(),
  image: z.string({message: "Image is required"}).url(),
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema

export type UpdateUser = z.infer<typeof updateUserSchema>;