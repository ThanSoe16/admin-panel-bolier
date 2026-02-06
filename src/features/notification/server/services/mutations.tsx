import { serverNotificationSettingApiService } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateServerNotificationSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      serverNotificationSettingApiService.updateServerNotificationSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["server-notification-settings"],
      });
    },
  });
};

export const useToggleServerNotificationSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:
      serverNotificationSettingApiService.toggleServerNotificationSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["server-notification-settings"],
      });
    },
  });
};
