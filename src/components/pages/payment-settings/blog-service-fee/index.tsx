"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";
import CreateButton from "@/components/shared/buttons/CreateButton";
import { blogServiceFeeColDefs } from "./_components/BlogServiceFeeColDefs";
import { useGetTransactionFee } from "@/features/payment-settings/transaction-fee/servicex/queries";

const BlogServiceFee = () => {
  const { query } = usePagination();
  const { data, isLoading } = useGetTransactionFee(query);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageTitle> Transaction Fee </PageTitle>

      {data?.body?.total == 0 ? (
        <div>
          <FirstTimeContainer
            title={"Please create payment method first."}
            description={"Go to Payment Settings> Payment Methods to create."}
            onPress={() => setOpen(true)}
            hideBtn
          />
        </div>
      ) : (
        <div className="table-container">
          <DataTable
            isShowNo={false}
            data={data?.body?.data ?? []}
            columns={blogServiceFeeColDefs}
            total={data?.body?.total}
            query={query}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default BlogServiceFee;
