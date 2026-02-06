import appAxios from '@/lib/appAxios';
import { APIResponse, SEOPreviewData } from '../types';

const baseApiService = {
  fileUpload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    if (formData) {
      const response = await appAxios.post('/file/upload/admin', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  },
  getSeoPreview: async ({ url }: { url: string }) => {
    const response = await appAxios.get<APIResponse<SEOPreviewData>>(`/fetch-seo?url=${url}`);
    return response?.data;
  },
};

export default baseApiService;
