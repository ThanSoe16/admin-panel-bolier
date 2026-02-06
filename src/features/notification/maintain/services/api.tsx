import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import { NotificationCountData, NotificationDetailFilter, NotiSettingData, UpdateNotificationSettingRequest } from "../../types";
import { MaintainNotificationDetailsData } from "../types";
import { objectToQueryString } from "@/utils/objectToQueryString";

export const maintainNotificationSettingApiService = {
  getMaintainNotificationSettings: async () => {
    const response = await appAxios.get<APIResponse<NotiSettingData[]>>(
      `/admin-notifications/maintenance-noti-list`
    );
    return response.data;
  },
  getMaintainNotificationCount: async () => {
    const response = await appAxios.get<APIResponse<NotificationCountData>>(
      `/admin-notifications/maintenance-data`
    );
    return response.data;
  },
  getMaintainNotificationDetails: async (filter:NotificationDetailFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<MaintainNotificationDetailsData[]>>(
      `/admin-notifications/maintenance-noti-data?${params}`
    );
    return response.data;
  },
  updateMaintainNotificationSettings: async (params:{
    id: string;
    data: UpdateNotificationSettingRequest;
  }) => {
    const response = await appAxios.put<APIResponse<NotiSettingData>>(
      `/admin-notifications/update-maintenance-schedule/${params.id}`,
      params.data
    );
    return response.data;
  },

  toggleMaintainNotificationSettings: async (id: string) => {
    const response = await appAxios.patch<APIResponse<NotiSettingData>>(
      `/admin-notifications/toggle-maintenance-schedule/${id}`,
    );
    return response.data;
  },
};