"use client";
import { DataTable } from "@/components/shared/data-table";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { UserPurchasedBlog } from "@/features/users/types";
import dayjs from "dayjs";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetUserBlogs } from "@/features/users/services/queries";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

const columnDefs: ColumnDef<UserPurchasedBlog>[] = [
  {
    accessorKey: "url",
    size: 200,
    header: "Blog Name",
    cell: ({ row }) => (
      <div className="text-brand">
        {row?.original?.BlogNameAndLogo[0]?.name ?? "-"}
      </div>
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
            "w-10 h-10 -ml-[12px] md:w-10 md:h-10 md:-ml-[16px]",
            row?.original?.MerchantBlogStatus === "ACTIVE"
              ? "text-green-500"
              :
              row?.original?.MerchantBlogStatus === "PENDING" ? "text-yellow-500" : "text-red-500"
          )}
        />
        <p className="text-text-primary text-sm -ml-1 capitalize">
          {row?.original?.MerchantBlogStatus}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    size: 200,
    header: "Created On",
    cell: ({ row }) => (
      <span>
        {dayjs(row?.original?.createdAt).format("DD MMM YYYY, hh:mm A")}
      </span>
    ),
  },
  {
    accessorKey: "publishedAt",
    size: 200,
    header: "Published On",
    cell: ({ row }) => (
      <span>
        {row?.original?.publishedAt
          ? dayjs(row?.original?.publishedAt).format("DD MMM YYYY, hh:mm A")
          : "-"}
      </span>
    ),
  },
];

const Blog = ({ id }: { id: string }) => {
  const { query } = usePagination();
  const blogs = useGetUserBlogs({
    search: query.word,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
    id: id,
  });

  return (
    <div className="w-[calc(100dvw-50px)] md:w-full">
      <DataTable
        columns={columnDefs}
        data={blogs?.data?.body?.data ?? []}
        isShowNo
        isLoading={blogs.isLoading}
        query={query}
        total={blogs.data?.body?.total}
      />
    </div>
  );
};

export default Blog;
