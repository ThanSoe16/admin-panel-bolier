"use client";
import SelectBoxFilter from "@/components/shared/base/SelectBoxFilter";
import { DataTable } from "@/components/shared/data-table";
import PageTitle from "@/components/shared/PageTitle";
import SearchInput from "@/components/shared/search-input";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/features/base/hooks/usePagination";
import { LayoutGrid, X } from "lucide-react";
import React from "react";
import { columnDefs, overviewColumnDefs } from "./components/columnDef";
import OverviewMetaBox from "./components/OverviewMetaBox";
import { Loading } from "@/components/shared/loading";
import { parseAsString, useQueryState } from "nuqs";
import { useGetCategories } from "@/features/settings/category/services/queries";
import {
  useGetBlogTemplates,
  useGetTemplateOverview,
} from "@/features/blog-templates/services/queries";

const BlogTemplates = () => {
  const { mode, setMode, pageIndex, rowPerPage } = usePagination();
  const [search] = useQueryState("search", parseAsString);
  const [category] = useQueryState("category");
  const { data, isLoading: fetchingPublishedTemplates } = useGetBlogTemplates({
    search: search ?? "",
    category: category ?? "",
    pageIndex,
    rowPerPage,
  });
  const { data: categories, isLoading: fetchingCategories } = useGetCategories({
    word: "",
    pageIndex: 1,
    rowPerPage: 1000,
  });

  const { data: templateOverview } = useGetTemplateOverview();

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <PageTitle> Manage Template </PageTitle>
        {mode === "overView" ? (
          <Button
            variant={"ghost"}
            className="text-brand hover:text-brand"
            onClick={() => setMode("")}
          >
            Cancel
            <X className="ml-2" />
          </Button>
        ) : (
          <Button
            variant={"ghost"}
            onClick={() => setMode("overView")}
            className="text-brand hover:text-brand"
          >
            Overview
            <LayoutGrid className="ml-2" />
          </Button>
        )}
      </div>

      {mode === "overView" ? (
        <div className="flex flex-col gap-4">
          <OverviewMetaBox />
          <DataTable
            columns={overviewColumnDefs}
            data={templateOverview?.body?.data?.templateByCategories || []}
            isShowNo={false}
            isLoading={fetchingPublishedTemplates}
            // query={{
            //   rowPerPage,
            //   pageIndex,
            // }}
            // total={tem}
          />
        </div>
      ) : (
        <>
          <div className="table-container">
            <DataTable
              columns={columnDefs}
              data={data?.body?.data ?? []}
              isLoading={fetchingPublishedTemplates}
              isShowNo={false}
              renderHeader={() => (
                <div className="flex flex-col md:flex-row flex-grow justify-between items-start md:items-center gap-2">
                  <SearchInput
                    placeholder="Search by template name or ID"
                    className="w-full md:w-[300px]"
                  />
                  {!fetchingCategories && (
                    <SelectBoxFilter
                      arr={[{ label: "All", value: "all" }].concat(
                        categories?.body?.data?.map((item: any) => ({
                          label: item.engName,
                          value: item.id,
                        })) || []
                      )}
                      selectParam="category"
                      classNames="h-11 w-[150px] bg-background rounded-xl"
                    />
                  )}
                </div>
              )}
              query={{
                rowPerPage,
                pageIndex,
              }}
              total={data?.body?.total || 0}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BlogTemplates;
