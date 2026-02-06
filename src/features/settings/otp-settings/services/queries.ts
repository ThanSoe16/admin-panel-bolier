import { useQuery } from "@tanstack/react-query";
import otpSettingsApiService from "./api";

export const useGetOTPSettings = () => {
  return useQuery({
    queryKey: ["otp-settings"],
    queryFn: () => otpSettingsApiService.getOTPSettings(),
    refetchOnWindowFocus: false,
  });
};
