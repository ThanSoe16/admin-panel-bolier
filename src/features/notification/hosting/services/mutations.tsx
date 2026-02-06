import { hostingNotificationSettingApiService } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateHostingNotificationSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      hostingNotificationSettingApiService.updateHostingNotificationSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["hosting-notification-settings"],
      });
    },
  });
};

export const useToggleHostingNotificationSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      hostingNotificationSettingApiService.toggleHostingNotificationSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["hosting-notification-settings"],
      });
    },
  });
};
