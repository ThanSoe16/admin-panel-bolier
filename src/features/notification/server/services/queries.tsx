import { NotificationDetailFilter } from "../../types";
import { serverNotificationSettingApiService } from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetServerNotificationSettings = (filter: {
  search?: string;
}) => {
  return useQuery({
    queryKey: ["server-notification-settings", filter],
    queryFn: serverNotificationSettingApiService.getServerNotificationSettings,
  });
};

export const useGetServerNotificationCounts = () => {
  return useQuery({
    queryKey: ["server-notification-counts"],
    queryFn: serverNotificationSettingApiService.getServerNotificationCount,
  });
};

export const useGetServerNotificationDetails = (
  filter: NotificationDetailFilter
) => {
  return useQuery({
    queryKey: ["server-notification-details", filter],
    queryFn: () =>
      serverNotificationSettingApiService.getServerNotificationDetails(filter),
  });
};
