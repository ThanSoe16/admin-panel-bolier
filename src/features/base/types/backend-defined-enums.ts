import { z } from 'zod';

export enum TemplateSocialStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum FAQTypesEnum {
  PURCHASING_DOMAINS = 'PURCHASING_DOMAINS',
  EXPIRED_DOMAINS = 'EXPIRED_DOMAINS',
  PAYMENT = 'PAYMENT',
  OTHERS = 'OTHERS',
}

export enum TemplateStatusEnum {
  PENDING = 'PENDING',
  REVIEW = 'REVIEW',
  READY = 'READY',
  LAUNCH = 'LAUNCH',
  UNLAUNCH = 'UNLAUNCH',
}

export enum ScreenKeysEnum {
  LAPTOP = 'laptop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

export enum TutorialsEnum {
  LANDING = 'LANDING',
  PURCHASED_TEMPLATE = 'PURCHASED_TEMPLATE',
}

export enum NotificationEnum {
  EXPIRING = 'expiring',
  RENEW = 'renew',
  EXPIRED = 'expired',
}
// export enum LandingLanguageEnum {
//   ENGLISH = "en",
//   MYANMAR = "my",
//   CHINESE = "ch",
// }

export const landingLanguageSchema = z.object({
  id: z.string(),
  name: z.string(),
  keey: z.string(),
  fileId: z.string(),
  File: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export enum STATUS_ENUM {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum NOTI_SETTING_TIME_UNITS_ENUM {
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  MONTHS = 'MONTHS',
}

export enum RegistrationTermsConditionsTypeEnum {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}
