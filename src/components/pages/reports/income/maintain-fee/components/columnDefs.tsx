import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { formatDate, formatMonth, formatYear } from "@/utils/dateTime";
import {
  MaintainFeeListData,
  MaintainFeeTableData,
} from "@/features/report/income/maintain-fee/types";
import { CurrencyFormat } from "@/utils/currencyFormat";

const Action = (props: MaintainFeeListData) => {
  return (
    <Link href={`/sale-history/maintain/${props?.id}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};
const MonthlyAction = (props: MaintainFeeListData) => {
  return (
    <Link
      href={`/reports/income/blog_maintenance_fee/daily?date=${props.date}`}
    >
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const YearlyAction = (props: MaintainFeeListData) => {
  return (
    <Link
      href={`/reports/income/blog_maintenance_fee/monthly?date=${props.month}`}
    >
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

export const maintainFeeDailyColumnDefs: ColumnDef<MaintainFeeListData>[] = [
  {
    accessorKey: "username",
    header: "User Name",
    cell: ({ row }) => (
      <p className="">{row?.original?.MerchantBlog?.OneSiteUser?.username}</p>
    ),
  },
  {
    accessorKey: "blogName",
    header: "Blog Name",
    cell: ({ row }) => (
      <p className="">
        {row?.original?.MerchantBlog?.BlogNameAndLogo &&
          row?.original?.MerchantBlog?.BlogNameAndLogo[0]?.name}
      </p>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <p className="">
        {row?.original?.MerchantBlog?.MerchantBlogBilling &&
        row?.original?.MerchantBlog?.MerchantBlogBilling[0]?.isOneTime
          ? "New"
          : "Renew"}
      </p>
    ),
  },
  {
    accessorKey: "purchasedOn",
    header: "Purchased On:",
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.total)} / yr</p>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <p className="capitalize">
        {row?.original?.paidDate ? "Paid" : "Unpaid"}
      </p>
    ),
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => <Action {...row?.original} />,
  },
];

export const maintainFeeMonthlyColumnDefs: ColumnDef<MaintainFeeListData>[] = [
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
    accessorKey: "count",
    header: "Amount",
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.amount)}</p>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <MonthlyAction {...row?.original} />,
  },
];

export const maintainFeeYearlyColumnDefs: ColumnDef<MaintainFeeListData>[] = [
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
    accessorKey: "count",
    header: "Amount",
    cell: ({ row }) => <p>{row?.original?.amount ?? 0}</p>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <YearlyAction {...row?.original} />,
  },
];

export const maintainFeeTypeColumnDefs: ColumnDef<MaintainFeeTableData>[] = [
  {
    accessorKey: "name",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.total)}</p>,
  },
  {
    accessorKey: "count",
    header: "Count",
    cell: ({ row }) => <p>{row?.original?.count ?? 0}</p>,
  },
];
