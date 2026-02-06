"use client";
import React, { useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetPaymentMethods } from "@/features/payment-settings/payment-methods/services/queries";
import { methodColumnDefs } from "./_components/MethodColDefs";
import CreateMethod from "./_components/CreateMethod";
import { DraggableTable } from "@/components/shared/data-table/draggable-table";
import { useOrderPaymentMethod } from "@/features/payment-settings/payment-methods/services/mutation";

const PaymentMethods = () => {
  const { query } = usePagination();
  const { data, isLoading } = useGetPaymentMethods(query);
  const { mutateAsync: orderPaymentMethod } = useOrderPaymentMethod();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageTitle> Payment Methods </PageTitle>
      <div className="table-container">
        <DraggableTable
          isShowNo
          data={data?.body?.data ?? []}
          columns={methodColumnDefs}
          total={data?.body?.total ?? 0}
          query={query}
          isLoading={isLoading}
          onPositionChange={(data) => {
            const newArr = data.map((item, idx) => ({
              id: String(item.id),
              index: idx + 1,
            }));
            orderPaymentMethod({ items: newArr });
            return;
          }}
          // renderHeader={() => (
          //   <div className="flex flex-row gap-0 md:gap-4 justify-start items-center">
          //     <CreateButton asBtn onClick={() => setOpen(true)} />
          //   </div>
          // )}
        />
      </div>

      {open && (
        <CreateMethod
          open={open}
          handleClose={() => setOpen(false)}
          total={(data?.body?.total ?? 1) + 1}
        />
      )}
    </div>
  );
};

export default PaymentMethods;
