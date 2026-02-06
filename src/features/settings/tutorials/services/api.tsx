import { APIResponse } from '@/features/base/types';
import appAxios from '@/lib/appAxios';
import {
  CreateTutorialRequest,
  TutorialData,
  TutorialsFilter,
  UpdateTutorialRequest,
} from '../types';
import { objectToQueryString } from '@/utils/objectToQueryString';

const tutorialsApiService = {
  getTutorials: async (filter: TutorialsFilter) => {
    const response = await appAxios.get<APIResponse<TutorialData[]>>(
      `/admin-settings/tutorials?${objectToQueryString(filter)}`,
    );
    return response.data;
  },

  createTutorial: async (data: CreateTutorialRequest) => {
    const response = await appAxios.post<APIResponse<CreateTutorialRequest>>(
      '/admin-settings/tutorials',
      data,
    );
    return response.data;
  },

  updateTutorial: async (params: { id: string; data: UpdateTutorialRequest }) => {
    const response = await appAxios.put<APIResponse<UpdateTutorialRequest>>(
      `/admin-settings/tutorials/${params.id}`,
      params.data,
    );
    return response.data;
  },

  deleteTutorial: async (params: { id: string }) => {
    const response = await appAxios.delete<APIResponse<[]>>(
      `/admin-settings/tutorials/${params.id}`,
    );
    return response.data;
  },
};

export default tutorialsApiService;
