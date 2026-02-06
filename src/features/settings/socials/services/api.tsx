import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import {
  SocialLinksType,
  SocialLinksForm,
  SocialLinksDragType,
  SocialLinkIconsType,
} from "../types";

const socialLinksApiService = {
  getSocialLinks: async () => {
    const response = await appAxios.get<APIResponse<SocialLinksType[]>>(
      "/admin-settings/social-links"
    );
    return response.data;
  },

  getSocialLinkIcons: async () => {
    const response = await appAxios.get<APIResponse<SocialLinkIconsType>>(
      "/admin-settings/social-link-images"
    );
    return response.data;
  },

  updateSocialLinks: async (params: { links: SocialLinksForm[] }) => {
    const response = await appAxios.put<APIResponse<SocialLinksType>>(
      `/admin-settings/social-links/update`,
      params.links
    );
    return response.data;
  },

  dragAndSortSocialLinks: async (params: { data: SocialLinksDragType }) => {
    const response = await appAxios.post<APIResponse<SocialLinksType>>(
      `/admin-settings/social-links/swap-sorting`,
      params.data
    );
    return response.data;
  },
};

export default socialLinksApiService;
