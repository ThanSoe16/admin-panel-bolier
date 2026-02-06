"use client";
import React from "react";
import CreateButton from "@/components/shared/buttons/CreateButton";
import PageTitle from "@/components/shared/PageTitle";
import SearchInput from "@/components/shared/search-input";
import { columnDefs } from "./components/columnDefs";
import CreateModal from "./components/CreateModal";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetSubCategories } from "@/features/sub-category/services/queries";
import { DraggableTable } from "@/components/shared/data-table/draggable-table";
import { useOrderSubCategory } from "@/features/sub-category/services/mutations";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { Flex } from "@radix-ui/themes";
import SelectBoxFilter from "@/components/shared/base/SelectBoxFilter";
import { useGetCategories } from "@/features/settings/category/services/queries";
import { useQueryState } from "nuqs";
import useGetLandingEngLanguageId from "@/features/base/hooks/useGetLandingEngLanguageId";

const SubCategory = () => {
  const { query } = usePagination();
  const [category] = useQueryState("category");
  const subCategories = useGetSubCategories({
    categoryId: category == "all" ? "" : category ?? "",
    word: query?.word,
    pageIndex: query?.pageIndex,
    rowPerPage: query?.rowPerPage,
  });
  const categories = useGetCategories(query);
  const { data: landingLanguages, isLoading } = useGetLandingLanguages();
  const [open, setOpen] = React.useState(false);
  const orderCategory = useOrderSubCategory();
  const defaultLanguageId = useGetLandingEngLanguageId();

  const categoryStatus = [
    { label: "All Categories", value: "all" },
    ...(categories.data?.body?.data?.map((item) => ({
      label: item.TemplateCategoryContent?.find(
        (lang) => lang.languageId === defaultLanguageId
      )?.name,
      value: item.id,
    })) ?? []),
  ];

  return (
    <div className="space-y-4">
      <PageTitle> Sub Categories </PageTitle>

      <div className="table-container">
        <DraggableTable
          data={subCategories?.data?.body?.data ?? []}
          columns={columnDefs}
          isLoading={subCategories.isLoading}
          query={query}
          total={subCategories?.data?.body?.total ?? 0}
          onPositionChange={(data) => {
            const newArr = data.map((item, idx) => ({
              id: String(item.id),
              index: idx + 1,
            }));
            orderCategory.mutate({ items: newArr });
            return;
          }}
          isShowNo={false}
          renderHeader={() => (
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-start items-start md:items-center">
              {" "}
              <div className="flex flex-col md:flex-row flex-grow gap-0 md:gap-4 justify-start items-center">
                <CreateButton asBtn onClick={() => setOpen(true)} />
                <SearchInput placeholder="Search by sub category name" />
              </div>
              <div className="w-[200px]">
                {categoryStatus && (
                  <SelectBoxFilter
                    arr={categoryStatus}
                    selectParam="category"
                  />
                )}
              </div>
            </div>
          )}
        />
      </div>

      {open && (
        <CreateModal
          open={open}
          handleClose={() => setOpen(false)}
          languages={landingLanguages?.body?.data ?? []}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default SubCategory;
