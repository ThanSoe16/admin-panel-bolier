"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ExchangeRateHistoryData } from "@/features/payment-settings/exchange-rate-service/types";
import { Flex } from "@radix-ui/themes";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";

export const rateHistoryColDefs: ColumnDef<ExchangeRateHistoryData>[] = [
  {
    accessorKey: "currencyCode",
    header: "Currency",
    size: 150,
    cell: ({ row }) => (
      <Flex align={"center"} className="gap-2">
        <ProfileAvatar
          name={row.original?.Currency?.BaseCurrency?.currencyCode?.charAt(0)}
          photo={row.original?.Currency?.BaseCurrency?.File?.url}
          className="rounded-lg"
        />
        <div className="space-y-1">
          <p>{row.original.Currency?.BaseCurrency?.currencyCode}</p>
          <p>{row.original.Currency?.BaseCurrency?.iso4217}</p>
        </div>
      </Flex>
    ),
  },
  {
    accessorKey: "exchangeRate",
    header: "Exchange Rate",
    size: 200,
    cell: ({ row }) => (
      <div>
        <span className="text-primary font-bold">
          {row.original.Currency?.BaseCurrency?.currencyCode}{" "}
          {CurrencyFormat(row.original.exchangeRate)}
        </span>{" "}
        / $
      </div>
    ),
  },
  {
    accessorKey: "exchangeServiceFee",
    header: "Exchange Service Fee",
    size: 200,
    cell: ({ row }) => (
      <div>
        <span className="text-primary font-bold">
          {row.original.Currency?.BaseCurrency?.currencyCode}{" "}
          {CurrencyFormat(row.original.exchangeServiceFee)}
        </span>{" "}
        / $
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Started Date",
    size: 200,
    cell: ({ row }) => (
      <span>
        {row.original.createdAt ? formatDate(row.original.createdAt) : "-"}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Ended Date",
    size: 200,
    cell: ({ row }) => (
      <span>
        {row.original.updatedAt ? formatDate(row.original.updatedAt) : "-"}
      </span>
    ),
  },
];
