import { ColumnDef } from '@tanstack/react-table';
import { PopularTemplateData, TemplateSaleData } from '@/features/report/template/types';
import Status from '@/components/shared/Status';
import { toSentenceCase } from '@/utils/toSentenceCase';
import Link from 'next/link';
import TableBaseButton from '@/components/shared/buttons/TableBaseButton';
import { formatDate, formatMonth, formatYear } from '@/utils/dateTime';
import { ChevronRightIcon } from 'lucide-react';
import { CurrencyFormat } from '@/utils/currencyFormat';

export const popularTemplateColumnDefs: ColumnDef<PopularTemplateData>[] = [
  {
    accessorKey: 'templateCode',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Template Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <Link
        href={`/blog-templates/${row?.original?.id}`}
        className="text-brand flex items-center gap-1"
      >
        {row?.original?.TemplateCategory?.TemplateCategoryContent[0]?.name}{' '}
        <ChevronRightIcon className="w-4 h-4" />
      </Link>
    ),
  },
  {
    accessorKey: 'purchaseCount',
    header: 'Used Users',
  },
  {
    accessorKey: 'lastPurchasedAt',
    header: 'Purchased Date',
    size: 150,
    cell: ({ row }) => formatDate(row?.original?.lastPurchasedAt),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Link href={`/blog-templates/${row?.original?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    ),
  },
];

export const todaySaleTemplateColumnDefs: ColumnDef<TemplateSaleData>[] = [
  {
    accessorKey: 'templateName',
    header: 'Template Name',
    cell: ({ row }) => <p>{row?.original?.OneSiteUserPurchasedTemplate?.Template?.name ?? '-'}</p>,
  },
  {
    accessorKey: 'id',
    header: 'TemplateID',
    cell: ({ row }) => <p>{row?.original?.transactionNo ?? '-'}</p>,
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => <p>{row?.original?.OneSiteUser?.username}</p>,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <p className="">${CurrencyFormat(row?.original?.price)}</p>,
  },
  {
    accessorKey: 'purchasedAt',
    header: 'Purchased Date',
    size: 150,
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Status
        showGreenDot={row?.original?.PaymentStatus === 'SUCCESSFUL'}
        status={toSentenceCase(row?.original?.PaymentStatus)}
      />
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Link
        href={`/sale-history/template-sales/${row?.original?.OneSiteUserPurchasedTemplate?.id}`}
      >
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    ),
  },
];

export const monthlySaleTemplateColumnDefs: ColumnDef<TemplateSaleData>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <p className="text-primary font-semibold">{formatMonth(row?.original?.date)}</p>
    ),
  },
  {
    accessorKey: 'count',
    header: 'Count',
    cell: ({ row }) => <p className="">{row?.original?.count}</p>,
  },
];

export const yearlySaleTemplateColumnDefs: ColumnDef<TemplateSaleData>[] = [
  {
    accessorKey: 'month',
    header: 'Month',
    cell: ({ row }) => (
      <p className="text-primary font-semibold">{formatYear(row?.original?.month)}</p>
    ),
  },
  {
    accessorKey: 'count',
    header: 'Count',
    cell: ({ row }) => <p className="">{row?.original?.count}</p>,
  },
];
