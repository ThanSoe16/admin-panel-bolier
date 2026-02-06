"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import NoData from "../components/NoData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { usePagination } from "@/features/base/hooks/usePagination";
import { serviceFeeColumnDefs } from "../components/columnDefs";
import Tabs from "@/components/shared/tabs";
import {
  useGetHostingFee,
  useGetHostingRenewFee,
} from "@/features/service-fee/services/queries";
import { parseAsString, useQueryState } from "nuqs";
import { MoneyInput } from "@/components/shared/base/MoneyInput";
import { Loading } from "@/components/shared/loading";
import { useRouter } from "next/navigation";
import SecondaryEditButton from "@/components/shared/buttons/SecondaryEditButton";

const HostingFee = () => {
  const router = useRouter();
  const [tab] = useQueryState(
    "tab",
    parseAsString.withDefault("hosting").withOptions({ clearOnDefault: true })
  );
  const { query } = usePagination();
  const hostingFeeData = useGetHostingFee(query);
  const hostingRenewFeeData = useGetHostingRenewFee(query);

  if (hostingFeeData.isLoading || hostingRenewFeeData.isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <PageTitle className="mb-0"> Hosting Fee</PageTitle>
        {hostingFeeData?.data?.body?.data.latestData && (
          <SecondaryEditButton
            onClick={() => router.push("/service-fee/hosting/update")}
            btnName="Edit"
            asBtn
          />
        )}
      </div>
      {!hostingFeeData?.data?.body?.data.latestData ? (
        <NoData
          title="Create the blog hosting fee!"
          url="/service-fee/hosting/update?mode=create"
        />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <MoneyInput
                value={
                  hostingFeeData?.data?.body?.data?.latestData?.hostingFee ?? 0
                }
                setValue={() => {}}
                disabled
                className="w-full"
                postfix="$/ year"
                placeholder="Hosting Fee"
              />
            </div>
            <div className="flex-1">
              <MoneyInput
                value={
                  hostingRenewFeeData?.data?.body?.data?.latestData
                    ?.hostingRenewFee ?? "0"
                }
                setValue={() => {}}
                disabled
                className="w-full"
                postfix="$"
                placeholder="Hosting Renew Fee"
              />
            </div>
          </div>

          <Tabs
            tabList={[
              { tab: "history", label: "Hosting Fee History" },
              {
                tab: "renew",
                label: "Renew Fee History",
              },
            ]}
            secondaryUI
          />

          <div className="w-[calc(100dvw-65px)] md:w-full">
            <DataTable
              columns={serviceFeeColumnDefs}
              data={
                tab == "renew"
                  ? hostingRenewFeeData?.data?.body?.data?.datalist ?? []
                  : hostingFeeData?.data?.body?.data?.datalist ?? []
              }
              isShowNo={false}
              isLoading={
                tab == "renew"
                  ? hostingRenewFeeData.isLoading
                  : hostingFeeData.isLoading
              }
              query={query}
              total={
                tab == "renew"
                  ? hostingRenewFeeData?.data?.body?.total
                  : hostingFeeData?.data?.body?.total
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HostingFee;
