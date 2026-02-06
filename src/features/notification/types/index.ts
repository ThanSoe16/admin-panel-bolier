import {
  NOTI_SETTING_TIME_UNITS_ENUM,
  NotificationEnum,
  STATUS_ENUM,
} from "@/features/base/types/backend-defined-enums";
import { z } from "zod";

export const notificationMetaSchema = z.object({
  willExpire: z.number(),
  renew: z.number(),
  expired: z.number(),
});

export type NotificationMetaData = z.infer<typeof notificationMetaSchema>;

export const notiSettingSchema = z.object({
  id: z.string(),
  time: z.number(),
  Schedule: z.enum(["FIRST", "SECOND", "THIRDD"]),
  Unit: z.nativeEnum(NOTI_SETTING_TIME_UNITS_ENUM),
  Status: z.nativeEnum(STATUS_ENUM),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type NotiSettingData = z.infer<typeof notiSettingSchema>;

export const updateSettingFormSchema = z.object({
  time: z
    .number()
    .int("Time must be an integer")
    .gt(0, "Time must be greater than 0"),
  unit: z.nativeEnum(NOTI_SETTING_TIME_UNITS_ENUM),
});

export type UpdateNotificationSettingRequest = z.infer<
  typeof updateSettingFormSchema
>;

export const hostingNotiSchema = z.object({
  userName: z.string(),
  hostingName: z.enum(["BASIC", "STANDARD"]),
  templateName: z.string(),
  blogName: z.string(),
  expiredAt: z.string(),
  renewalAt: z.string(),
  paymentStatus: z.enum(["VERIFIED"]),
  createdAt: z.string(),
  status: z.enum(["EXPIRED"]),
});

export type HostingNotiData = z.infer<typeof hostingNotiSchema>;

export const maintainNotiSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  templateName: z.string(),
  blogName: z.string(),
  expiredAt: z.string(),
  renewalAt: z.string(),
  paymentStatus: z.enum(["VERIFIED"]),
  createdAt: z.string(),
  status: z.enum(["EXPIRED"]),
});

export type MaintainNotiData = z.infer<typeof maintainNotiSchema>;

export const serverNotiSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  templateName: z.string(),
  blogName: z.string(),
  numOfBlog: z.number(),
  fee: z.number(),
  expiredAt: z.string(),
  renewalAt: z.string(),
  paymentStatus: z.enum(["VERIFIED"]),
  createdAt: z.string(),
  status: z.enum(["EXPIRED"]),
});

export type ServerNotiData = z.infer<typeof serverNotiSchema>;

export const notificationCountSchema = z.object({
  expire_soon: z.number(),
  renew: z.number(),
  expired: z.number(),
});
export type NotificationCountData = z.infer<typeof notificationCountSchema>;

export const notificationDetailFilterSchema = z.object({
  type: z.nativeEnum(NotificationEnum),
  date: z.string().optional(),
});
export type NotificationDetailFilter = z.infer<
  typeof notificationDetailFilterSchema
>;
