import { APIResponse } from "@/features/base/types";
import appAxios from "@/lib/appAxios";
import { LandingLanguage } from "../types";

export const landingLanguagesApiService = {
  getLandingLanguages: async () => {
    const response = await appAxios.get<APIResponse<LandingLanguage[]>>(
      `/landing/landing-language`
    );
    return response.data;
  },
};
