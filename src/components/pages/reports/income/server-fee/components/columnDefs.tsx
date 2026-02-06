import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import TableBaseButton from '@/components/shared/buttons/table-base-button';
import { formatDate, formatMonth, formatYear } from '@/utils/dateTime';
import { ServerFeeListData, ServerFeeTableData } from '@/features/report/income/server-fee/types';
import { CurrencyFormat } from '@/utils/currencyFormat';

const Action = (props: ServerFeeListData) => {
  return (
    <Link href={`/sale-history/server/${props?.id}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const MonthlyAction = (props: ServerFeeListData) => {
  return (
    <Link href={`/reports/income/blog_server_fee/daily?date=${props.date}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};
const YearlyAction = (props: ServerFeeListData) => {
  return (
    <Link href={`/reports/income/blog_server_fee/monthly?date=${props.month}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

export const serverFeeDailyColumnDefs: ColumnDef<ServerFeeListData>[] = [
  {
    accessorKey: 'username',
    header: 'User Name',
    cell: ({ row }) => <p className="">{row?.original?.MerchantBlog?.OneSiteUser?.username}</p>,
  },
  {
    accessorKey: 'blogName',
    header: 'Blog Name',
    cell: ({ row }) => (
      <p className="">{row?.original?.MerchantBlog?.BlogNameAndLogo[0]?.name ?? '-'}</p>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Pay On:',
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

export const serverFeeMonthlyColumnDefs: ColumnDef<ServerFeeListData>[] = [
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

export const serverFeeYearlyColumnDefs: ColumnDef<ServerFeeListData>[] = [
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

export const serverFeeTypeColumnDefs: ColumnDef<ServerFeeTableData>[] = [
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
