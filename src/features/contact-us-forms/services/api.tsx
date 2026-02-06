
import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import { ContactUsFormsType } from "../types";
import { objectToQueryString } from "@/utils/objectToQueryString";

const contactUsApiService = {
  getContactUs: async (params:{
    pageIndex: number;
    rowPerPage: number;
    word?: string;
  }) => {
    const queries = objectToQueryString(params);
    const response = await appAxios.get<APIResponse<ContactUsFormsType[]>>(`/admin-settings/contact-form?${queries}`);
    return response.data;
  },
  
};

export default contactUsApiService;