import { IncomeReportData } from '@/features/report/income/types';

export const dummyIncomeData: IncomeReportData[] = [
  {
    id: 'TX-001',
    pageType: 'purchase-template',
    type: 'Purchase Template',
    amount: 500,
    status: 'COMPLETED',
    date: new Date().toISOString(),
    customer: 'John Doe',
  },
  {
    id: 'TX-002',
    pageType: 'setup-fee',
    type: 'Setup Fee (Blog Sites)',
    amount: 500,
    status: 'COMPLETED',
    date: new Date().toISOString(),
    customer: 'Jane Smith',
  },
  {
    id: 'TX-003',
    pageType: 'hosting-fee',
    type: 'Hosting Fee ',
    amount: 500,
    status: 'PENDING',
    date: new Date().toISOString(),
    customer: 'Acme Corp',
  },
  {
    id: 'TX-004',
    pageType: 'maintain-fee',
    type: 'Maintain Fee',
    amount: 500,
    status: 'COMPLETED',
    date: new Date().toISOString(),
    customer: 'Global Enterprises',
  },
  {
    id: 'TX-005',
    pageType: 'server-fee',
    type: 'Server Fee',
    amount: 500,
    status: 'COMPLETED',
    date: new Date().toISOString(),
    customer: 'Tech Solutions',
  },
];
