export const permissions = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    permissions: ['VIEW'],
  },
  {
    name: 'users',
    title: 'Users',
    permissions: ['VIEW'],
    subMenu: [
      {
        name: 'users',
        title: 'All Users',
        permissions: ['VIEW'],
      },
      {
        name: 'withdrawal-requests',
        title: 'Withdrawal Requests',
        permissions: ['VIEW', 'EDIT'],
      },
      {
        name: 'withdrawal-history',
        title: 'Withdrawal History',
        permissions: ['VIEW'],
      },
    ],
  },
  {
    name: 'admin-role',
    title: 'Admin Role & Permission',
    permissions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],

    subMenu: [
      {
        name: 'admin-list',
        title: 'Admin List',
        permissions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
      },
      {
        name: 'role-permission',
        title: 'Role & Permission',
        permissions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
      },
    ],
  },
  {
    name: 'settings',
    title: 'Settings',
    permissions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],

    subMenu: [
      {
        name: 'categories',
        title: 'Categories',
        permissions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
      },
      {
        name: 'sub-categories',
        title: 'Sub Categories',
        permissions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
      },
      {
        name: 'terms-conditions',
        title: 'Terms & Conditions',
        permissions: ['VIEW', 'EDIT'],
      },
      {
        name: 'policies',
        title: 'Policies',
        permissions: ['VIEW', 'EDIT'],
      },
      {
        name: 'earning-withdrawal-tnc',
        title: 'Earning & Withdrawal T&C',
        permissions: ['VIEW', 'EDIT'],
      },
      {
        name: 'system-maintenance',
        title: 'System Maintenance',
        permissions: ['VIEW', 'CREATE', 'EDIT'],
      },
      {
        name: 'social-links',
        title: 'Social Links',
        permissions: ['VIEW', 'CREATE', 'EDIT'],
      },
      {
        name: 'contact-us',
        title: 'Contact Us',
        permissions: ['VIEW', 'CREATE', 'EDIT'],
      },
      {
        name: 'faqs',
        title: 'FAQs',
        permissions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
      },
      {
        name: 'tutorials',
        title: 'Tutorials',
        permissions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
      },
      {
        name: 'otp-settings',
        title: 'OTP Settings',
        permissions: ['VIEW', 'EDIT'],
      },
    ],
  },
  {
    name: 'statistics-report',
    title: 'Statistics Report',
    permissions: ['VIEW'],

    subMenu: [
      {
        name: 'income-report',
        title: 'Income Report',
        permissions: ['VIEW'],
      },
      {
        name: 'user-report',
        title: 'User Report',
        permissions: ['VIEW'],
      },
      {
        name: 'template-report',
        title: 'Template Report',
        permissions: ['VIEW'],
      },
    ],
  },
] as const;
