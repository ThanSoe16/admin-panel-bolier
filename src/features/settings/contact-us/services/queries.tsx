import contactUsApiService from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetContactUs = () => {
  return useQuery({
    queryKey: ["contact-us"],
    queryFn: contactUsApiService.getContactUs,
  });
};