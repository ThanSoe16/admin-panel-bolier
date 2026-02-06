import appAxios from "@/lib/appAxios";
import { APIResponse, DateFilter } from "@/features/base/types";
import { objectToQueryString } from "@/utils/objectToQueryString";
import { BlogServiceFeeData } from "../types";

const BlogServiceFeeApiService = {
  getBlogServiceFee: async () => {
    const response = await appAxios.get<APIResponse<BlogServiceFeeData[]>>(
      `payment-account`
    );
    return response.data;
  },
};

export default BlogServiceFeeApiService;
