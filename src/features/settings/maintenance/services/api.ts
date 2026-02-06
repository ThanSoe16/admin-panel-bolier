import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import { MaintenanceDataResponse, UpdateMaintenanceRequest } from "../types";

const maintenanceApiService = {
  getMaintenance: async () => {
    const response = await appAxios.get<APIResponse<MaintenanceDataResponse>>(
      `/admin-settings/maintenance`
    );
    return response.data;
  },
  updateMaintenance: async (data: UpdateMaintenanceRequest) => {
    const response = await appAxios.put<APIResponse<MaintenanceDataResponse>>(
      `/admin-settings/maintenance-info/update`, data
    );
    return response.data;
  },
  updateMaintenanceStatus: async () => {
    const response = await appAxios.patch<APIResponse<any>>(
      `/admin-settings/maintenance/update`
    );
    return response.data;
  },
};
export default maintenanceApiService;
