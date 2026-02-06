"use client";
import React from "react";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/dateTime";
import { BlogSiteSaleHistoryResponse } from "@/features/sale-histoy/blog-site/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import Status from "@/components/shared/Status";

const Actions = (props: { target: BlogSiteSaleHistoryResponse }) => {
  return (
    <div>
      <Link href={`/sale-history/blog-site/${props?.target?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    </div>
  );
};

export const columnDefs: ColumnDef<BlogSiteSaleHistoryResponse>[] = [
  {
    accessorKey: "blog.name",
    header: "Blog Name",
    cell: ({ row }) => (
      <p>{row?.original?.MerchantBlog?.BlogNameAndLogo[0]?.name ?? "-"}</p>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => <p>{row?.original?.OneSiteUser?.username ?? "-"}</p>,
  },
  {
    accessorKey: "template.name",
    header: "Template Name",
    cell: ({ row }) => (
      <p>{row?.original?.MerchantBlog?.Template?.name ?? "-"}</p>
    ),
  },
  {
    accessorKey: "total",
    header: "Total Price",
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.total)}</p>,
  },
  {
    accessorKey: "createdAt",
    size: 150,
    header: "Created Date",
    cell: ({ row }) => <p>{formatDate(row?.original?.createdAt)}</p>,
  },
  {
    accessorKey: "status",
    size: 150,
    header: "Status",
    cell: ({ row }) => (
      <Status
        showGreenDot={row?.original?.PaymentStatus === "SUCCESSFUL"}
        status={row?.original?.PaymentStatus?.toLocaleLowerCase() ?? "Failed"}
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
