import { z } from "zod";

// User Schema
const userSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  joinDate: z.string().datetime("Invalid date format"),
  status: z.enum(["Verified", "Pending", "Suspended"]),
});


// Template Schema
const templateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  id: z.string().min(1, "Template ID is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
});


// Fee Schema
const feeSchema = z.object({
  subTotal: z.number().min(0, "Subtotal must be positive"),
  total: z.number().min(0, "Total must be positive"),   
  invoiceNumber: z.string().min(1, "Invoice number is required"),
});


// Payment Schema
const paymentSchema = z.object({
  status: z.enum(["Successful", "Pending", "Failed", "Refunded"]),
  method: z.string().min(1, "Payment method is required"),
  date: z.string().datetime("Invalid date format"),
});


// Device Thumbnail
const deviceThumbnailSchema = z.object({
  type: z.enum(["Laptop", "Tablet", "Mobile"]),
  imageUrl: z.string().url("Invalid image URL"),
});


const TemplateSalesSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  thumbnails: z.array(deviceThumbnailSchema),
  user: userSchema,
  template: templateSchema,
  fee: feeSchema,
  payment: paymentSchema,
});

export type TemplateSalesType = z.infer<typeof TemplateSalesSchema>;

