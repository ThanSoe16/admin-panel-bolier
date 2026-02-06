import Blog from "@/components/pages/users/details/components/Blog";
import { fileUploadResponseSchema } from "@/features/base/types";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  oneSiteUserId: z.string(),
  generatedAccountId: z.string(),
  username: z.string(),
  email: z.string(),
  image: z.string(),
  status: z.string(),
  joinData: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserData = z.infer<typeof userSchema>;

export const userFilterSchema = z.object({
  search: z.string().optional(),
  rowPerPage: z.number().optional(),
  pageIndex: z.number().optional(),
  id: z.string().optional(),
});

export type UserFilter = z.infer<typeof userFilterSchema>;

const customerDetailSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  generated_account_id: z.string(),
  status: z.boolean(),
  online_status: z.boolean(),
  image: z.string(),
  gender: z.null(),
  verify_status: z.string(),
  loginAt: z.string(),
  blockAt: z.null(),
  unBlockAt: z.null(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type CustomerDetailData = z.infer<typeof customerDetailSchema>;

export const userDomainSchema = z.object({
  id: z.number(),
  customer_id: z.string(),
  new_owner_id: z.null(),
  domain_name: z.string(),
  uni_domain: z.string(),
  sub_domain: z.null(),
  status: z.boolean(),
  domain_UUID: z.string(),
  domain_connect_to_project: z.string(),
  domain_registration_from_project: z.string(),
  domain_accept: z.string(),
  already_domain_status: z.string(),
  domain_publish_status: z.string(),
  domain_expired: z.string(),
  expired_at: z.string(),
  renew_at: z.null(),
  createdAt: z.string(),
  updatedAt: z.string(),
  transactionNo: z.string(),
});

export type UserDomainData = z.infer<typeof userDomainSchema>;

export const userPurchaseTemplatesSchema = z.object({
  id: z.string(),
  oneSiteUserId: z.string(),
  templateId: z.string(),
  price: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Template: z.object({
    id: z.string(),
    name: z.string(),
    folderName: z.null(),
    templateUrl: z.string(),
    price: z.number(),
    colors: z.array(
      z.object({
        name: z.string(),
        colorCode: z.array(z.object({ code: z.string(), name: z.string() })),
      }),
    ),
    templateCode: z.string(),
    laptopThumbId: z.string(),
    tabletThumbId: z.string(),
    mobileThumbId: z.string(),
    perks: z.array(z.string()),
    templateCategoryId: z.string(),
    Status: z.string(),
    favorites: z.number(),
    copyright: z.string(),
    createdAt: z.string(),
    uploadedAt: z.string(),
    uploadedById: z.string(),
    updatedAt: z.string(),
    createdById: z.string(),
    updatedById: z.null(),
    LaptopThumb: fileUploadResponseSchema,
    TemplateCategory: z.object({
      id: z.string(),
      index: z.number(),
      Status: z.string(),
      createdById: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      thumbnailId: z.string(),
      TemplateCategoryContent: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          templateCategoryId: z.string(),
          languageId: z.string(),
        }),
      ),
    }),
    TemplateOnTemplateSubCategory: z.array(
      z.object({
        TemplateSubCategory: z.object({
          TemplateSubCategoryContent: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              templateSubCategoryId: z.string(),
              languageId: z.string(),
            }),
          ),
        }),
      }),
    ),
  }),
});

export type UserPurchaseTemplatesData = z.infer<
  typeof userPurchaseTemplatesSchema
>;

export const userPurchasedBlogSchema = z.object({
  id: z.string(),
  oneSiteUserId: z.string(),
  name: z.string(),
  panelDomain: z.string(),
  imageId: z.null(),
  templateId: z.string(),
  oneSiteUserPurchasedTemplateId: z.string(),
  MerchantBlogStatus: z.string(),
  publishedAt: z.null(),
  achieveDate: z.null(),
  permanentlyDeletedDate: z.null(),
  createdAt: z.string(),
  updatedAt: z.string(),
  previewDomain: z.null(),
  blogDomain: z.null(),
  isCustomDomain: z.boolean(),
  BlogNameAndLogo: z.array(z.object({ name: z.string() })),
});

export type UserPurchasedBlog = z.infer<typeof userPurchasedBlogSchema>;

export const userDetailSchema = z.object({
  balance: z.string(),
  customer: customerDetailSchema,
  domains: z.array(userDomainSchema),
  customerPurchasedTemplates: z.array(userPurchaseTemplatesSchema),
  customerBlogs: z.array(userPurchasedBlogSchema),
});

export type UserDetailData = z.infer<typeof userDetailSchema>;

export const FeeTypeEnum = z.enum([
  "TEMPLATE_PURCHASE",
  "MAINTENANCE_FEE",
  "SERVER_FEE",
  "HOSTING_FEE",
  "SERVICE_FEE",
  "CREATE_BLOG",
  "DOMAIN_REGISTRATION",
  "DOMAIN_RENEWAL",
]);
export type FeeType = z.infer<typeof FeeTypeEnum>;

export const transactionSchema = z.object({
  id: z.string(),
  oneSiteUserId: z.string(),
  FeeType: FeeTypeEnum,
  content: z.string(),
  PaymentStatus: z.enum(["SUCCESSFUL", "FAILED"]),
  total: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserTransaction = z.infer<typeof transactionSchema>;

export const userDomainDetailSchema = z.object({
  transactionNo: z.string(),
  domainName: z.string(),
  purchasedFrom: z.string(),
  inUse: z.boolean(),
  domainPurchasedType: FeeTypeEnum,
  linkedStatus: z.boolean(),
  expiredAt: z.string(),
  registeredAt: z.string(),
  currentRenewalPrice: z.number(),
  subTotal: z.number(),
  serviceFee: z.number(),
  totalPrice: z.number(),
  username: z.string(),
  email: z.string(),
  paymentStatus: z.string(),
  paymentDate: z.string(),
});

export type UserDomainDetail = z.infer<typeof userDomainDetailSchema>;

export const userReceivingAccountSchema = z.object({
  id: z.string(),
  isDefault: z.boolean(),
  accountName: z.string(),
  accountNumber: z.string(),
  qrId: z.null(),
  onesiteUserId: z.string(),
  acceptedReceivingAccountId: z.string(),
  Status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  AcceptedReceivingAccount: z.any(),
  QR: fileUploadResponseSchema,
});

export type UserReceivingAccountData = z.infer<
  typeof userReceivingAccountSchema
>;

export const userEarningSummarySchema = z.object({
  totalEarning: z.number(),
  netEarn: z.number(),
});
export type UserEarningSummary = z.infer<typeof userEarningSummarySchema>;

export const userEarningHistorySchema = z.object({
  subscriberId: z.string(),
  subscriberName: z.string(),
  subscriberEmail: z.string(),
  blogId: z.string(),
  blogDomain: z.string(),
  planName: z.string(),
  subscribedAt: z.string(),
  totalEarned: z.number(),
  exchangeRate: z.number(),
  trxFee: z.number(),
  netEarned: z.number(),
  paidWith: z.string(),
  paymentMethodFile: z.object({
    url: z.string(),
  }),
});
export type UserEarningHistoryData = z.infer<typeof userEarningHistorySchema>;
