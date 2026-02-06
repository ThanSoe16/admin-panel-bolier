"use client";
import React, { useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";
import CreateButton from "@/components/shared/buttons/CreateButton";
import { accountColumnDefs } from "./_components/AccountColDefs";
import CreateAccount from "./_components/CreateAccount";
import { useGetPaymentMethods } from "@/features/payment-settings/payment-methods/services/queries";
import { useGetPaymentAccounts } from "@/features/payment-settings/payment-accounts/services/queries";
import { DraggableTable } from "@/components/shared/data-table/draggable-table";
import { useOrderPaymentAccount } from "@/features/payment-settings/payment-accounts/services/mutation";

const PaymentAccounts = () => {
  const { query } = usePagination();
  const paymentMethods = useGetPaymentMethods({ pageIndex: 1, rowPerPage: 20 });
  const { data, isLoading } = useGetPaymentAccounts(query);
  const { mutateAsync: orderPaymentAccount } = useOrderPaymentAccount();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageTitle> Payment Accounts </PageTitle>
      {data?.body?.total == 0 ? (
        <div>
          <FirstTimeContainer
            title={
              paymentMethods.data?.body?.total == 0
                ? "Please create payment method first."
                : "Create new payment account."
            }
            description={
              paymentMethods.data?.body?.total == 0
                ? "Go to Payment Settings> Payment Methods to create."
                : "Click on the button below to start adding data."
            }
            onPress={() => setOpen(true)}
            isError
            hideBtn={false}
          />
        </div>
      ) : (
        <div className="table-container">
          <DraggableTable
            isShowNo={false}
            data={data?.body?.data ?? []}
            columns={accountColumnDefs}
            total={data?.body?.total ?? 0}
            query={query}
            isLoading={isLoading}
            onPositionChange={(data) => {
              const newArr = data.map((item, idx) => ({
                id: String(item.id),
                index: idx + 1,
              }));
              orderPaymentAccount({ items: newArr });
              return;
            }}
            renderHeader={() => (
              <div className="flex flex-row gap-0 md:gap-4 justify-start items-center">
                <CreateButton asBtn onClick={() => setOpen(true)} />
              </div>
            )}

            // getRowHighlight={(row) => row.Status === "INACTIVE"}
          />
        </div>
      )}
      {open && (
        <CreateAccount
          open={open}
          handleClose={() => setOpen(false)}
          total={(data?.body?.total ?? 1) + 1}
        />
      )}
    </div>
  );
};

export default PaymentAccounts;
