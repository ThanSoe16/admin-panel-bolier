"use client";
import React from "react";
import TopFilters from "../../components/TopFilters";
import { Card, CardContent } from "@/components/ui/card";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { DataTable } from "@/components/shared/data-table";
import {
  expiredColumnDefs,
  renewColumnDefs,
  willExpireColumnDefs,
} from "./components/columnDefs";
import { NotificationEnum } from "@/features/base/types/backend-defined-enums";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetMaintainNotificationDetails } from "@/features/notification/maintain/services/queries";

const MaintainNotiDetails = () => {
  const { tab, start } = usePagination();
  const { data, isLoading } = useGetMaintainNotificationDetails({
    type: tab as NotificationEnum,
    date: start ? start : undefined,
  });

  const links = [
    {
      href: "/notifications/maintain",
      label: "Maintain Renew",
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

export default MaintainNotiDetails;
