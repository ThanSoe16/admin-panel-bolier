"use client";
import React from "react";
import CreateInvoiceForm from "./_components/InvoiceForm";
import { useGetInvoiceDetail } from "@/features/invoice/services/queries";
import { Loading } from "@/components/shared/loading";

const UpdateInvoice = ({ id }: { id: string }) => {
  const invoiceDetail = useGetInvoiceDetail(id);

  return (
    <div>
      {invoiceDetail.isLoading ? (
        <Loading />
      ) : (
        invoiceDetail.data?.body?.data && (
          <CreateInvoiceForm data={invoiceDetail.data.body?.data} />
        )
      )}
    </div>
  );
};

export default UpdateInvoice;
