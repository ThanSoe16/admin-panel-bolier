"use client";
import React from "react";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/dateTime";
import { ServerSaleHistoryResponse } from "@/features/sale-histoy/server/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import Status from "@/components/shared/Status";
import dayjs from "dayjs";

const Actions = (props: { target: ServerSaleHistoryResponse }) => {
  return (
    <div>
      <Link href={`/sale-history/server/${props?.target?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    </div>
  );
};

export const columnDefs: ColumnDef<ServerSaleHistoryResponse>[] = [
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <p>{row?.original?.MerchantBlog?.OneSiteUser?.username}</p>
    ),
  },
  {
    accessorKey: "blog",
    header: "Blog Name & Domain",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <p>{row?.original?.MerchantBlog?.BlogNameAndLogo[0]?.name ?? "-"}</p>
        <Link
          href={row?.original?.MerchantBlog?.blogDomain ?? ""}
          target="_blank"
          className="text-brand hover:underline"
        >
          {row?.original?.MerchantBlog?.blogDomain ?? "-"}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Fee",
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.total ?? 0)}</p>,
  },
  {
    accessorKey: "paidDate",
    header: "Started on",
    size: 150,
    cell: ({ row }) => (
      <p>
        {row?.original?.paidDate
          ? formatDate(row?.original?.paidDate ?? "")
          : "-"}
      </p>
    ),
  },
  {
    accessorKey: "month",
    header: "Month",
    size: 150,
    cell: ({ row }) => (
      <p>
        {row?.original?.paidDate
          ? dayjs(row?.original?.paidDate).format("MMMM")
          : "-"}
      </p>
    ),
  },
  {
    accessorKey: "status",
    size: 150,
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-row items-center">
        <Status
          showGreenDot={row?.original?.MerchantBlogBillingStatus === "PAID"}
          status={
            row?.original?.MerchantBlogBillingStatus === "PAID"
              ? "Successful"
              : "Pending"
          }
        />
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
