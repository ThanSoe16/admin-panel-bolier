import { PermissionKey } from '@/features/admins/types/permission.type';

export const routePermissionMap: {
  [path: string]: { module: PermissionKey; action: string };
} = {
  '/dashboard': { module: 'dashboard', action: 'VIEW' },
  '/users': { module: 'users', action: 'VIEW' },
  '/users/withdrawal-requests': {
    module: 'withdrawal-requests',
    action: 'VIEW',
  },
  '/users/withdrawal-requests/*': {
    module: 'withdrawal-requests',
    action: 'VIEW',
  },
  // "/membership/plans": { module: "membership-plans", action: "VIEW" },
  // "/membership/plans/*": { module: "membership-plans", action: "CREATE" },
  '/admins/list': { module: 'admin-list', action: 'VIEW' },
  '/admins/list/*': { module: 'admin-list', action: 'VIEW' },
  '/admins/list/*/update': { module: 'admin-list', action: 'EDIT' },
  '/admins/list/create': { module: 'admin-list', action: 'CREATE' },
  '/admins/roles': { module: 'role-permission', action: 'VIEW' },
  '/admins/roles/*': { module: 'role-permission', action: 'VIEW' },
  '/admins/roles/create': { module: 'role-permission', action: 'CREATE' },
  '/admins/roles/*/update': { module: 'role-permission', action: 'EDIT' },
  '/settings/categories': { module: 'categories', action: 'VIEW' },
  '/settings/sub-categories': { module: 'sub-categories', action: 'VIEW' },
  '/settings/terms-conditions': { module: 'terms-conditions', action: 'VIEW' },
  '/settings/terms-conditions/detail': {
    module: 'terms-conditions',
    action: 'VIEW',
  },
  '/settings/policies': { module: 'policies', action: 'VIEW' },
  '/settings/policies/update': { module: 'policies', action: 'EDIT' },
  '/settings/earning-withdrawal-tnc': {
    module: 'earning-withdrawal-tnc',
    action: 'VIEW',
  },
  '/settings/earning-withdrawal-tnc/update': {
    module: 'earning-withdrawal-tnc',
    action: 'EDIT',
  },
  '/settings/system-maintenance': {
    module: 'system-maintenance',
    action: 'VIEW',
  },
  '/settings/social-links': { module: 'social-links', action: 'VIEW' },
  '/settings/contact-us': { module: 'contact-us', action: 'VIEW' },
  '/settings/faqs': { module: 'faqs', action: 'VIEW' },
  '/settings/faqs/create': { module: 'faqs', action: 'CREATE' },
  '/settings/tutorials': { module: 'tutorials', action: 'VIEW' },
  '/settings/otp-settings': { module: 'otp-settings', action: 'VIEW' },
  '/settings/otp-settings/*': { module: 'otp-settings', action: 'EDIT' },

  '/reports/income/*': { module: 'income-report', action: 'VIEW' },
  '/reports/template/*': { module: 'template-report', action: 'VIEW' },
  '/reports/users/*': { module: 'user-report', action: 'VIEW' },
  // Using explicit keys is now type-safe!
};
