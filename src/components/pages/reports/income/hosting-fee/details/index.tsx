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
import {
  useGetHostingFeeIncomeMonthlyReport,
  useGetHostingFeeIncomeReport,
} from "@/features/report/income/hosting-fee/services/queries";
import { HostingFeeTableData } from "@/features/report/income/hosting-fee/types";
import {
  hostingFeeDailyColumnDefs,
  hostingFeeTypeColumnDefs,
} from "../components/columnDefs";

const IncomeReportHostingFeeDetail = ({
  type,
}: {
  type: "daily" | "monthly" | "yearly";
}) => {
  const { rowPerPage, pageIndex, date, word, mode, setMode } = usePagination();

  const hostingFeeDaily = useGetHostingFeeIncomeReport({
    date:
      type === "monthly"
        ? dayjs(date).format("YYYY-MM")
        : type === "yearly"
        ? dayjs(date).format("YYYY")
        : date,
    type: type,
    pageIndex,
    rowPerPage,
    word,
    filter: mode === "all" ? "" : mode,
  });

  const hostingFeeMonthly = useGetHostingFeeIncomeMonthlyReport({
    date:
      type === "monthly"
        ? dayjs(date).format("YYYY-MM")
        : type === "yearly"
        ? dayjs(date).format("YYYY")
        : date,
    type: type,
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
      label: type.charAt(0).toUpperCase() + type.slice(1),
      href: `/reports/income?tab=${type}`,
    },
    {
      label: "Hosting Fee",
      href: "",
    },
  ];

  const upperTableData: HostingFeeTableData[] = React.useMemo(
    () => [
      {
        name: "Total Hosting Fee",
        total: hostingFeeDaily?.data?.body?.data?.totalHostingFees?.total ?? 0,
        count: hostingFeeDaily?.data?.body?.data?.totalHostingFees?.count ?? 0,
      },
      {
        name: "New Hosting Fee",
        total: hostingFeeDaily?.data?.body?.data?.newHostingFees?.total ?? 0,
        count: hostingFeeDaily?.data?.body?.data?.newHostingFees?.count ?? 0,
      },
      {
        name: "Renew Hosting Fee",
        total: hostingFeeDaily?.data?.body?.data?.renewHostingFees?.total ?? 0,
        count: hostingFeeDaily?.data?.body?.data?.renewHostingFees?.count ?? 0,
      },
    ],
    [hostingFeeDaily?.data]
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <PageBreadcrumb links={links} enableBack />

      <div className="text-brand normal-text font-semibold mt-2">
        Report{" "}
        {type === "yearly" ? "Year" : type === "monthly" ? "Month" : "Date"} -{" "}
        {type == "monthly"
          ? dayjs(date).format("MMM YYYY")
          : dayjs(date).format("DD MMM YYYY")}
      </div>
      <DataTable
        data={upperTableData ?? []}
        columns={hostingFeeTypeColumnDefs}
        isShowNo={false}
      />
      <div className="mt-4 table-container">
        <DataTable
          isShowNo={false}
          isLoading={
            type == "daily"
              ? hostingFeeDaily.isLoading
              : hostingFeeMonthly.isLoading
          }
          data={
            type == "daily"
              ? hostingFeeDaily?.data?.body?.data?.hostingFeesList ?? []
              : hostingFeeMonthly?.data?.body?.data?.hostingFeesList ?? []
          }
          columns={hostingFeeDailyColumnDefs}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={
            type == "daily"
              ? hostingFeeDaily?.data?.body?.total
              : hostingFeeMonthly?.data?.body?.total
          }
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {type === "yearly" ? (
                <PageTitle className="text-2xl font-semibold flex-1">
                  Hosting Fee Renew
                </PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">
                  Hosting Fee
                </PageTitle>
              )}

              {type === "daily" && (
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <SearchInput
                    placeholder="Search by Domain Name"
                    className="w-full md:w-[300px]"
                  />
                  <Select
                    defaultValue="all"
                    onValueChange={(value) => setMode(value)}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
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

export default IncomeReportHostingFeeDetail;
