"use client";
import dayjs from "dayjs";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { DataTable } from "@/components/shared/data-table";
import TopFilters from "../components/TopFilters";
import { DetailTable } from "@/components/shared/detail-table";
import {
  popularTemplateColumnDefs,
  todaySaleTemplateColumnDefs,
  monthlySaleTemplateColumnDefs,
  yearlySaleTemplateColumnDefs,
} from "./components/columnDefs";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetTemplateReport } from "@/features/report/template/services/queries";

const TemplateReport = () => {
  const { date, tab } = usePagination();
  const { data, isLoading } = useGetTemplateReport({
    date:
      tab === "monthly"
        ? dayjs(date).format("YYYY-MM")
        : tab === "yearly"
        ? dayjs(date).format("YYYY")
        : date,
    type: tab ?? "daily",
  });

  const detailTableData = React.useMemo(() => {
    const templateCategories = [
      {
        label: "Total Categories",
        value: data?.body?.data?.totalCategories,
      },
    ];

    const otherCategories =
      data?.body?.data?.templateCategories?.map((category) => ({
        label: category.name,
        value: category.totalTemplates,
      })) || [];

    return [...templateCategories, ...otherCategories];
  }, [data]);

  const currentDataTable = React.useMemo(() => {
    switch (tab) {
      case "monthly":
        return {
          data: data?.body?.data?.templateSaleList ?? [],
          columns: monthlySaleTemplateColumnDefs,
          isShowNo: false,
          header: <PageTitle>All Templates</PageTitle>,
        };
      case "yearly":
        return {
          data: data?.body?.data?.templateSaleList ?? [],
          columns: yearlySaleTemplateColumnDefs,
          isShowNo: false,
          header: <PageTitle>All Templates</PageTitle>,
        };
      default:
        return {
          data: data?.body?.data?.todtodayTemplateSaleList ?? [],
          columns: todaySaleTemplateColumnDefs,
          isShowNo: false,
          header: <PageTitle>Today Sale Templates</PageTitle>,
        };
    }
  }, [tab, data]);

  return (
    <div className="flex flex-col w-full gap-4">
      <PageTitle> Template Report </PageTitle>

      <TopFilters />

      <DetailTable data={detailTableData} title="Categories" />
      {tab === "daily" && (
        <div className="w-[calc(100dvw-65px)] md:w-full">
          <DataTable
            isLoading={isLoading}
            data={data?.body?.data?.popularTemplates ?? []}
            columns={popularTemplateColumnDefs}
            renderHeader={() => <PageTitle>Top 3 Popular Templates</PageTitle>}
          />
        </div>
      )}
      <div className="w-[calc(100dvw-65px)] md:w-full">
        <DataTable
          isLoading={isLoading}
          data={currentDataTable.data}
          columns={currentDataTable.columns}
          isShowNo={currentDataTable.isShowNo}
          renderHeader={() => currentDataTable.header}
        />
      </div>
    </div>
  );
};

export default TemplateReport;
