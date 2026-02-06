import socialLinksApiService from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetSocialLinks = () => {
  return useQuery({
    queryKey: ["social-links"],
    queryFn: socialLinksApiService.getSocialLinks,
  });
};

export const useGetSocialLinkIcons = () => {
  return useQuery({
    queryKey: ["social-link-images"],
    queryFn: socialLinksApiService.getSocialLinkIcons,
  });
};
