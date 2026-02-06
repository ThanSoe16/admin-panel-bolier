"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import MetaBox from "../components/MetaBox";
import { DataTable } from "@/components/shared/data-table";
import { columnDefs } from "../components/columnDefs";
import {
  useGetMaintainNotificationCounts,
  useGetMaintainNotificationSettings,
} from "@/features/notification/maintain/services/queries";
import { Loading } from "@/components/shared/loading";

const scheduleOrder = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
};

const MaintainNotification = () => {
  const { data, isLoading } = useGetMaintainNotificationSettings();
  const { data: NotificationCounts } = useGetMaintainNotificationCounts();

  if (isLoading) {
    return <Loading />;
  }

  const sorted = [...(data?.body?.data ?? [])].sort((a, b) => {
    return (
      scheduleOrder[a.Schedule as keyof typeof scheduleOrder] -
      scheduleOrder[b.Schedule as keyof typeof scheduleOrder]
    );
  });

  return (
    <div>
      <PageTitle> Maintain Renew </PageTitle>
      <MetaBox
        iconUrl="/notification/maintain.svg"
        type="maintain"
        willExpire={NotificationCounts?.body?.data?.expire_soon ?? 0}
        renew={NotificationCounts?.body?.data?.renew ?? 0}
        expired={NotificationCounts?.body?.data?.expired ?? 0}
      />
      <p className="text-lg font-bold my-4"> Settings </p>

      {data?.body?.data && (
        <div className="w-[calc(100dvw-65px)] md:w-full">
          <DataTable isShowNo={false} data={sorted} columns={columnDefs} />
        </div>
      )}
    </div>
  );
};

export default MaintainNotification;
