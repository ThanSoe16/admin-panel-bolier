"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import NoData from "../components/NoData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { serviceFeeColumnDefs } from "../components/columnDefs";
import { useGetSetupFee } from "@/features/service-fee/services/queries";
import { MoneyInput } from "@/components/shared/base/MoneyInput";
import { Loading } from "@/components/shared/loading";
import { useRouter } from "next/navigation";
import SecondaryEditButton from "@/components/shared/buttons/SecondaryEditButton";

const SetupFee = () => {
  const router = useRouter();
  const { query } = usePagination();
  const setupFeeData = useGetSetupFee(query);

  if (setupFeeData.isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <PageTitle className="mb-0"> Setup Fee</PageTitle>
        {setupFeeData?.data?.body?.data.latestData && (
          <SecondaryEditButton
            onClick={() => router.push("/service-fee/setup/update")}
            btnName="Edit"
            asBtn
          />
        )}
      </div>
      {!setupFeeData?.data?.body?.data.latestData ? (
        <NoData
          title="Create the blog setup fee!"
          url="/service-fee/setup/update?mode=create"
        />
      ) : (
        <div className="flex flex-col gap-4">
          <MoneyInput
            value={setupFeeData?.data?.body?.data?.latestData?.setupFee ?? "0"}
            setValue={() => {}}
            disabled
            className="w-full"
            postfix="$"
            placeholder="Setup Fee"
          />
          <p className="font-bold"> Setup Fee History</p>
          <div className="w-[calc(100dvw-65px)] md:w-full">
            <DataTable
              columns={serviceFeeColumnDefs}
              data={setupFeeData?.data?.body?.data.datalist ?? []}
              isLoading={setupFeeData.isLoading}
              isShowNo={false}
              query={query}
              total={setupFeeData?.data?.body?.total ?? 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupFee;
