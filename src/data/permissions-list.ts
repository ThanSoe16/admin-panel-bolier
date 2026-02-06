export const permissions = [
  {
    name: "dashboard",
    title: "Dashboard",
    permissions: ["VIEW"],
  },
  {
    name: "users",
    title: "Users",
    permissions: ["VIEW"],
    subMenu: [
      {
        name: "users",
        title: "All Users",
        permissions: ["VIEW"],
      },
      {
        name: "withdrawal-requests",
        title: "Withdrawal Requests",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "withdrawal-history",
        title: "Withdrawal History",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    name: "membership",
    title: "Membership",
    permissions: ["VIEW"],
    subMenu: [
      // {
      //   name: "membership-plans",
      //   title: "Membership Plans",
      //   permissions: ["VIEW", "EDIT", "CREATE"],
      // },
      {
        name: "feature-user-agreement",
        title: "Feature & User Agreement",
        permissions: ["VIEW", "EDIT", "CREATE", "DELETE"],
      },
      {
        name: "tnc-plan",
        title: "TNC Plan",
        permissions: ["VIEW", "EDIT"],
      },
    ],
  },

  {
    name: "mgmt-blog-template",
    title: "Mgmt. Blog Template",
    permissions: ["VIEW", "EDIT"],
  },
  {
    name: "dev-mode-blog-tpl",
    title: "Dev Mode Blog TPL",
    permissions: ["VIEW", "CREATE", "EDIT"],
  },
  {
    name: "blog-preferences",
    title: "Blog Preferences",
    permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
  },
  {
    name: "contact-us-forms",
    title: "Contact Us Forms",
    permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
  },
  {
    name: "payment-settings",
    title: "Payment Settings",
    permissions: ["VIEW", "CREATE", "EDIT"],

    subMenu: [
      {
        name: "payment-methods",
        title: "Payment Methods",
        permissions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        name: "payment-accounts",
        title: "Payment Accounts",
        permissions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        name: "blog-service-fee",
        title: "Transaction Fee",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "withdrawal-fee",
        title: "Withdrawal Fee",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "accepted-receiving",
        title: "Accepted Receiving Payment Methods",
        permissions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        name: "exchange-rate",
        title: "Exchange Rate & Service Fee",
        permissions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        name: "blog-service-fee-tnc",
        title: "Blog Service Fee T&C",
        permissions: ["VIEW", "CREATE", "EDIT"],
      },
    ],
  },
  {
    name: "sale-history",
    title: "Sale History",
    permissions: ["VIEW"],

    subMenu: [
      {
        name: "template-sales",
        title: "Template Sales",
        permissions: ["VIEW"],
      },
      {
        name: "blog-site-sales",
        title: "Blog Site Sales",
        permissions: ["VIEW"],
      },
      {
        name: "hosting-sales",
        title: "Hosting Sales",
        permissions: ["VIEW"],
      },
      {
        name: "server-sales",
        title: "Server Sales",
        permissions: ["VIEW"],
      },
      {
        name: "maintain-sales",
        title: "Maintain Sales",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    name: "service-fee",
    title: "Service Fee",
    permissions: ["VIEW", "EDIT"],

    subMenu: [
      {
        name: "maintain-fee",
        title: "Maintain Fee",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "setup-fee",
        title: "Setup Fee",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "hosting-fee",
        title: "Hosting Fee",
        permissions: ["VIEW", "EDIT"],
      },
    ],
  },
  {
    name: "user-invoice",
    title: "User Invoice",
    permissions: ["VIEW", "CREATE"],
  },
  {
    name: "notification",
    title: "Notification",
    permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],

    subMenu: [
      {
        name: "maintain-renew",
        title: "Maintain Renew",
        permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      // {
      //   name: "server-renew",
      //   title: "Server Renew",
      //   permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      // },
      {
        name: "hosting-renew",
        title: "Hosting Renew",
        permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
    ],
  },
  {
    name: "admin-role",
    title: "Admin Role & Permission",
    permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],

    subMenu: [
      {
        name: "admin-list",
        title: "Admin List",
        permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        name: "role-permission",
        title: "Role & Permission",
        permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
    ],
  },
  {
    name: "settings",
    title: "Settings",
    permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],

    subMenu: [
      {
        name: "categories",
        title: "Categories",
        permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        name: "sub-categories",
        title: "Sub Categories",
        permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        name: "terms-conditions",
        title: "Terms & Conditions",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "policies",
        title: "Policies",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "earning-withdrawal-tnc",
        title: "Earning & Withdrawal T&C",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "system-maintenance",
        title: "System Maintenance",
        permissions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        name: "social-links",
        title: "Social Links",
        permissions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        name: "contact-us",
        title: "Contact Us",
        permissions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        name: "faqs",
        title: "FAQs",
        permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        name: "share-template-social",
        title: "Share Template Social",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "tutorials",
        title: "Tutorials",
        permissions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },

      {
        name: "otp-settings",
        title: "OTP Settings",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "email-registration-tnc",
        title: "Email Registration T&C",
        permissions: ["VIEW", "EDIT"],
      },
      {
        name: "phone-registration-tnc",
        title: "Phone Registration T&C",
        permissions: ["VIEW", "EDIT"],
      },
    ],
  },
  {
    name: "statistics-report",
    title: "Statistics Report",
    permissions: ["VIEW"],

    subMenu: [
      {
        name: "income-report",
        title: "Income Report",
        permissions: ["VIEW"],
      },
      {
        name: "user-report",
        title: "User Report",
        permissions: ["VIEW"],
      },
      {
        name: "template-report",
        title: "Template Report",
        permissions: ["VIEW"],
      },
    ],
  },
] as const;
