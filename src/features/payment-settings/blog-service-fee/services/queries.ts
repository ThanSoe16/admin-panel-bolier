import { useQuery } from "@tanstack/react-query";
import BlogServiceFeeApiService from "./api";

export const useGetBlogServiceFees = () => {
  return useQuery({
    queryKey: ["blog-service-fee"],
    queryFn: () => BlogServiceFeeApiService.getBlogServiceFee(),
    refetchOnWindowFocus: false,
  });
};
