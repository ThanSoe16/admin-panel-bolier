"use client";
import React from "react";
import TopFilters from "../../components/TopFilters";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { DataTable } from "@/components/shared/data-table";
import {
  expiredColumnDefs,
  renewColumnDefs,
  willExpireColumnDefs,
} from "./components/columnDefs";
import { NotificationEnum } from "@/features/base/types/backend-defined-enums";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetServerNotificationDetails } from "@/features/notification/server/services/queries";

const ServerNotiDetails = () => {
  const { tab, start } = usePagination();
  const { data, isLoading } = useGetServerNotificationDetails({
    type: tab as NotificationEnum,
    date: start ? start : undefined,
  });

  const links = [
    {
      href: "/notifications/server",
      label: "Server Renew",
    },
    {
      href: "",
      label:
        tab === NotificationEnum.EXPIRING
          ? "Total Will Expire"
          : tab === NotificationEnum.RENEW
          ? "Total Renewable"
          : "Total Expired",
    },
  ];

  return (
    <div>
      <PageBreadcrumb enableBack links={links} />
      <div className="table-container pt-4">
        <DataTable
          isShowNo={false}
          data={data?.body?.data ?? []}
          isLoading={isLoading}
          columns={
            tab === NotificationEnum.EXPIRING
              ? willExpireColumnDefs
              : tab === NotificationEnum.RENEW
              ? renewColumnDefs
              : expiredColumnDefs
          }
          renderHeader={() => <TopFilters />}
        />
      </div>
    </div>
  );
};

export default ServerNotiDetails;
