"use client";
import React from "react";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/dateTime";
import { HostingSaleHistoryResponse } from "@/features/sale-histoy/hosting/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import Status from "@/components/shared/Status";

const Actions = (props: { target: HostingSaleHistoryResponse }) => {
  return (
    <div>
      <Link href={`/sale-history/hosting/${props?.target?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    </div>
  );
};

export const columnDefs: ColumnDef<HostingSaleHistoryResponse>[] = [
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <p>{row?.original?.MerchantBlog?.OneSiteUser?.username ?? "-"}</p>
    ),
  },
  {
    accessorKey: "blog.name",
    header: "Blog Name",
    cell: ({ row }) => (
      <p>{row?.original?.MerchantBlog?.BlogNameAndLogo[0]?.name ?? "-"}</p>
    ),
  },
  {
    accessorKey: "total",
    header: "Price",
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.total ?? 0)}</p>,
  },
  {
    accessorKey: "paidDate",
    size: 150,
    header: "Created Date",
    cell: ({ row }) => (
      <p>
        {row?.original?.paidDate ? formatDate(row?.original?.paidDate) : "-"}
      </p>
    ),
  },
  {
    accessorKey: "status",
    size: 150,
    header: "Status",
    cell: ({ row }) => (
      <Status
        showGreenDot={row?.original?.MerchantBlogBillingStatus === "PAID"}
        status={
          row?.original?.MerchantBlogBillingStatus == "PAID"
            ? "Successful"
            : "Pending"
        }
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
