"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { usePagination } from "@/features/base/hooks/usePagination";
import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";
import { useGetTransactionFeeHistory } from "@/features/payment-settings/transaction-fee/servicex/queries";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { historyColDefs } from "./_components/historyColDefs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

const BlogServiceFeeHistory = ({ id }: { id: string }) => {
  const { query, start, end, setStart, setEnd } = usePagination();
  const { data, isLoading } = useGetTransactionFeeHistory({
    id: id,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
    startDate: start ? start : undefined,
    endDate: end ? end : undefined,
  });

  return (
    <div className="space-y-4">
      <PageBreadcrumb
        links={[
          { label: "Transaction Fee", href: "" },
          {
            label: "History",
            href: "",
          },
        ]}
        enableBack
      />
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

      {data?.body?.total == 0 ? (
        <div>
          <FirstTimeContainer
            title={"No history to show yet!"}
            description={"Please select a different time frame."}
            hideBtn
            icon="/settings/history-icon.png"
          />
        </div>
      ) : (
        <div className="table-container-tab">
          <DataTable
            isShowNo={false}
            data={data?.body?.data ?? []}
            columns={historyColDefs}
            total={data?.body?.total}
            query={query}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default BlogServiceFeeHistory;
