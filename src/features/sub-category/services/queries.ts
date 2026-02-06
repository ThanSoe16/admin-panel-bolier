import { useQuery } from "@tanstack/react-query";
import subCategoryApiService from "./api";
import { SubCategoryFilter } from "../types";

export const useGetSubCategories = (filter: SubCategoryFilter) => {
  return useQuery({
    queryKey: ["sub-categories", filter],
    queryFn: () => subCategoryApiService.getSubCategories(filter),
    refetchOnWindowFocus: false,
  });
};
