import { NotificationDetailFilter } from "../../types";
import { hostingNotificationSettingApiService } from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetHostingNotificationSettings = () => {
  return useQuery({
    queryKey: ["hosting-notification-settings"],
    queryFn:
      hostingNotificationSettingApiService.getHostingNotificationSettings,
  });
};

export const useGetHostingNotificationCounts = () => {
  return useQuery({
    queryKey: ["hosting-notification-counts"],
    queryFn: hostingNotificationSettingApiService.getHostingNotificationCount,
  });
};

export const useGetHostingNotificationDetails = (
  filter: NotificationDetailFilter
) => {
  return useQuery({
    queryKey: ["hosting-notification-details", filter],
    queryFn: () =>
      hostingNotificationSettingApiService.getHostingNotificationDetails(
        filter
      ),
  });
};
