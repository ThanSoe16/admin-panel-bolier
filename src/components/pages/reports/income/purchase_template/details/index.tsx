"use client";
import React from "react";
import dayjs from "dayjs";
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
import {
  useGetTemplateIncomeMonthlyReport,
  useGetTemplateIncomeReport,
} from "@/features/report/income/purchase-templates/services/queries";
import { useGetCategories } from "@/features/settings/category/services/queries";
import {
  purchaseTemplateCategoryColumnDefs,
  purchaseTemplateDailyColumnDefs,
} from "../components/columnDefs";

const IncomeReportPurchaseTemplateDetail = ({
  type,
}: {
  type: "daily" | "monthly" | "yearly";
}) => {
  const { rowPerPage, pageIndex, date, word, mode, setMode } = usePagination();

  const dailyReports = useGetTemplateIncomeReport({
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
    category: mode === "all" ? "" : mode,
  });

  const monthlyReports = useGetTemplateIncomeMonthlyReport({
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
    category: mode === "all" ? "" : mode,
  });
  const categories = useGetCategories({});

  const links = [
    {
      label: "Income Report",
      href: "/reports/income",
    },
    {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      href:
        type == "daily"
          ? `/reports/income?tab=${type}`
          : `/reports/income?tab=${type}`,
    },
    {
      label: "Purchase Template",
      href: "",
    },
  ];

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
        data={dailyReports.data?.body?.data?.templateSales ?? []}
        columns={purchaseTemplateCategoryColumnDefs}
        isShowNo={false}
      />
      <div className="mt-4 table-container">
        <DataTable
          isShowNo={false}
          isLoading={
            type == "daily" ? dailyReports.isLoading : monthlyReports.isLoading
          }
          data={
            type == "daily"
              ? dailyReports.data?.body?.data?.purchasedTemplatesList ?? []
              : monthlyReports.data?.body?.data?.purchasedTemplatesList ?? []
          }
          columns={purchaseTemplateDailyColumnDefs}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={
            type == "daily"
              ? dailyReports.data?.body?.total ?? 0
              : monthlyReports.data?.body?.total ?? 0
          }
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {type === "yearly" ? (
                <PageTitle className="text-2xl font-semibold flex-1">
                  Purchased Templates
                </PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">
                  Buy Templates List
                </PageTitle>
              )}

              {type === "daily" && (
                <div className="flex flex-col md:flex-row gap-3">
                  <SearchInput
                    placeholder="Search by template name or ID"
                    className="w-full md:w-[300px]"
                  />
                  <Select
                    defaultValue="all"
                    onValueChange={(value) => setMode(value)}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories?.data?.body?.data?.map((data) => (
                        <SelectItem key={data?.id} value={data?.id}>
                          {data?.engName}
                        </SelectItem>
                      ))}
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

export default IncomeReportPurchaseTemplateDetail;
