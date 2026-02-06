"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { DataTable } from "@/components/shared/data-table";
import { columnDefs } from "./components/columnDefs";
import SearchInput from "@/components/shared/search-input";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetUsers } from "@/features/users/services/queries";

const Users = () => {
  const { query } = usePagination();
  const users = useGetUsers({
    search: query.word,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
  });

  return (
    <div>
      <PageTitle> All Users </PageTitle>
      <div className="table-container">
        <DataTable
          data={users.data?.body?.data ?? []}
          columns={columnDefs}
          total={users.data?.body?.total}
          query={query}
          isLoading={users.isLoading}
          renderHeader={() => (
            <div className="mb-4">
              <SearchInput placeholder="Search by username or ID" />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Users;
