import appAxios from '@/lib/appAxios';
import { APIResponse } from '@/features/base/types';
import { ContactUSType, UpdateContactApiType } from '../types';

const contactUsApiService = {
  getContactUs: async () => {
    const response = await appAxios.get<APIResponse<ContactUSType>>('/admin-settings/contact');
    return response.data;
  },

  updateContactUs: async (params: { id: string; data: UpdateContactApiType }) => {
    const response = await appAxios.put<APIResponse<ContactUSType>>(
      `/admin-settings/contact/${params.id}`,
      params.data,
    );
    return response.data;
  },
};

export default contactUsApiService;
