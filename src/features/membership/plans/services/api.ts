import { objectToQueryString } from "@/utils/objectToQueryString";
import appAxios from "@/lib/appAxios";
import { APIResponse, PaginationFilter } from "@/features/base/types";
import {
  CreateMembershipPlanRequest,
  MembershipPlanData,
  UpdateMembershipPlanRequest,
} from "../types";

const membershipPlanApiService = {
  getMembershipPlans: async (filter: PaginationFilter) => {
    const params = objectToQueryString(filter);
    const response = await appAxios.get<APIResponse<MembershipPlanData[]>>(
      `/membership-admin/get-membership-plan?${params}`
    );
    return response.data;
  },
  createMembershipPlan: async (req: CreateMembershipPlanRequest) => {
    const response = await appAxios.post<APIResponse<MembershipPlanData>>(
      `/membership-admin/create-membership-plan`,
      req
    );
    return response.data;
  },
  toggleMembershipPlanStatus: async (id: string) => {
    const response = await appAxios.delete<APIResponse<MembershipPlanData>>(
      `/membership-admin/toggle-membership-plan-by-id/${id}`
    );
    return response.data;
  },
  updateMembershipPlan: async (req: UpdateMembershipPlanRequest) => {
    const { id, ...rest } = req;
    const response = await appAxios.put<APIResponse<MembershipPlanData>>(
      `/membership-admin/update-membership-plan/${id}`,
      rest
    );
    return response.data;
  },
};
export default membershipPlanApiService;
