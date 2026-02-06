"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import { formatDate, formatMonth } from "@/utils/dateTime";
import {
  TransactionFeeData,
  TransactionFeeHistoryData,
} from "@/features/payment-settings/transaction-fee/types";
import { Flex } from "@radix-ui/themes";
import { CurrencyFormat } from "@/utils/currencyFormat";

export const historyColDefs: ColumnDef<TransactionFeeHistoryData>[] = [
  {
    accessorKey: "name",
    header: "Payment Method",
    size: 250,
    cell: ({ row }) => (
      <Flex align={"center"} className="gap-2">
        <ProfileAvatar
          name={row.original.MembershipPaymentMethod.name}
          photo={row.original.MembershipPaymentMethod.File?.url}
        />
        <p className="text-sm">{row.original.MembershipPaymentMethod.name}</p>
      </Flex>
    ),
  },
  {
    accessorKey: "fee",
    header: "Fee Per Transaction (%)",
    size: 250,
    cell: ({ row }) => (
      <div>
        {CurrencyFormat(row.original.amount)}{" "}
        {row.original.trxFeeType == "PERCENTAGE" ? "%" : "MMK"}
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
