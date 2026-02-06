import { FeeType } from '@/features/users/types';

export function getFeeTypeName(feeType: FeeType) {
  const feeTypeData = {
    BLOG_TEMPLATE_SALE: 'Template Purchasing',
    BLOG_MAINTENANCE_FEE: 'Maintenance Fee',
    BLOG_SERVER_FEE: 'Server Fee',
    BLOG_HOSTING_FEE: 'Hosting Fee',
    BLOG_SERVICE_FEE: 'Setup Fee (Blog Sites)',
    CREATE_BLOG: 'Blog Creating',
    DOMAIN_REGISTRATION: 'Domain Registration',
    DOMAIN_RENEWAL: 'Domain Renewal',
  };
  return feeTypeData[feeType];
}

export function getFeeTypeRoute(feeType: FeeType) {
  const feeTypeData = {
    BLOG_TEMPLATE_SALE: '/sale-history/template-sales',
    BLOG_MAINTENANCE_FEE: '/sale-history/maintain',
    BLOG_SERVER_FEE: '/sale-history/blog-site',
    BLOG_HOSTING_FEE: '/sale-history/hosting',
    BLOG_SERVICE_FEE: '/sale-history/blog-site',
    CREATE_BLOG: '/sale-history/blog-site',
    DOMAIN_REGISTRATION: '/users/domain',
    DOMAIN_RENEWAL: '/users/domain',
  };
  return feeTypeData[feeType];
}

export function getFeeType(feeType: FeeType) {
  const feeTypeData = {
    BLOG_TEMPLATE_SALE: 'Purchase Template',
    BLOG_MAINTENANCE_FEE: 'Maintain Fee',
    BLOG_SERVER_FEE: 'Server Fee',
    BLOG_HOSTING_FEE: 'Hosting Fee',
    BLOG_SERVICE_FEE: 'Setup Fee (Blog Sites)',
    CREATE_BLOG: 'Create Blog',
    DOMAIN_REGISTRATION: 'Domain Registration',
    DOMAIN_RENEWAL: 'Domain Renewal',
  };
  return feeTypeData[feeType];
}

export function getFeeTypeReportRoute(feeType: FeeType) {
  const feeTypeData = {
    BLOG_TEMPLATE_SALE: '/reports/income/blog-template-sale',
    BLOG_MAINTENANCE_FEE: '/reports/sale-history/maintain',
    BLOG_SERVER_FEE: '/reports/sale-history/server',
    BLOG_HOSTING_FEE: '/reports/sale-history/hosting',
    BLOG_SERVICE_FEE: '/reports/sale-history/blog-site',
    CREATE_BLOG: '/reports/sale-history/blog-site',
    DOMAIN_REGISTRATION: '/reports/users/domain',
    DOMAIN_RENEWAL: '/reports/users/domain',
  };
  return feeTypeData[feeType];
}
