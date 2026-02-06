import { RoleFilter } from "@/features/admins/types";
import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import { objectToQueryString } from "@/utils/objectToQueryString";
import {
  HostingFeeDetailData,
  HostingRenewFeeDetailData,
  MaintainFeeDetailData,
  SetupFeeDetailData,
} from "../types";

const serviceFeeApiService = {
  getMaintainFee: async (filter: RoleFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<MaintainFeeDetailData>>(
      `admin-fees/maintain-fee?${params}`
    );
    return response.data;
  },
  createMaintainFee: async (maintainFee: string) => {
    const response = await appAxios.post<APIResponse<MaintainFeeDetailData>>(
      "admin-fees/maintain-fee/create",
      { maintainFee: maintainFee }
    );
    return response.data;
  },
  getSetupFee: async (filter: RoleFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<SetupFeeDetailData>>(
      `admin-fees/setup-fee?${params}`
    );
    return response.data;
  },
  createSetupFee: async (setupFee: string) => {
    const response = await appAxios.post<APIResponse<SetupFeeDetailData>>(
      "admin-fees/setup-fee/create",
      { setupFee: setupFee }
    );
    return response.data;
  },

  getHostingFee: async (filter: RoleFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<HostingFeeDetailData>>(
      `admin-fees/hosting-fee?${params}`
    );
    return response.data;
  },
  createHostingFee: async (hostingFee: string) => {
    const response = await appAxios.post<APIResponse<HostingFeeDetailData>>(
      "admin-fees/hosting-fee/create",
      { hostingFee: hostingFee }
    );
    return response.data;
  },

  getHostingRenewFee: async (filter: RoleFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<HostingRenewFeeDetailData>>(
      `admin-fees/hosting-renew-fee?${params}`
    );
    return response.data;
  },
  createHostingRenewFee: async (hostingRenewFee: string) => {
    const response = await appAxios.post<
      APIResponse<HostingRenewFeeDetailData>
    >("admin-fees/hosting-renew-fee/create", {
      hostingRenewFee: hostingRenewFee,
    });
    return response.data;
  },
};

export default serviceFeeApiService;
