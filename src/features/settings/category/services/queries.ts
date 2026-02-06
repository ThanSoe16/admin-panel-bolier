import { useQuery } from "@tanstack/react-query";
import categoryApiService from "./api";
import { CategoryFilter } from "../types";

export const useGetCategories = (filter: CategoryFilter) => {
  return useQuery({
    queryKey: ["categories", filter],
    queryFn: () => categoryApiService.getCategories(filter),
    refetchOnWindowFocus: false,
  });
};
