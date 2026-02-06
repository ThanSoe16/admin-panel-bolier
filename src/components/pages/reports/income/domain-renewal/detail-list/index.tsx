"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import { DataTable } from "@/components/shared/data-table";
import SearchInput from "@/components/shared/search-input";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import dayjs from "dayjs";
import {
  useGetDomainRenewalFeeIncomeMonthlyReport,
  useGetDomainRenewalFeeIncomeReport,
} from "@/features/report/income/domain-fee/services/queries";
import { DomainFeeTableData } from "@/features/report/income/domain-fee/types";
import {
  domainRenewalFeeDailyColumnDefs,
  domainRenewalFeeTypeColumnDefs,
} from "../components/columnDefs";

const IncomeReportDomainRenewalFeeDetail = ({
  type,
}: {
  type: "daily" | "monthly" | "yearly";
}) => {
  const { rowPerPage, pageIndex, date, word } = usePagination();

  const domainRenewalDetail = useGetDomainRenewalFeeIncomeReport({
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

  const domainRenewalMonthly = useGetDomainRenewalFeeIncomeMonthlyReport({
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
      label: "Domain Renewal Fee",
      href: "",
    },
  ];

  const upperTableData: DomainFeeTableData[] = React.useMemo(
    () => [
      {
        name: "Total DomainRenewal Fee",
        total:
          domainRenewalDetail?.data?.body?.data?.totalDomainRenewalFees
            ?.total ?? 0,
        count:
          domainRenewalDetail?.data?.body?.data?.totalDomainRenewalFees
            ?.count ?? 0,
      },
      {
        name: "New DomainRenewal Fee",
        total:
          domainRenewalDetail?.data?.body?.data?.newDomainRenewalFees?.total ??
          0,
        count:
          domainRenewalDetail?.data?.body?.data?.newDomainRenewalFees?.count ??
          0,
      },
    ],
    [domainRenewalDetail?.data]
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
        columns={domainRenewalFeeTypeColumnDefs}
        isShowNo={false}
      />
      <div className="mt-4">
        <DataTable
          isShowNo={false}
          isLoading={
            type == "daily"
              ? domainRenewalDetail.isLoading
              : domainRenewalMonthly.isLoading
          }
          data={
            type == "daily"
              ? domainRenewalDetail?.data?.body?.data?.domainRenewalList ?? []
              : domainRenewalMonthly?.data?.body?.data?.domainRenewalList ?? []
          }
          columns={domainRenewalFeeDailyColumnDefs}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={
            type == "daily"
              ? domainRenewalDetail?.data?.body?.total
              : domainRenewalMonthly?.data?.body?.total
          }
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {type === "yearly" ? (
                <PageTitle className="text-2xl font-semibold flex-1">
                  Domain Renewal Fee Renew
                </PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">
                  Domain Renewal Fee
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

export default IncomeReportDomainRenewalFeeDetail;
