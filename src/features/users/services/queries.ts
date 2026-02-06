import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { UserFilter } from "../types";
import userApiService from "./api";

export const useGetUsers = (filter: UserFilter) => {
  return useQuery({
    queryKey: ["users", filter],
    queryFn: () => userApiService.getUsers(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserDetail = (id: string) => {
  return useQuery({
    queryKey: ["user-detail", id],
    queryFn: () => userApiService.getUserDetail(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserTransactions = (filter: UserFilter) => {
  return useQuery({
    queryKey: ["users-transaction", filter],
    queryFn: () => userApiService.getUserTransaction(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserDomains = (filter: UserFilter) => {
  return useQuery({
    queryKey: ["users-domains", filter],
    queryFn: () => userApiService.getUserDomains(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserTemplates = (filter: {
  id: string;
  search?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["users-templates", filter],
    queryFn: ({ pageParam = 1 }) =>
      userApiService.getUserPurchasedTemplates({
        pageIndex: pageParam,
        rowPerPage: 5,
        ...filter,
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

export const useGetUserBlogs = (filter: UserFilter) => {
  return useQuery({
    queryKey: ["users-blogs", filter],
    queryFn: () => userApiService.getUserPurchasedBlogs(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserDomainDetail = (id: string) => {
  return useQuery({
    queryKey: ["users-domains-detail", id],
    queryFn: () => userApiService.getUserDomainsDetail(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserEarningSummary = (id: string) => {
  return useQuery({
    queryKey: ["users-earning-summary", id],
    queryFn: () => userApiService.getUserEarningSummary(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserEarningHistory = (id: string) => {
  return useQuery({
    queryKey: ["users-earning-history", id],
    queryFn: () => userApiService.getUserEarningHistory(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserWithdrawHistory = (id: string) => {
  return useQuery({
    queryKey: ["users-withdraw-history", id],
    queryFn: () => userApiService.getUserWithdrawHistory(id),
    refetchOnWindowFocus: false,
  });
};
