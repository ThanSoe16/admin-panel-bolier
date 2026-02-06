import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { InvoiceData } from "@/features/invoice/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";

export const columnDefs: ColumnDef<InvoiceData>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice No.",
  },
  {
    accessorKey: "MerchantBlog",
    size: 200,
    header: "Blog Name & Domain",
    cell: ({ row }) => (
      <div>
        <p> {row?.original?.MerchantBlog.BlogNameAndLogo[0]?.name} </p>
        <a
          href={
            !!row?.original?.MerchantBlog.blogDomain
              ? row.original?.MerchantBlog.blogDomain
              : !!row?.original?.MerchantBlog.previewDomain
              ? row?.original?.MerchantBlog.previewDomain
              : "-"
          }
          className="text-brand"
        >
          {!!row?.original?.MerchantBlog.blogDomain
            ? row.original?.MerchantBlog.blogDomain
            : !!row?.original?.MerchantBlog.previewDomain
            ? row?.original?.MerchantBlog.previewDomain
            : "-"}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "OneSiteUser",
    header: "Username",
    cell: ({ row }) => <p> {row?.original?.OneSiteUser.username} </p>,
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice For",
    cell: ({ row }) => dayjs(row?.original?.invoiceFor).format("MMM YYYY"),
  },
  {
    accessorKey: "amount",
    header: "Amt. & Status",
    cell: ({ row }) => (
      <div>
        <p> ${CurrencyFormat(row?.original?.total)} </p>
        <p
          className={`text-sm font-semibold ${
            row.original.InvoiceStatus === "PAID"
              ? " text-green-600"
              : row.original.InvoiceStatus === "UNPAID"
              ? " text-yellow-700"
              : row?.original?.InvoiceStatus == "PENDING"
              ? "text-gray-400"
              : " text-red-600"
          }`}
        >
          {row?.original?.InvoiceStatus == "PAID"
            ? "Paid"
            : row?.original?.InvoiceStatus == "UNPAID"
            ? "Unpaid"
            : row?.original?.InvoiceStatus == "PENDING"
            ? "Draft"
            : "Overdue"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/invoice/${row?.original?.id}`}>
        <TableBaseButton uiType="details"> Details </TableBaseButton>
      </Link>
    ),
  },
];
