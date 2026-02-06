import { z } from 'zod';

export const userReportListSchema = z.object({
  id: z.string(),
  oneSiteUserId: z.string(),
  generatedAccountId: z.string(),
  username: z.string(),
  email: z.string(),
  status: z.string(),
  joinData: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  date: z.string(),
  month: z.string(),
  count: z.number(),
});

export type UserReportListData = z.infer<typeof userReportListSchema>;

export const userReportSchema = z.object({
  totalUsers: z.number(),
  newUsers: z.number(),
  userList: z.array(userReportListSchema),
});
export type UserReportResponse = z.infer<typeof userReportSchema>;
