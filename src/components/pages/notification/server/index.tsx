"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import MetaBox from "../components/MetaBox";
import { DataTable } from "@/components/shared/data-table";
import { columnDefs } from "../components/columnDefs";
import { useGetHostingNotificationSettings } from "@/features/notification/hosting/services/queries";
import { Loading } from "@/components/shared/loading";
import { useGetServerNotificationCounts } from "@/features/notification/server/services/queries";
import { NotiSettingData } from "@/features/notification/types";

const scheduleOrder = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
};

const ServerNotification = () => {
  const { data, isLoading } = useGetHostingNotificationSettings();
  const { data: NotificationCounts } = useGetServerNotificationCounts();

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
      <PageTitle> Server Renew </PageTitle>
      <MetaBox
        iconUrl="/notification/server.svg"
        type="server"
        willExpire={NotificationCounts?.body?.data?.expire_soon ?? 0}
        renew={NotificationCounts?.body?.data?.renew ?? 0}
        expired={NotificationCounts?.body?.data?.expired ?? 0}
      />
      <p className="text-lg font-bold my-4"> Settings </p>

      {data?.body?.data && (
        <div className="w-[calc(100dvw-65px)]  md:w-full">
          <DataTable isShowNo={false} data={sorted} columns={columnDefs} />
        </div>
      )}
    </div>
  );
};

export default ServerNotification;
