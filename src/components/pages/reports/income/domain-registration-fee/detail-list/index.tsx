"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import { DataTable } from "@/components/shared/data-table";
import SearchInput from "@/components/shared/search-input";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import dayjs from "dayjs";
import {
  useGetDomainRegistrationFeeIncomeMonthlyReport,
  useGetDomainRegistrationFeeIncomeReport,
} from "@/features/report/income/domain-fee/services/queries";
import { DomainFeeTableData } from "@/features/report/income/domain-fee/types";
import {
  domainRegistrationFeeDailyColumnDefs,
  domainRegistrationFeeTypeColumnDefs,
} from "../components/columnDefs";

const IncomeReportDomainRegistrationFeeDetail = ({
  type,
}: {
  type: "daily" | "monthly" | "yearly";
}) => {
  const { rowPerPage, pageIndex, date, word } = usePagination();

  const domainDaily = useGetDomainRegistrationFeeIncomeReport({
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
  });

  const domainMonthly = useGetDomainRegistrationFeeIncomeMonthlyReport({
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
      label: "Domain Registration Fee",
      href: "",
    },
  ];

  const upperTableData: DomainFeeTableData[] = React.useMemo(
    () => [
      {
        name: "Total DomainRegistration Fee",
        total:
          domainDaily?.data?.body?.data?.totalDomainRegistrationFees?.total ??
          0,
        count:
          domainDaily?.data?.body?.data?.totalDomainRegistrationFees?.count ??
          0,
      },
      {
        name: "New DomainRegistration Fee",
        total:
          domainDaily?.data?.body?.data?.newDomainRegistrationFees?.total ?? 0,
        count:
          domainDaily?.data?.body?.data?.newDomainRegistrationFees?.count ?? 0,
      },
    ],
    [domainDaily?.data]
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
        columns={domainRegistrationFeeTypeColumnDefs}
        isShowNo={false}
      />
      <div className="mt-4">
        <DataTable
          isShowNo={false}
          isLoading={
            type == "daily" ? domainDaily.isLoading : domainMonthly.isLoading
          }
          data={
            type == "daily"
              ? domainDaily.data?.body?.data.domainRegisteredList ?? []
              : domainMonthly.data?.body?.data.domainRegisteredList ?? []
          }
          columns={domainRegistrationFeeDailyColumnDefs}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={
            type == "daily"
              ? domainDaily.data?.body?.total
              : domainMonthly.data?.body?.total
          }
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {type === "yearly" ? (
                <PageTitle className="text-2xl font-semibold flex-1">
                  Domain Registration Fee Renew
                </PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">
                  Domain Registration Fee
                </PageTitle>
              )}

              {type === "daily" && (
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

export default IncomeReportDomainRegistrationFeeDetail;
