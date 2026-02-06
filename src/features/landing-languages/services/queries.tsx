import { useQuery } from "@tanstack/react-query";
import { landingLanguagesApiService } from "./api";

export const useGetLandingLanguages = () => {
  return useQuery({
    queryKey: ["landing-languages"],
    queryFn: () => landingLanguagesApiService.getLandingLanguages(),
    refetchOnWindowFocus: false,
  });
};
