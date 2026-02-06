import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import { NotificationCountData, NotificationDetailFilter, NotiSettingData, UpdateNotificationSettingRequest } from "../../types";
import { ServerNotificationDetailsData } from "../types";
import { objectToQueryString } from "@/utils/objectToQueryString";

export const serverNotificationSettingApiService = {
  getServerNotificationSettings: async () => {
    const response = await appAxios.get<APIResponse<NotiSettingData[]>>(
      `/admin-notifications/server-noti-list`
    );
    return response.data;
  },
  getServerNotificationCount: async () => {
    const response = await appAxios.get<APIResponse<NotificationCountData>>(
      `/admin-notifications/server-data`
    );
    return response.data;
  },
  getServerNotificationDetails: async (filter:NotificationDetailFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<ServerNotificationDetailsData[]>>(
      `/admin-notifications/server-noti-data?${params}`
    );
    return response.data;
  },
  updateServerNotificationSettings: async (params:{
    id: string;
    data: UpdateNotificationSettingRequest;
  }) => {
    const response = await appAxios.put<APIResponse<NotiSettingData>>(
      `/admin-notifications/update-server-schedule/${params.id}`,
      params.data
    );
    return response.data;
  },

  toggleServerNotificationSettings: async (id: string) => {
    const response = await appAxios.patch<APIResponse<NotiSettingData>>(
      `/admin-notifications/toggle-server-schedule/${id}`,
    );
    return response.data;
  },
};