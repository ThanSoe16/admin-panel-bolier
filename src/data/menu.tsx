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
          name: "OTP Settings",
          active: pathname.startsWith("/settings/otp-settings"),
          path: "/settings/otp-settings",
          permission: "otp-settings",
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
