import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import TableBaseButton from '@/components/shared/buttons/TableBaseButton';
import { formatDate, formatMonth, formatYear } from '@/utils/dateTime';
import {
  HostingFeeListData,
  HostingFeeTableData,
} from '@/features/report/income/hosting-fee/types';
import { CurrencyFormat } from '@/utils/currencyFormat';

const Action = (props: HostingFeeListData) => {
  return (
    <Link href={`/sale-history/hosting/${props?.id}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const MonthlyAction = (props: HostingFeeListData) => {
  return (
    <Link href={`/reports/income/blog_hosting_fee/daily?date=${props.date}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const YearlyAction = (props: HostingFeeListData) => {
  return (
    <Link href={`/reports/income/blog_hosting_fee/monthly?date=${props.month}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};
export const hostingFeeDailyColumnDefs: ColumnDef<HostingFeeListData>[] = [
  {
    accessorKey: 'domain',
    header: 'Domain Name',
    cell: ({ row }) => (
      <Link
        href={row?.original?.MerchantBlog?.blogDomain ?? ''}
        className="text-brand hover:underline"
      >
        {!row?.original?.MerchantBlog?.blogDomain ? '-' : row?.original?.MerchantBlog?.blogDomain}
      </Link>
    ),
  },
  {
    accessorKey: 'blogName',
    header: 'Blog Name',
    cell: ({ row }) => (
      <p className="">{row?.original?.MerchantBlog?.BlogNameAndLogo[0]?.name ?? '-'}</p>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <p className="">{row?.original?.MerchantBlog?.isOneTime ? 'New' : 'Renew'}</p>
    ),
  },
  {
    accessorKey: 'purchasedOn',
    header: 'Purchased On:',
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.total)} / yr</p>,
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <p className="capitalize">{row?.original?.MerchantBlogBillingStatus?.toLocaleLowerCase()}</p>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Action',
    cell: ({ row }) => <Action {...row?.original} />,
  },
];

export const hostingFeeMonthlyColumnDefs: ColumnDef<HostingFeeListData>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <p className="text-brand font-medium">{formatMonth(row?.original?.date)}</p>,
  },
  {
    accessorKey: 'count',
    header: 'Amount',
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.amount)}</p>,
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => <MonthlyAction {...row?.original} />,
  },
];

export const hostingFeeYearlyColumnDefs: ColumnDef<HostingFeeListData>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <p className="text-brand font-medium">{formatYear(row?.original?.month)}</p>,
  },
  {
    accessorKey: 'count',
    header: 'Amount',
    cell: ({ row }) => <p>{row?.original?.amount ?? 0}</p>,
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => <YearlyAction {...row?.original} />,
  },
];

export const hostingFeeTypeColumnDefs: ColumnDef<HostingFeeTableData>[] = [
  {
    accessorKey: 'name',
    header: 'Type',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.total)}</p>,
  },
  {
    accessorKey: 'count',
    header: 'Count',
    cell: ({ row }) => <p>{row?.original?.count ?? 0}</p>,
  },
];
