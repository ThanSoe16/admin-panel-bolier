"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import CreateButton from "@/components/shared/buttons/CreateButton";
import SearchInput from "@/components/shared/search-input";
import { columnDefs } from "./components/columnDefs";
import CreateModal from "./components/CreateModal";
import { useGetCategories } from "@/features/settings/category/services/queries";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { useOrderCategory } from "@/features/settings/category/services/mutations";
import { DraggableTable } from "@/components/shared/data-table/draggable-table";

const Category = () => {
  const { query } = usePagination();
  const categories = useGetCategories(query);
  const { data: landingLanguages, isLoading } = useGetLandingLanguages();
  const [open, setOpen] = React.useState(false);
  const orderCategory = useOrderCategory();

  return (
    <div className="space-y-4 w-full">
      <PageTitle> Categories </PageTitle>
      <div className="table-container">
        <DraggableTable
          data={categories?.data?.body?.data ?? []}
          columns={columnDefs}
          isLoading={categories.isLoading}
          total={categories.data?.body?.total ?? 0}
          query={query}
          onPositionChange={(data) => {
            const newArr = data.map((item, idx) => ({
              id: String(item.id),
              index: idx + 1,
            }));
            orderCategory.mutate({ items: newArr });
            return;
          }}
          renderHeader={() => (
            <div className="flex flex-row gap-0 md:gap-4 justify-start items-center">
              <CreateButton asBtn onClick={() => setOpen(true)} />
              <SearchInput placeholder="Search by category name" />
            </div>
          )}
        />
      </div>

      {open && landingLanguages?.body?.data && (
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

export default Category;
