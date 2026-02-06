"use client";
import React from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import InvoiceDetailForm from "./_components/InvoiceDetail";
import { useGetInvoiceDetail } from "@/features/invoice/services/queries";
import { Loading } from "@/components/shared/loading";

const link = [
  { label: "User Invoices", href: "/invoice" },
  { label: "Details", href: "" },
];

const InvoiceDetails = ({ id }: { id: string }) => {
  const invoiceDetail = useGetInvoiceDetail(id);
  return (
    <div>
      <PageBreadcrumb enableBack links={link} />
      <div className="mt-4">
        {invoiceDetail.isLoading ? (
          <Loading />
        ) : (
          invoiceDetail.data?.body?.data && (
            <InvoiceDetailForm data={invoiceDetail.data?.body?.data} />
          )
        )}
      </div>
    </div>
  );
};

export default InvoiceDetails;
