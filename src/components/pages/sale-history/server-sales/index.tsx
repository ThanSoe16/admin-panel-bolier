"use client";
import React from "react";
import { DataTable } from "@/components/shared/data-table";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import { columnDefs } from "./components/ColumnDefs";
import SearchInput from "@/components/shared/search-input";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useGetServerSaleHistory } from "@/features/sale-histoy/server/services/queries";
import dayjs from "dayjs";

const ServerSales = () => {
  const { query, start, setStart, end, setEnd, word } = usePagination();
  const { data, isLoading } = useGetServerSaleHistory({
    pageIndex: query?.pageIndex,
    rowPerPage: query?.rowPerPage,
    start: start ? start : undefined,
    end: end ? dayjs(end).endOf("day").toISOString() : undefined,
    word,
  });

  return (
    <div>
      <PageTitle> Server Sales </PageTitle>
      <div className="table-container">
        <DataTable
          isShowNo={false}
          data={data?.body?.data ?? []}
          columns={columnDefs}
          total={data?.body?.total}
          query={query}
          isLoading={isLoading}
          renderHeader={() => (
            <div className="w-full flex flex-col md:flex-row flex-grow items-start md:items-center justify-between gap-2">
              <SearchInput placeholder="Search by username" />
              <DatePickerWithRange
                value={
                  start
                    ? {
                        from: new Date(start),
                        to: end ? new Date(end) : undefined,
                      }
                    : undefined
                }
                onChange={(range) => {
                  setStart(range?.from ? range?.from?.toISOString() : null);
                  setEnd(range?.to ? range?.to?.toISOString() : null);
                }}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ServerSales;
