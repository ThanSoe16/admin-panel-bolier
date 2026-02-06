"use client";
import PageTitle from "@/components/shared/PageTitle";
import React from "react";
import NoData from "../components/NoData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { usePagination } from "@/features/base/hooks/usePagination";
import { serviceFeeColumnDefs } from "../components/columnDefs";
import { useGetMaintainFee } from "@/features/service-fee/services/queries";
import { MoneyInput } from "@/components/shared/base/MoneyInput";
import { Loading } from "@/components/shared/loading";
import { useRouter } from "next/navigation";
import SecondaryEditButton from "@/components/shared/buttons/SecondaryEditButton";

const MaintainFee = () => {
  const router = useRouter();
  const { query } = usePagination();
  const maintainFeeData = useGetMaintainFee(query);

  if (maintainFeeData.isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <PageTitle className="mb-0"> Maintain Fee</PageTitle>
        {maintainFeeData.data?.body?.data.latestData && (
          <SecondaryEditButton
            onClick={() => router.push("/service-fee/maintain/update")}
            btnName="Edit"
            asBtn
          />
        )}
      </div>
      {!maintainFeeData.data?.body?.data.latestData ? (
        <NoData
          title="Create the blog maintain fee!"
          url="/service-fee/maintain/update?mode=create"
        />
      ) : (
        <div className="flex flex-col gap-4">
          <MoneyInput
            value={
              maintainFeeData?.data?.body?.data?.latestData?.maintainFee ?? 0
            }
            setValue={() => {}}
            disabled
            className="w-full"
            postfix="$"
            placeholder="Maintain Fee"
          />

          <p className="font-bold"> Maintain Fee History</p>

          <div className="w-[calc(100dvw-65px)] md:w-full">
            <DataTable
              columns={serviceFeeColumnDefs}
              data={maintainFeeData?.data?.body?.data.datalist ?? []}
              isLoading={maintainFeeData.isLoading}
              isShowNo={false}
              query={query}
              total={maintainFeeData?.data?.body?.total ?? 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintainFee;
