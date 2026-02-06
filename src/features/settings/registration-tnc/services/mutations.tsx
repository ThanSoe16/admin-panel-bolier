import { registrationTNCService } from "./api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateRegistrationTermsConditionsRequest } from "../types";

export const useUpdateRegistrationTermsConditions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRegistrationTermsConditionsRequest) =>
      registrationTNCService.updateTermsConditions(data),
    onMutate: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (response, variables) => {
      toast.success("updated successfully");
      await queryClient.invalidateQueries({
        queryKey: [
          "registration-tnc",
          { type: response?.body?.data?.OTPServiceFeeType },
        ],
      });
    },
  });
};
