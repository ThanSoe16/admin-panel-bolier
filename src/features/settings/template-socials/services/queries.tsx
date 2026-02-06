import templateSocialsApiService from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetTemplateSocials = () => {
  return useQuery({
    queryKey: ["template-socials"],
    queryFn: () => templateSocialsApiService.getTemplateSocials(),
  });
};