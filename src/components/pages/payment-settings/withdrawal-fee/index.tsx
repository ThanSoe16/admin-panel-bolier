"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import PageTitle from "@/components/shared/PageTitle";
import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";
import { withdrawalFeeColDefs } from "./_components/WithdrawalFeeColDefs";
import { useGetWithdrawFee } from "@/features/payment-settings/transaction-fee/servicex/queries";

const WithdrawalFee = () => {
  const { data, isLoading } = useGetWithdrawFee();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageTitle> Withdrawal Fee </PageTitle>

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
            data={data?.body?.data ? [data.body.data] : []}
            columns={withdrawalFeeColDefs}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default WithdrawalFee;
