import { maintainNotificationSettingApiService } from "./api";
import { useQuery } from "@tanstack/react-query";
import { NotificationDetailFilter } from "../../types";

export const useGetMaintainNotificationSettings = () => {
  return useQuery({
    queryKey: ["maintain-notification-settings"],
    queryFn:
      maintainNotificationSettingApiService.getMaintainNotificationSettings,
  });
};

export const useGetMaintainNotificationCounts = () => {
  return useQuery({
    queryKey: ["maintain-notification-counts"],
    queryFn: maintainNotificationSettingApiService.getMaintainNotificationCount,
  });
};

export const useGetMaintainNotificationDetails = (
  filter: NotificationDetailFilter
) => {
  return useQuery({
    queryKey: ["maintain-notification-details", filter],
    queryFn: () =>
      maintainNotificationSettingApiService.getMaintainNotificationDetails(
        filter
      ),
  });
};
