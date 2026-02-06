"use client";
import React from "react";
import CreateInvoiceForm from "./_components/InvoiceForm";
import { useGetInvoiceNumber } from "@/features/invoice/services/queries";
import { Loading } from "@/components/shared/loading";
import { useEffect } from "react";

const CreateInvoice = () => {
  const {data, refetch, isLoading} = useGetInvoiceNumber();
  const [isRefetchDone, setIsRefetchDone] = React.useState(false);

  useEffect(() => {
    refetch().then(() => setIsRefetchDone(true));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        ( data && isRefetchDone) && (
          <CreateInvoiceForm invoiceId={data.body?.data ?? ""} />
        )
      )}
    </div>
  );
};

export default CreateInvoice;
