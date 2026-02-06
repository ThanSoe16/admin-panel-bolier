import { TutorialsFilter } from "../types";
import tutorialsApiService from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetFAQs = (filter:TutorialsFilter) => {
  return useQuery({
    queryKey: ["tutorials",filter],
    queryFn: () => tutorialsApiService.getTutorials(filter),
  });
};
