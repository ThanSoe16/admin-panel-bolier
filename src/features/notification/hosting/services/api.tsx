import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import { NotificationCountData, NotificationDetailFilter, NotiSettingData, UpdateNotificationSettingRequest } from "../../types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { HostingNotificationDetailsData } from "../types";

export const hostingNotificationSettingApiService = {
  getHostingNotificationSettings: async () => {
    const response = await appAxios.get<APIResponse<NotiSettingData[]>>(
      `/admin-notifications/hosting-noti-list`
    );
    return response.data;
  },
  getHostingNotificationCount: async () => {
    const response = await appAxios.get<APIResponse<NotificationCountData>>(
      `/admin-notifications/hosting-data`
    );
    return response.data;
  },
  getHostingNotificationDetails: async (filter:NotificationDetailFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<HostingNotificationDetailsData[]>>(
      `/admin-notifications/hosting-noti-data?${params}`
    );
    return response.data;
  },
  updateHostingNotificationSettings: async (params: {
    id: string;
    data: UpdateNotificationSettingRequest;
  }) => {
    const response = await appAxios.put<APIResponse<NotiSettingData>>(
      `/admin-notifications/update-hosting-schedule/${params.id}`,
      params.data
    );
    return response.data;
  },

  toggleHostingNotificationSettings: async (id: string) => {
    const response = await appAxios.patch<APIResponse<NotiSettingData>>(
      `/admin-notifications/toggle-hosting-schedule/${id}`,
    );
    return response.data;
  },
};