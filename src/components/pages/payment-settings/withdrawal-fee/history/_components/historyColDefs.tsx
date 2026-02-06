"use client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate, formatMonth } from "@/utils/dateTime";
import { WithdrawFeeData } from "@/features/payment-settings/transaction-fee/types";
import { CurrencyFormat } from "@/utils/currencyFormat";

export const historyColDefs: ColumnDef<WithdrawFeeData>[] = [
  {
    accessorKey: "fee",
    header: "Fee Per Transaction",
    size: 250,
    cell: ({ row }) => (
      <div>
        {CurrencyFormat(row.original.amount)}{" "}
        {row.original.feeType == "PERCENTAGE" ? "%" : "MMK"}
      </div>
    ),
  },
  {
    accessorKey: "lastModifyDate",
    header: "From",
    size: 150,
    cell: ({ row }) => (
      <span>
        {row.original.lastModifyDate
          ? formatMonth(row.original.lastModifyDate)
          : "-"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "To",
    size: 150,
    cell: ({ row }) => (
      <span>
        {row.original.createdAt ? formatMonth(row.original.createdAt) : "-"}
      </span>
    ),
  },

  {
    accessorKey: "updatedAt",
    header: "Updated on",
    size: 200,
    cell: ({ row }) => (
      <span>
        {row.original.updatedAt ? formatDate(row.original.updatedAt) : "-"}
      </span>
    ),
  },
];
