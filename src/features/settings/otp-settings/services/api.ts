import { APIResponse } from '@/features/base/types';
import appAxios from '@/lib/appAxios';
import { OTPSettingsData, UpdateOTPSettingsRequest } from '../types';

const otpSettingsApiService = {
  getOTPSettings: async () => {
    const response = await appAxios.get<APIResponse<OTPSettingsData>>(
      `/membership-admin/get-otp-settings`,
    );
    return response.data;
  },
  updateOTPSettings: async (data: UpdateOTPSettingsRequest) => {
    const response = await appAxios.patch<APIResponse<OTPSettingsData>>(
      `/membership-admin/update-otp-setting`,
      data,
    );
    return response.data;
  },
};
export default otpSettingsApiService;
