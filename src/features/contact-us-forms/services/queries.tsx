import contactUsApiService from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetContactUsForms = (params: {
  pageIndex: number;
  rowPerPage: number;
  word?: string;
}) => {
  return useQuery({
    queryKey: ["contact-us-forms", params],
    queryFn: () => contactUsApiService.getContactUs(params),

  });
};