"use client";
import React from "react";
import { useGetContactUsForms } from "@/features/contact-us-forms/services/queries";
import PageTitle from "@/components/shared/PageTitle";
import { DataTable } from "@/components/shared/data-table";
import { columnDefs } from "./components/columnDefs";
import SearchInput from "@/components/shared/search-input";
import { usePagination } from "@/features/base/hooks/usePagination";
import { Flex } from "@radix-ui/themes";
import { toast } from "sonner";

const ContactUsForms = () => {
  const { query } = usePagination();

  const { data, isLoading, isError, error } = useGetContactUsForms(query);

  if (isError) {
    const errorResponse: any = error;
    toast.error(
      errorResponse?.response?.data?.meta?.message || "Something Went Wrong"
    );
  }

  return (
    <div>
      <PageTitle> Contact Us Forms </PageTitle>
      <div className="table-container">
        <DataTable
          data={data?.body?.data ?? []}
          isShowNo={false}
          columns={columnDefs}
          total={data?.body?.total}
          query={query}
          isLoading={isLoading}
          renderHeader={() => (
            <Flex align="center" className="space-x-2">
              <SearchInput placeholder="Search by name or email" />
            </Flex>
          )}
        />
      </div>
    </div>
  );
};

export default ContactUsForms;
