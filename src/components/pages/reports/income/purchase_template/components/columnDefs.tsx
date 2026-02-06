import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import TableBaseButton from '@/components/shared/buttons/table-base-button';
import { formatDate, formatMonth, formatYear } from '@/utils/dateTime';
import {
  PurchasedTemplateData,
  TemplateSaleData,
} from '@/features/report/income/purchase-templates/types';
import { CurrencyFormat } from '@/utils/currencyFormat';
import { filterEnglishAlphanumericStrings } from '@/utils/isEnglishAlphanumeric';

const Action = (props: PurchasedTemplateData) => {
  return (
    <Link href={`/sale-history/template-sales/${props?.id}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const MonthlyAction = (props: PurchasedTemplateData) => {
  return (
    <Link href={`/reports/income/blog_template_sale/daily?date=${props.date}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const YearlyAction = (props: PurchasedTemplateData) => {
  return (
    <Link href={`/reports/income/blog_template_sale/monthly?date=${props.month}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

export const purchaseTemplateDailyColumnDefs: ColumnDef<PurchasedTemplateData>[] = [
  {
    accessorKey: 'id',
    header: 'Template ID',
    size: 100,
    cell: ({ row }) => <p className="">{row?.original?.Template?.templateCode}</p>,
  },
  {
    accessorKey: 'userName',
    header: 'User Name',
    size: 100,
    cell: ({ row }) => <p className="">{row?.original?.OneSiteUser?.username}</p>,
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    size: 150,
    cell: ({ row }) => {
      const contents = row?.original?.Template?.TemplateCategory?.TemplateCategoryContent ?? [];

      const names = contents.map((item: any) => item.name);
      const englishNames = filterEnglishAlphanumericStrings(names);

      return <p className="">{englishNames[0]}</p>;
    },
  },
  {
    accessorKey: 'purchasedOn',
    header: 'Purchased On:',
    size: 150,
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => <p className="">${CurrencyFormat(row?.original?.price)}</p>,
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <p className="capitalize">
        {row?.original?.OneSiteUserOrder[0]?.PaymentStatus?.toLocaleLowerCase()}
      </p>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Action',
    cell: ({ row }) => <Action {...row?.original} />,
  },
];

export const purchaseTemplateMonthlyColumnDefs: ColumnDef<PurchasedTemplateData>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    size: 100,
    cell: ({ row }) => (
      <p className="text-primary font-semibold">{formatMonth(row?.original?.date)}</p>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    size: 150,
    cell: ({ row }) => <p className="">${CurrencyFormat(row?.original?.amount)}</p>,
  },
  {
    accessorKey: 'actions',
    header: 'Action',
    size: 150,
    cell: ({ row }) => <MonthlyAction {...row?.original} />,
  },
];

export const purchaseTemplateYearlyColumnDefs: ColumnDef<PurchasedTemplateData>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    size: 100,
    cell: ({ row }) => (
      <p className="text-primary font-semibold">{formatYear(row?.original?.month)}</p>
    ),
  },
  {
    accessorKey: 'count',
    header: 'Count',
    size: 150,
    cell: ({ row }) => <p className="">{CurrencyFormat(row?.original?.count)}</p>,
  },
  {
    accessorKey: 'actions',
    header: 'Action',
    size: 150,
    cell: ({ row }) => <YearlyAction {...row?.original} />,
  },
];

export const purchaseTemplateCategoryColumnDefs: ColumnDef<TemplateSaleData>[] = [
  {
    accessorKey: 'categoryName',
    header: 'Type',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <p className="">${CurrencyFormat(row?.original?.totalPrice)}</p>,
  },
  {
    accessorKey: 'salesCount',
    header: 'Count',
  },
];
