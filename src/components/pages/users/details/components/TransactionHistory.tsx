"use client";
import React from "react";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { UserTransaction } from "@/features/users/types";
import Status from "@/components/shared/Status";
import dayjs from "dayjs";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetUserTransactions } from "@/features/users/services/queries";
import { getFeeTypeName, getFeeTypeRoute } from "@/utils/getFeeTypeName";
import { CurrencyFormat } from "@/utils/currencyFormat";
import Link from "next/link";

const columnDefs: ColumnDef<UserTransaction>[] = [
  {
    accessorKey: "FeeType",
    header: "Type",
    cell: ({ row }) => <span>{getFeeTypeName(row?.original?.FeeType)}</span>,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => <span>{row?.original?.content}</span>,
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => (
      <Status
        showGreenDot={row?.original?.PaymentStatus === "SUCCESSFUL"}
        status={row?.original?.PaymentStatus}
      />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span> ${CurrencyFormat(row?.original?.total)}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    size: 200,
    cell: ({ row }) => (
      <span>
        {" "}
        {dayjs(row?.original?.createdAt).format("DD MMM YYYY, HH:mm")}
      </span>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <Link
        href={
          row.original.FeeType == "DOMAIN_REGISTRATION" ||
          row.original.FeeType == "DOMAIN_RENEWAL"
            ? `/users/all/${row.original.oneSiteUserId}/${row?.original?.id}`
            : `${getFeeTypeRoute(row?.original?.FeeType)}/${row?.original?.id}`
        }
      >
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    ),
  },
];

const TransactionHistory = ({ id }: { id: string }) => {
  const { query } = usePagination();
  const userTransactions = useGetUserTransactions({
    search: query.word,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
    id: id,
  });

  return (
    <div className="w-[calc(100dvw-50px)] md:w-full">
      <DataTable
        columns={columnDefs}
        data={userTransactions?.data?.body?.data ?? []}
        isShowNo
        total={userTransactions.data?.body?.total}
        query={query}
        isLoading={userTransactions.isLoading}
      />
    </div>
  );
};

export default TransactionHistory;
