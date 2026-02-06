import { useQuery } from "@tanstack/react-query";
import { registrationTNCService } from "./api";
import { RegistrationTermsConditionsTypeEnum } from "@/features/base/types/backend-defined-enums";

export const useGetRegistrationTNC = ({
  type
}: {
  type: RegistrationTermsConditionsTypeEnum;
}) => {
  return useQuery({
    queryKey: ["registration-tnc", { type }],
    queryFn: () => registrationTNCService.getRegistrationTermsConditions({ type }),
  })
}

