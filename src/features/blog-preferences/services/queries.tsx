import { useQuery } from "@tanstack/react-query";
import blogPreferenceApiService from "./api";

export const useGetBloglanguages = () => {
  return useQuery({
    queryKey: ["blog-languages"],
    queryFn: blogPreferenceApiService.getLanguages,
  });
}

export const useGetBlogMerchantAccountLimit = () => {
  return useQuery({
    queryKey: ["blog-merchant-account-limit"],
    queryFn: blogPreferenceApiService.getBlogMerchantAccountLimit,
  });
}
