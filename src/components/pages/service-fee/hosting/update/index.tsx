"use client";
import React from "react";
import UpdateForm from "../_components/UpdateForm";
import { usePagination } from "@/features/base/hooks/usePagination";
import {
  useGetHostingFee,
  useGetHostingRenewFee,
} from "@/features/service-fee/services/queries";

const UpdateHostingFee = () => {
  const { query } = usePagination();
  const hostingFeeData = useGetHostingFee(query);
  const hostingRenewFeeData = useGetHostingRenewFee(query);

  return (
    <div>
      <UpdateForm
        hosting={hostingFeeData?.data?.body?.data.latestData?.hostingFee || "0"}
        hostingRenew={
          hostingRenewFeeData?.data?.body?.data.latestData?.hostingRenewFee ||
          "0"
        }
      />
    </div>
  );
};

export default UpdateHostingFee;
