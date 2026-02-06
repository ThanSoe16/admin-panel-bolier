"use client";
import React from "react";
import { DataTable } from "@/components/shared/data-table";
import { UserDomainData } from "@/features/users/types";
import { ColumnDef } from "@tanstack/react-table";
import Status from "@/components/shared/Status";
import dayjs from "dayjs";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetUserDomains } from "@/features/users/services/queries";

const columnDefs: ColumnDef<UserDomainData>[] = [
  {
    accessorKey: "url",
    header: "Domain Name",
    cell: ({ row }) => (
      <a href={"https://" + row?.original?.domain_name} className="text-brand">
        {row?.original?.domain_name}
      </a>
    ),
  },
  {
    accessorKey: "expired_at",
    size: 150,
    header: "Expire On",
    cell: ({ row }) => (
      <span>{dayjs(row?.original?.expired_at).format("DD MMM YYYY")}</span>
    ),
  },
  {
    accessorKey: "status",
    size: 200,
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-row items-center">
        <Status
          showGreenDot={row?.original?.domain_accept === "AVAILABLE"}
          status={row?.original?.domain_accept === "UNAVAILABLE" ? `In Use (${row?.original?.domain_connect_to_project})` : "AVAILABLE"}
        />
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    size: 150,
    header: "Purchased On",
    cell: ({ row }) => (
      <span>{dayjs(row?.original?.updatedAt).format("DD MMM YYYY")}</span>
    ),
  },
];

const Domains = ({ id }: { id: string }) => {
  const { query } = usePagination();
  const domains = useGetUserDomains({
    search: query.word,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
    id: id,
  });

  return (
    <div className="w-[calc(100dvw-50px)] md:w-full">
      <DataTable
        columns={columnDefs}
        data={domains.data?.body?.data ?? []}
        isShowNo
        query={query}
        isLoading={domains.isLoading}
        total={domains.data?.body?.total}
      />
    </div>
  );
};

export default Domains;
