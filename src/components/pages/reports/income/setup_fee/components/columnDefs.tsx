import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { formatDate, formatMonth, formatYear } from "@/utils/dateTime";
import {
  SetupFeeListData,
  SetupFeeTypeTableData,
} from "@/features/report/income/setup-fee/types";
import { CurrencyFormat } from "@/utils/currencyFormat";

const Action = (props: SetupFeeListData) => {
  return (
    <Link href={`/sale-history/blog-site/${props?.OneSiteUserOrder[0]?.id}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const MonthlyAction = (props: SetupFeeListData) => {
  return (
    <Link href={`/reports/income/blog_service_fee/daily?date=${props.date}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const YearlyAction = (props: SetupFeeListData) => {
  return (
    <Link href={`/reports/income/blog_service_fee/monthly?date=${props.month}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

export const setupFeeDailyColumnDefs: ColumnDef<SetupFeeListData>[] = [
  {
    accessorKey: "name",
    header: "Blog Name",
    cell: ({ row }) => <p>{row?.original?.BlogNameAndLogo[0]?.name ?? "-"}</p>,
  },
  {
    accessorKey: "templateName",
    header: "Template Name",
    cell: ({ row }) => (
      <p>{row?.original?.OneSiteUserPurchasedTemplate?.Template?.name}</p>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => (
      <p>{CurrencyFormat(row?.original?.OneSiteUserOrder[0]?.total ?? 0)}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Opened On:",
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <p className="capitalize">
        {row?.original?.OneSiteUserOrder[0]?.PaymentStatus?.toLocaleLowerCase()}
      </p>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Action {...row?.original} />,
  },
];

export const setupFeeMonthlyColumnDefs: ColumnDef<SetupFeeListData>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-brand font-medium">
        {formatMonth(row?.original?.date)}
      </p>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <p>{CurrencyFormat(row?.original?.amount ?? 0)}</p>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <MonthlyAction {...row?.original} />,
  },
];

export const setupFeeYearlyColumnDefs: ColumnDef<SetupFeeListData>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-brand font-medium">
        {formatYear(row?.original?.month)}
      </p>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <p>{CurrencyFormat(row?.original?.amount ?? 0)}</p>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <YearlyAction {...row?.original} />,
  },
];

export const setupFeeTypeColumnDefs: ColumnDef<SetupFeeTypeTableData>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => <p>{CurrencyFormat(row?.original?.totalAmount ?? 0)}</p>,
  },
  {
    accessorKey: "count",
    header: "Count",
  },
];
