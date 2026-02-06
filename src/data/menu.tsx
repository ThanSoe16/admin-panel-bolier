import { Image } from "@/components/ui/image";
import { JSX } from "react";
import { PermissionKey } from "./permissions";
import { cn } from "@/lib/utils";

export interface SubMenu {
  name: string;
  path: string;
  active: boolean;
  permission?: PermissionKey;
}

export interface Menu {
  name: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
  path: string;
  active: boolean;
  permission?: PermissionKey;
  subPaths?: SubMenu[];
}

const MenuImage = ({ url, className }: { url: string; className?: string }) => {
  return (
    <Image
      src={url}
      width={24}
      height={24}
      alt="home"
      className={cn("min-w-[24px] min-h-[24px]", className)}
    />
  );
};

export const getAllPaths = (pathname: string): Menu[] => {
  const menuItems: Menu[] = [
    {
      name: "Dashboard",
      icon: <MenuImage url="/side-bar/dashboard-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/dashboard-active-icon.svg" />,
      path: "/dashboard",
      active: pathname.startsWith("/dashboard"),
      permission: "dashboard",
    },
    {
      name: "Users",
      icon: <MenuImage url="/side-bar/users-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/users-active-icon.svg" />,
      path: "/users",
      active: pathname.startsWith("/users"),
      permission: "users",
      subPaths: [
        {
          name: "All Users",
          active: pathname.startsWith("/users/all"),
          path: "/users/all",
          permission: "users",
        },
        {
          name: "Withdrawal Requests",
          active: pathname.startsWith("/users/withdrawal-requests"),
          path: "/users/withdrawal-requests",
          permission: "withdrawal-requests",
        },
        {
          name: "Withdrawal History",
          active: pathname.startsWith("/users/withdrawal-history"),
          path: "/users/withdrawal-history",
          permission: "withdrawal-history",
        },
      ],
    },
    {
      name: "Membership",
      icon: <MenuImage url="/side-bar/membership-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/membership-active-icon.svg" />,
      path: "/membership",
      active: pathname.startsWith("/membership"),
      permission: "feature-user-agreement",
      subPaths: [
        // {
        //   name: "Membership Plans",
        //   active: pathname.startsWith("/membership/plans"),
        //   path: "/membership/plans",
        //   permission: "membership-plans",
        // },
        {
          name: "Feature & User Agreement",
          active: pathname.startsWith("/membership/feature-user-agreement"),
          path: "/membership/feature-user-agreement",
          permission: "feature-user-agreement",
        },
        {
          name: "Membership Plan T&C",
          active: pathname.startsWith("/membership/tnc-plan"),
          path: "/membership/tnc-plan",
          permission: "tnc-plan",
        },
      ],
    },
    {
      name: "Mgmt. Blog Templates",
      icon: <MenuImage url="/side-bar/mode-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/mode-active-icon.svg" />,
      path: "/blog-templates",
      active: pathname.startsWith("/blog-templates"),
      permission: "mgmt-blog-template",
    },
    {
      name: "Dev Mode Blog TPL",
      icon: <MenuImage url="/side-bar/mode-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/mode-active-icon.svg" />,
      path: "/dev-mode",
      active: pathname.startsWith("/dev-mode"),
      permission: "dev-mode-blog-tpl",
    },
    {
      name: "Blog Preferences",
      icon: <MenuImage url="/side-bar/blog-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/blog-active-icon.svg" />,
      path: "/blog-preferences",
      active: pathname.startsWith("/blog-preferences"),
      permission: "blog-preferences",
    },
    {
      name: "Contact Us Forms",
      icon: <MenuImage url="/side-bar/contact-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/contact-active-icon.svg" />,
      path: "/contact-us",
      active: pathname.startsWith("/contact-us"),
      permission: "contact-us-forms",
    },
    {
      name: "Payment Settings",
      icon: <MenuImage url="/side-bar/payment-settings-icon.svg" />,
      activeIcon: (
        <MenuImage url="/side-bar/payment-settings-active-icon.svg" />
      ),
      path: "/payment-settings",
      active: pathname.startsWith("/payment-settings"),
      permission: "payment-methods",
      subPaths: [
        {
          name: "Payment Methods",
          active: pathname.startsWith("/payment-settings/payment-methods"),
          path: "/payment-settings/payment-methods",
          permission: "payment-methods",
        },
        {
          name: "Payment Accounts",
          active: pathname.startsWith("/payment-settings/payment-accounts"),
          path: "/payment-settings/payment-accounts",
          permission: "payment-accounts",
        },
        {
          name: "Transaction Fee",
          active: pathname.startsWith("/payment-settings/blog-service-fee"),
          path: "/payment-settings/blog-service-fee",
          permission: "blog-service-fee",
        },
        {
          name: "Withdrawal Fee",
          active: pathname.startsWith("/payment-settings/withdrawal-fee"),
          path: "/payment-settings/withdrawal-fee",
          permission: "withdrawal-fee",
        },
        {
          name: "Accepted Receiving Payment Methods",
          active: pathname.startsWith("/payment-settings/accepted-receiving"),
          path: "/payment-settings/accepted-receiving",
          permission: "accepted-receiving",
        },
        {
          name: "Exchange Rate & Service Fee",
          active: pathname.startsWith("/payment-settings/exchange-rate"),
          path: "/payment-settings/exchange-rate?tab=exchange-rate",
          permission: "exchange-rate",
        },
        {
          name: "Blog Service Fee T&C",
          active: pathname.startsWith("/payment-settings/tnc-blog-service-fee"),
          path: "/payment-settings/tnc-blog-service-fee",
          permission: "blog-service-fee-tnc",
        },
      ],
    },
    {
      name: "Sale History",
      icon: <MenuImage url="/side-bar/history-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/history-active-icon.svg" />,
      path: "/sale-history",
      active: pathname.startsWith("/sale-history"),
      permission: "template-sales",
      subPaths: [
        {
          name: "Template Sales",
          active: pathname.startsWith("/sale-history/template-sales"),
          path: "/sale-history/template-sales",
          permission: "template-sales",
        },
        {
          name: "Blog Site Sales",
          active: pathname.startsWith("/sale-history/blog-site"),
          path: "/sale-history/blog-site",
          permission: "blog-site-sales",
        },
        {
          name: "Hosting Sales",
          active: pathname.startsWith("/sale-history/hosting"),
          path: "/sale-history/hosting",
          permission: "hosting-sales",
        },
        {
          name: "Server Sales",
          active: pathname.startsWith("/sale-history/server"),
          path: "/sale-history/server",
          permission: "server-sales",
        },
        {
          name: "Maintain Sales",
          active: pathname.startsWith("/sale-history/maintain"),
          path: "/sale-history/maintain",
          permission: "maintain-sales",
        },
      ],
    },
    {
      name: "Service Fee",
      icon: <MenuImage url="/side-bar/service-fee-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/service-fee-active-icon.svg" />,
      path: "/service-fee",
      active: pathname.startsWith("/service-fee"),
      permission: "maintain-fee",
      subPaths: [
        {
          name: "Maintain Fee",
          active: pathname.startsWith("/service-fee/maintain"),
          path: "/service-fee/maintain",
          permission: "maintain-fee",
        },
        {
          name: "Setup Fee",
          active: pathname.startsWith("/service-fee/setup"),
          path: "/service-fee/setup",
          permission: "setup-fee",
        },
        {
          name: "Hosting Fee",
          active: pathname.startsWith("/service-fee/hosting"),
          path: "/service-fee/hosting",
          permission: "hosting-fee",
        },
      ],
    },
    {
      name: "User Invoice",
      icon: <MenuImage url="/side-bar/contact-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/contact-active-icon.svg" />,
      path: "/invoice",
      active: pathname.startsWith("/invoice"),
      permission: "user-invoice",
    },
    {
      name: "Notification",
      icon: <MenuImage url="/side-bar/notifications-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/notifications-active-icon.svg" />,
      path: "/notifications",
      active: pathname.startsWith("/notifications"),
      permission: "maintain-renew",
      subPaths: [
        {
          name: "Maintain Renew",
          active: pathname.startsWith("/notifications/maintain"),
          path: "/notifications/maintain",
          permission: "maintain-renew",
        },
        // {
        //   name: "Server Renew",
        //   active: pathname.startsWith("/notifications/server"),
        //   path: "/notifications/server",
        //   permission: "server-renew",
        // },
        {
          name: "Hosting Renew",
          active: pathname.startsWith("/notifications/hosting"),
          path: "/notifications/hosting",
          permission: "hosting-renew",
        },
      ],
    },
    {
      name: "Admin Role & Permissions",
      icon: <MenuImage url="/side-bar/admin-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/admin-active-icon.svg" />,
      path: "/admins",
      active: pathname.startsWith("/admin"),
      permission: "role-permission",
      subPaths: [
        {
          name: "Admin List",
          active: pathname.startsWith("/admins/list"),
          path: "/admins/list",
          permission: "admin-list",
        },
        {
          name: "Role & Permission",
          active: pathname.startsWith("/admins/roles"),
          path: "/admins/roles",
          permission: "role-permission",
        },
      ],
    },
    {
      name: "Settings",
      icon: <MenuImage url="/side-bar/settings-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/settings-active-icon.svg" />,
      path: "/settings",
      active: pathname.startsWith("/settings"),
      permission: "categories",
      subPaths: [
        {
          name: "Categories",
          active: pathname.startsWith("/settings/categories"),
          path: "/settings/categories",
          permission: "categories",
        },
        {
          name: "Sub Categories",
          active: pathname.startsWith("/settings/sub-categories"),
          path: "/settings/sub-categories",
          permission: "sub-categories",
        },
        {
          name: "Terms & Conditions",
          active: pathname.startsWith("/settings/terms-conditions"),
          path: "/settings/terms-conditions",
          permission: "terms-conditions",
        },
        {
          name: "Policies",
          active: pathname.startsWith("/settings/policies"),
          path: "/settings/policies",
          permission: "policies",
        },
        {
          name: "Earning & Withdrawal T&C",
          active: pathname.startsWith("/settings/earning-withdrawal-tnc"),
          path: "/settings/earning-withdrawal-tnc",
          permission: "earning-withdrawal-tnc",
        },
        {
          name: "System Maintenance",
          active: pathname.startsWith("/settings/system-maintenance"),
          path: "/settings/system-maintenance",
          permission: "system-maintenance",
        },
        {
          name: "Social Links",
          active: pathname.startsWith("/settings/social-links"),
          path: "/settings/social-links",
          permission: "social-links",
        },
        {
          name: "Contact Us",
          active: pathname.startsWith("/settings/contact-us"),
          path: "/settings/contact-us",
          permission: "contact-us",
        },
        {
          name: "FAQs",
          active: pathname.startsWith("/settings/faqs"),
          path: "/settings/faqs",
          permission: "faqs",
        },
        {
          name: "Tutorials",
          active: pathname.startsWith("/settings/tutorials"),
          path: "/settings/tutorials",
          permission: "tutorials",
        },
        {
          name: "Share Template Social",
          active: pathname.startsWith("/settings/share-template-social"),
          path: "/settings/share-template-social",
          permission: "share-template-social",
        },
        {
          name: "OTP Settings",
          active: pathname.startsWith("/settings/otp-settings"),
          path: "/settings/otp-settings",
          permission: "otp-settings",
        },

        {
          name: "Email Registration T&C",
          active: pathname.startsWith("/settings/email-registration-tnc"),
          path: "/settings/email-registration-tnc",
          permission: "email-registration-tnc",
        },
        {
          name: "Phone Registration T&C",
          active: pathname.startsWith("/settings/phone-registration-tnc"),
          path: "/settings/phone-registration-tnc",
          permission: "phone-registration-tnc",
        },
      ],
    },
    {
      name: "Statistics Report",
      icon: <MenuImage url="/side-bar/report-icon.svg" />,
      activeIcon: <MenuImage url="/side-bar/report-active-icon.svg" />,
      path: "/reports",
      active: pathname.startsWith("/reports"),
      permission: "user-report",
      subPaths: [
        {
          name: "Income Report",
          active: pathname.startsWith("/reports/income"),
          path: `/reports/income?tab=daily`,
          permission: "income-report",
        },
        {
          name: "User Report",
          active: pathname.startsWith("/reports/users"),
          path: "/reports/users?tab=daily",
          permission: "user-report",
        },
        {
          name: "Template Report",
          active: pathname.startsWith("/reports/template"),
          path: "/reports/template?tab=daily",
          permission: "template-report",
        },
      ],
    },
  ];
  return menuItems;
};
