
import { devModeApiService } from "./api";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export const useGetPendingTemplates = () => {
  return useInfiniteQuery({
    queryKey: ["pending-templates"],
    queryFn: ({pageParam = 1}) => devModeApiService.getPendingTemplates({
      pageIndex: pageParam,
      rowPerPage: 5,
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage?.body?.pageCount || 0;
      const currentPage = lastPage?.body?.currentPage || 0;  
      if (totalPages <= currentPage) return undefined;
      return currentPage + 1;
    },
  });
};

export const useGetRecentDevActivities = () => {
  return useQuery({
    queryKey: ["recent-dev-activities"],
    queryFn: () => devModeApiService.getRecentDevActivities(),
  });
};

export const useGetPublishedTemplates = (params: {
  search: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["published-templates", params],
    queryFn: ({pageParam = 1}) => devModeApiService.getPublishedTemplates({
      pageIndex: pageParam,
      rowPerPage: 5,
      ...params,
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage?.body?.pageCount || 0;
      const currentPage = lastPage?.body?.currentPage || 0;  
      if (totalPages <= currentPage) return undefined;
      return currentPage + 1;
    },
  });
};
