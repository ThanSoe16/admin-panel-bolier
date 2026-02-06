"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import { DataTable } from "@/components/shared/data-table";
import SearchInput from "@/components/shared/search-input";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import dayjs from "dayjs";
import { useGetDomainRegistrationFeeIncomeReport } from "@/features/report/income/domain-fee/services/queries";
import {
  domainRegistrationFeeDailyColumnDefs,
  domainRegistrationFeeMonthlyColumnDefs,
  domainRegistrationFeeTypeColumnDefs,
  domainRegistrationFeeYearlyColumnDefs,
} from "./components/columnDefs";
import { DomainFeeTableData } from "@/features/report/income/domain-fee/types";

const IncomeReportDomainRegistrationFee = () => {
  const { rowPerPage, pageIndex, tab, date, word } = usePagination();

  const { data, isLoading } = useGetDomainRegistrationFeeIncomeReport({
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
      label: "Domain Registration Fee",
      href: "",
    },
  ];

  const upperTableData: DomainFeeTableData[] = React.useMemo(
    () => [
      {
        name: "Total DomainRegistration Fee",
        total: data?.body?.data?.totalDomainRegistrationFees?.total ?? 0,
        count: data?.body?.data?.totalDomainRegistrationFees?.count ?? 0,
      },
      {
        name: "New DomainRegistration Fee",
        total: data?.body?.data?.newDomainRegistrationFees?.total ?? 0,
        count: data?.body?.data?.newDomainRegistrationFees?.count ?? 0,
      },
    ],
    [data]
  );

  const currentDataTable = React.useMemo(() => {
    switch (tab) {
      case "monthly":
        return {
          data: data?.body?.data?.domainRegisteredList ?? [],
          columns: domainRegistrationFeeMonthlyColumnDefs,
        };
      case "yearly":
        return {
          data: data?.body?.data?.domainRegisteredList ?? [],
          columns: domainRegistrationFeeYearlyColumnDefs,
        };
      default:
        return {
          data: data?.body?.data?.domainRegisteredList ?? [],
          columns: domainRegistrationFeeDailyColumnDefs,
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
        columns={domainRegistrationFeeTypeColumnDefs}
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
                  Domain Registration Fee Renew
                </PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">
                  Domain Registration Fee
                </PageTitle>
              )}

              {tab === "daily" && (
                <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 max-w-[340px]">
                  <SearchInput
                    placeholder="Search by Domain Name"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IncomeReportDomainRegistrationFee;
