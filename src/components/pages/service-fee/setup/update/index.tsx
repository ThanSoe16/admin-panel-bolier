"use client";
import React from "react";
import UpdateForm from "../_components/UpdateForm";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetSetupFee } from "@/features/service-fee/services/queries";

const UpdateSetupFee = () => {
  const { query } = usePagination();
  const setUpFeeData = useGetSetupFee(query);

  return (
    <div>
      <UpdateForm
        fee={setUpFeeData?.data?.body?.data?.latestData?.setupFee ?? "0"}
      />
    </div>
  );
};

export default UpdateSetupFee;
