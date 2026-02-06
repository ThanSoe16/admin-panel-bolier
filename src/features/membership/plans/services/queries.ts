import { useQuery } from "@tanstack/react-query";
import membershipPlanApiService from "./api";
import { PaginationFilter } from "@/features/base/types";

export const useGetMembershipPlans = (filter: PaginationFilter) => {
  return useQuery({
    queryKey: ["membership-plans", filter],
    queryFn: () => membershipPlanApiService.getMembershipPlans(filter),
    refetchOnWindowFocus: false,
  });
};
