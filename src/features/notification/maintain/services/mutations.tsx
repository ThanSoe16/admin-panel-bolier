import { maintainNotificationSettingApiService } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMaintainNotificationSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      maintainNotificationSettingApiService.updateMaintainNotificationSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["maintain-notification-settings"],
      });
    },
  });
};

export const useToggleMaintainNotificationSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      maintainNotificationSettingApiService.toggleMaintainNotificationSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["maintain-notification-settings"],
      });
    },
  });
};
