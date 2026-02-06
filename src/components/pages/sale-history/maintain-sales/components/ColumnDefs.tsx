"use client";
import React from "react";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/dateTime";
import { MaintainSaleHistoryResponse } from "@/features/sale-histoy/maintain/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import Status from "@/components/shared/Status";

const Actions = (props: { target: MaintainSaleHistoryResponse }) => {
  return (
    <div>
      <Link href={`/sale-history/maintain/${props?.target?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    </div>
  );
};

export const columnDefs: ColumnDef<MaintainSaleHistoryResponse>[] = [
  {
    accessorKey: "username",
    header: "Username",
    size: 150,
    cell: ({ row }) => (
      <p>{row?.original?.MerchantBlog?.OneSiteUser?.username}</p>
    ),
  },
  {
    accessorKey: "blog",
    header: "Blog Name & Domain",
    size: 200,
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <p className="line-clamp-1">
          {row?.original?.MerchantBlog?.BlogNameAndLogo[0]?.name ?? "-"}
        </p>
        <Link
          href={row?.original?.MerchantBlog?.blogDomain ?? ""}
          target="_blank"
          className="text-brand hover:underline line-clamp-1"
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
    header: "Renewed on",
    size: 200,
    cell: ({ row }) => (
      <p>
        {row?.original?.paidDate
          ? formatDate(row?.original?.paidDate ?? "")
          : "-"}
      </p>
    ),
  },
  {
    accessorKey: "maintenance.billingPeriod.startDate",
    header: "Billing Period",
    size: 300,
    cell: ({ row }) => (
      <p>
        {formatDate(row?.original?.initialDate ?? "")} -{" "}
        {formatDate(row?.original?.dueDate ?? "")}
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
