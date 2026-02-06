import { PermissionKey } from "@/features/admins/types/permission.type";

export const routePermissionMap: {
  [path: string]: { module: PermissionKey; action: string };
} = {
  "/dashboard": { module: "dashboard", action: "VIEW" },
  "/users": { module: "users", action: "VIEW" },
  "/users/withdrawal-requests": {
    module: "withdrawal-requests",
    action: "VIEW",
  },
  "/users/withdrawal-requests/*": {
    module: "withdrawal-requests",
    action: "VIEW",
  },
  // "/membership/plans": { module: "membership-plans", action: "VIEW" },
  // "/membership/plans/*": { module: "membership-plans", action: "CREATE" },
  "/membership/feature-user-agreement": {
    module: "feature-user-agreement",
    action: "VIEW",
  },
  "/membership/feature-user-agreement/*": {
    module: "feature-user-agreement",
    action: "CREATE",
  },
  "/membership/tnc-plan": {
    module: "tnc-plan",
    action: "VIEW",
  },
  "/membership/tnc-plan/*": {
    module: "tnc-plan",
    action: "EDIT",
  },
  "/blog-templates": {
    module: "mgmt-blog-template",
    action: "VIEW",
  },
  "/blog-templates/*": {
    module: "mgmt-blog-template",
    action: "VIEW",
  },
  "/blog-templates/update": {
    module: "mgmt-blog-template",
    action: "EDIT",
  },
  "/dev-mode": {
    module: "dev-mode-blog-tpl",
    action: "VIEW",
  },
  "/dev-mode/setup": {
    module: "dev-mode-blog-tpl",
    action: "CREATE",
  },
  "/blog-preferences": {
    module: "blog-preferences",
    action: "VIEW",
  },
  "/contact-us": { module: "contact-us-forms", action: "VIEW" },
  "/payment-settings/payment-methods": {
    module: "payment-methods",
    action: "VIEW",
  },
  "/payment-settings/payment-accounts": {
    module: "payment-accounts",
    action: "VIEW",
  },
  "/payment-settings/blog-service-fee": {
    module: "blog-service-fee",
    action: "VIEW",
  },
  "/payment-settings/withdrawal-fee": {
    module: "withdrawal-fee",
    action: "VIEW",
  },
  "/payment-settings/accepted-receiving": {
    module: "accepted-receiving",
    action: "VIEW",
  },
  "/payment-settings/exchange-rate": {
    module: "exchange-rate",
    action: "VIEW",
  },
  "/payment-settings/exchange-rate/*": {
    module: "exchange-rate",
    action: "CREATE",
  },
  "/payment-settings/tnc-blog-service-fee": {
    module: "blog-service-fee-tnc",
    action: "VIEW",
  },
  "/sale-history/template-sales": { module: "template-sales", action: "VIEW" },
  "/sale-history/template-sales/*": {
    module: "template-sales",
    action: "VIEW",
  },
  "/sale-history/blog-site": { module: "blog-site-sales", action: "VIEW" },
  "/sale-history/blog-site/*": { module: "blog-site-sales", action: "VIEW" },
  "/sale-history/hosting": { module: "hosting-sales", action: "VIEW" },
  "/sale-history/hosting/*": { module: "hosting-sales", action: "VIEW" },
  "/sale-history/server": { module: "server-sales", action: "VIEW" },
  "/sale-history/server/*": { module: "server-sales", action: "VIEW" },
  "/sale-history/maintain": { module: "maintain-sales", action: "VIEW" },
  "/sale-history/maintain/*": { module: "maintain-sales", action: "VIEW" },
  "/service-fee/maintain": { module: "maintain-fee", action: "VIEW" },
  "/service-fee/maintain/update": { module: "maintain-fee", action: "EDIT" },
  "/service-fee/hosting": { module: "hosting-fee", action: "VIEW" },
  "/service-fee/hosting/update": { module: "hosting-fee", action: "EDIT" },
  "/service-fee/setup": { module: "setup-fee", action: "VIEW" },
  "/service-fee/setup/update": { module: "setup-fee", action: "EDIT" },
  "/invoice": { module: "user-invoice", action: "VIEW" },
  "/invoice/*": { module: "user-invoice", action: "VIEW" },
  "/invoice/create": { module: "user-invoice", action: "CREATE" },
  "/notifications/maintain": { module: "maintain-renew", action: "VIEW" },
  "/notifications/maintain/details": {
    module: "maintain-renew",
    action: "VIEW",
  },
  "/notifications/hosting": { module: "hosting-renew", action: "VIEW" },
  "/notifications/hosting/details": {
    module: "hosting-renew",
    action: "VIEW",
  },
  // "/notifications/server": { module: "server-renew", action: "VIEW" },
  // "/notifications/server/details": {
  //   module: "server-renew",
  //   action: "VIEW",
  // },
  "/admins/list": { module: "admin-list", action: "VIEW" },
  "/admins/list/*": { module: "admin-list", action: "VIEW" },
  "/admins/list/*/update": { module: "admin-list", action: "EDIT" },
  "/admins/list/create": { module: "admin-list", action: "CREATE" },
  "/admins/roles": { module: "role-permission", action: "VIEW" },
  "/admins/roles/*": { module: "role-permission", action: "VIEW" },
  "/admins/roles/create": { module: "role-permission", action: "CREATE" },
  "/admins/roles/*/update": { module: "role-permission", action: "EDIT" },
  "/settings/categories": { module: "categories", action: "VIEW" },
  "/settings/sub-categories": { module: "sub-categories", action: "VIEW" },
  "/settings/terms-conditions": { module: "terms-conditions", action: "VIEW" },
  "/settings/terms-conditions/detail": {
    module: "terms-conditions",
    action: "VIEW",
  },
  "/settings/policies": { module: "policies", action: "VIEW" },
  "/settings/policies/update": { module: "policies", action: "EDIT" },
  "/settings/earning-withdrawal-tnc": {
    module: "earning-withdrawal-tnc",
    action: "VIEW",
  },
  "/settings/earning-withdrawal-tnc/update": {
    module: "earning-withdrawal-tnc",
    action: "EDIT",
  },
  "/settings/system-maintenance": {
    module: "system-maintenance",
    action: "VIEW",
  },
  "/settings/social-links": { module: "social-links", action: "VIEW" },
  "/settings/contact-us": { module: "contact-us", action: "VIEW" },
  "/settings/faqs": { module: "faqs", action: "VIEW" },
  "/settings/share-template-social": {
    module: "share-template-social",
    action: "VIEW",
  },
  "/settings/faqs/create": { module: "faqs", action: "CREATE" },
  "/settings/tutorials": { module: "tutorials", action: "VIEW" },
  "/settings/otp-settings": { module: "otp-settings", action: "VIEW" },
  "/settings/otp-settings/*": { module: "otp-settings", action: "EDIT" },
  "/settings/email-registration-tnc": {
    module: "email-registration-tnc",
    action: "VIEW",
  },
  "/settings/email-registration-tnc/update": {
    module: "email-registration-tnc",
    action: "EDIT",
  },
  "/settings/phone-registration-tnc": {
    module: "phone-registration-tnc",
    action: "VIEW",
  },
  "/settings/phone-registration-tnc/update": {
    module: "phone-registration-tnc",
    action: "EDIT",
  },
  "/reports/income/*": { module: "income-report", action: "VIEW" },
  "/reports/template/*": { module: "template-report", action: "VIEW" },
  "/reports/users/*": { module: "user-report", action: "VIEW" },
  // Using explicit keys is now type-safe!
};
