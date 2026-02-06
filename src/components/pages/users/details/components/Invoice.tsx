"use client";
import { DataTable } from "@/components/shared/data-table";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import Link from "next/link";
import SearchInput from "@/components/shared/search-input";
import MonthPicker from "@/components/ui/month-picker";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetUserInvoices } from "@/features/invoice/services/queries";
import { parseAsString, useQueryState } from "nuqs";
import { InvoiceData } from "@/features/invoice/types";
import { CurrencyFormat } from "@/utils/currencyFormat";

const columnDefs: ColumnDef<InvoiceData>[] = [
  {
    accessorKey: "url",
    header: "Blog Name & Domain",
    cell: ({ row }) => (
      <div>
        <p> {row?.original?.MerchantBlog.BlogNameAndLogo[0]?.name} </p>
        <a
          href={row?.original?.MerchantBlog.blogDomain ?? "-"}
          className="text-brand"
        >
          {row?.original?.MerchantBlog.blogDomain}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    size: 150,
    header: "Month",
    cell: ({ row }) => (
      <span>{dayjs(row?.original?.createdAt).format("MMM YYYY")}</span>
    ),
  },
  {
    accessorKey: "status",
    size: 200,
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-row items-center">
        <Dot
          className={cn(
            "w-8 h-8 -ml-[12px] md:w-10 md:h-10 md:-ml-[16px]",
            row?.original?.InvoiceStatus === "PAID"
              ? "text-green-500"
              : row?.original?.InvoiceStatus === "UNPAID"
              ? "text-yellow-500"
              : "text-red-500"
          )}
        />
        <p className="text-text-primary text-sm -ml-1">
          {" "}
          {row?.original?.InvoiceStatus == "PAID"
            ? "Paid"
            : row?.original?.InvoiceStatus == "UNPAID"
            ? "Unpaid"
            : "Overdue"}{" "}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span> ${CurrencyFormat(row?.original?.total)}</span>,
  },
  {
    accessorKey: "d",
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/invoice/${row?.original?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    ),
  },
];

const Invoice = ({ id }: { id: string }) => {
  const { query } = usePagination();
  const [month, setMonth] = useQueryState(
    "month",
    parseAsString.withDefault(`${dayjs().startOf("month").format("YYYY-MM")}`)
  );
  const userInvoices = useGetUserInvoices({
    userId: id,
    word: query?.word,
    pageIndex: query?.pageIndex,
    rowPerPage: query?.rowPerPage,
    month: dayjs(month).startOf("month").format("YYYY-MM"),
  });
  return (
    <div className="w-[calc(100dvw-50px)] md:w-full">
      <DataTable
        columns={columnDefs}
        data={userInvoices?.data?.body?.data ?? []}
        isShowNo
        total={userInvoices?.data?.body?.total}
        query={query}
        renderHeader={() => (
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 w-full gap-4">
            <SearchInput />
            <div className="">
              <MonthPicker
                enableMonth
                date={month ? new Date(month) : new Date()}
                onChange={(e) =>
                  setMonth(dayjs(e).startOf("month").toISOString())
                }
                className="w-[150px] h-[44px]"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Invoice;
