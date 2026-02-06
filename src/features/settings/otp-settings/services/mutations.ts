import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import otpSettingsApiService from "./api";
import { UpdateOTPSettingsRequest } from "../types";

export const useUpdateOTPSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOTPSettingsRequest) =>
      otpSettingsApiService.updateOTPSettings(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response) => {
      toast.success(response?.meta?.message);
      await queryClient.invalidateQueries({ queryKey: ["otp-settings"] });
    },
  });
};
