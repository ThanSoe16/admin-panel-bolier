import { FAQFilterData } from '../types';
import faqsApiService from './api';
import { useQuery } from '@tanstack/react-query';

export const useGetFAQs = (params: FAQFilterData) => {
  return useQuery({
    queryKey: ['faqs', params],
    queryFn: () => faqsApiService.getFaqs(params),
  });
};

export const useGetFAQById = (id: string) => {
  return useQuery({
    queryKey: ['faq', id],
    queryFn: () => faqsApiService.getFaqById(id),
  });
};
