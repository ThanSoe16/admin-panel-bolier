import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { formatDate, formatMonth, formatYear } from "@/utils/dateTime";
import {
  DomainFeeListData,
  DomainFeeTableData,
} from "@/features/report/income/domain-fee/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { usePagination } from "@/features/base/hooks/usePagination";

const Action = (props: DomainFeeListData) => {
  const { tab, date } = usePagination();
  return (
    <Link
      href={`/reports/income/domain_registration/${props?.id}?tab=daily${tab}&date=${date}`}
    >
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const MonthlyAction = (props: DomainFeeListData) => {
  return (
    <Link href={`/reports/income/domain_registration/daily?date=${props.date}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const YearlyAction = (props: DomainFeeListData) => {
  return (
    <Link
      href={`/reports/income/domain_registration/monthly?date=${props.month}`}
    >
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

export const domainRegistrationFeeDailyColumnDefs: ColumnDef<DomainFeeListData>[] =
  [
    {
      accessorKey: "domain",
      header: "Domain Name",
      cell: ({ row }) => (
        <Link
          href={row?.original?.purchasedDomain ?? ""}
          className="text-brand hover:underline"
        >
          {!row?.original?.purchasedDomain
            ? "-"
            : row?.original?.purchasedDomain}
        </Link>
      ),
    },
    {
      accessorKey: "expiredAt",
      header: "Expired On:",
      cell: ({ row }) => formatDate(row?.original?.domain_expired_at),
    },
    {
      accessorKey: "autoRenew",
      header: "Auto Renw?",
      cell: ({ row }) => (row?.original?.domain_auto_renew ? "Yes" : "No"),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <p className="">{row?.original?.OneSiteUser?.username}</p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Pay On:",
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
          {row?.original?.PaymentStatus?.toLocaleLowerCase()}
        </p>
      ),
    },
    {
      accessorKey: "actions",
      header: "Action",
      cell: ({ row }) => <Action {...row?.original} />,
    },
  ];

export const domainRegistrationFeeMonthlyColumnDefs: ColumnDef<DomainFeeListData>[] =
  [
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

export const domainRegistrationFeeYearlyColumnDefs: ColumnDef<DomainFeeListData>[] =
  [
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

export const domainRegistrationFeeTypeColumnDefs: ColumnDef<DomainFeeTableData>[] =
  [
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
