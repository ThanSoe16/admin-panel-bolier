"use client";
import React from "react";
import UpdateForm from "../_components/UpdateForm";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetMaintainFee } from "@/features/service-fee/services/queries";

const UpdateMaintainFee = () => {
  const { query } = usePagination();
  const maintainFeeData = useGetMaintainFee(query);

  return (
    <div>
      <UpdateForm
        fee={maintainFeeData?.data?.body?.data?.latestData?.maintainFee ?? "0"}
      />
    </div>
  );
};

export default UpdateMaintainFee;
