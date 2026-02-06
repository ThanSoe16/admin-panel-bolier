import { z } from 'zod';

export const barChartCountSchema = z.object({
  templateCounts: z.number(),
  hostingCounts: z.number(),
  serverCounts: z.number(),
});
export type BarChartData = z.infer<typeof barChartCountSchema>;

export const popularCategorySchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  count: z.number(),
});
export type PopularCategoryData = z.infer<typeof popularCategorySchema>;

export const dashboardSchema = z.object({
  newUsers: z.number(),
  templateSales: z.number(),
  blogSiteSales: z.number(),
  totalIncome: z.number(),
  percentage: z.number(),
  trend: z.string(),
  barchart: barChartCountSchema,
  popularCategories: z.array(popularCategorySchema),
});
export type DashboardData = z.infer<typeof dashboardSchema>;
