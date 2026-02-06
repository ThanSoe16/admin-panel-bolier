"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import { DataTable } from "@/components/shared/data-table";
import SearchInput from "@/components/shared/search-input";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { useGetMaintainFeeIncomeReport } from "@/features/report/income/maintain-fee/services/queries";
import {
  maintainFeeDailyColumnDefs,
  maintainFeeMonthlyColumnDefs,
  maintainFeeTypeColumnDefs,
  maintainFeeYearlyColumnDefs,
} from "./components/columnDefs";
import { MaintainFeeTableData } from "@/features/report/income/maintain-fee/types";

const IncomeReportMaintainFee = () => {
  const { rowPerPage, pageIndex, tab, date, word, mode, setMode } =
    usePagination();

  const { data, isLoading } = useGetMaintainFeeIncomeReport({
    date:
      tab === "monthly"
        ? dayjs(date).format("YYYY-MM")
        : tab === "yearly"
        ? dayjs(date).format("YYYY")
        : date,
    type: tab,
    pageIndex,
    rowPerPage,
    word,
    filter: mode === "all" ? "" : mode,
  });

  const links = [
    {
      label: "Income Report",
      href: "/reports/income",
    },
    {
      label: tab.charAt(0).toUpperCase() + tab.slice(1),
      href: `/reports/income?tab=${tab}`,
    },
    {
      label: "Maintain Fee",
      href: "",
    },
  ];

  const upperTableData: MaintainFeeTableData[] = React.useMemo(
    () => [
      {
        name: "Total Maintain Fee",
        total: data?.body?.data?.totalMaintainFees?.total ?? 0,
        count: data?.body?.data?.totalMaintainFees?.count ?? 0,
      },
      {
        name: "New Maintain Fee",
        total: data?.body?.data?.newMaintainFees?.total ?? 0,
        count: data?.body?.data?.newMaintainFees?.count ?? 0,
      },
      {
        name: "Renew Maintain Fee",
        total: data?.body?.data?.renewMaintainFees?.total ?? 0,
        count: data?.body?.data?.renewMaintainFees?.count ?? 0,
      },
    ],
    [data]
  );

  const currentDataTable = React.useMemo(() => {
    switch (tab) {
      case "monthly":
        return {
          data: data?.body?.data?.maintainFeesList ?? [],
          columns: maintainFeeMonthlyColumnDefs,
        };
      case "yearly":
        return {
          data: data?.body?.data?.maintainFeesList ?? [],
          columns: maintainFeeYearlyColumnDefs,
        };
      default:
        return {
          data: data?.body?.data?.maintainFeesList ?? [],
          columns: maintainFeeDailyColumnDefs,
        };
    }
  }, [tab, data]);

  return (
    <div className="flex flex-col w-full gap-4">
      <PageBreadcrumb links={links} enableBack />

      <div className="text-brand normal-text font-semibold mt-2">
        Report{" "}
        {tab === "yearly" ? "Year" : tab === "monthly" ? "Month" : "Date"} -{" "}
        {dayjs(date).format(
          tab === "yearly"
            ? "YYYY"
            : tab === "monthly"
            ? "MMM YYYY"
            : "DD MMM YYYY"
        )}
      </div>
      <DataTable
        data={upperTableData ?? []}
        columns={maintainFeeTypeColumnDefs}
        isShowNo={false}
      />
      <div className="mt-4">
        <DataTable
          isShowNo={false}
          isLoading={isLoading}
          data={currentDataTable?.data}
          columns={currentDataTable?.columns}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={data?.body?.total}
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {tab === "yearly" ? (
                <PageTitle className="text-2xl font-semibold flex-1">
                  Maintain Fee Renew
                </PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">
                  Maintain Fee
                </PageTitle>
              )}

              {tab === "daily" && (
                <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
                  <SearchInput
                    placeholder="Search by User Name"
                    className="w-full md:w-[65%]"
                  />
                  <Select
                    defaultValue="all"
                    onValueChange={(value) => setMode(value)}
                  >
                    <SelectTrigger className="w-full md:w-[35%]">
                      <SelectValue placeholder="Select Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="renew">Renew</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IncomeReportMaintainFee;
