
import { blogTemplatesApiService } from "./api";
import { useQuery } from "@tanstack/react-query";
import { BlogTemplateSaleHistoryFilter, BlogTemplatesFilter } from "../types";

export const useGetTemplateDetails = (params: {
  id: string
}) => {
  return useQuery({
    queryKey: ["template-details", params],
    queryFn: () => blogTemplatesApiService.getTemplateDetails(params),
  })
};

export const useGetBlogTemplates = (params: BlogTemplatesFilter) => {
  return useQuery({
    queryKey: ["blog-templates", params],
    queryFn: () => blogTemplatesApiService.getBlogTemplates(params),
  })
}

export const useGetBlogTemplateSaleHistory = (params: {
  id: string;
  filter: BlogTemplateSaleHistoryFilter
}) => {
  return useQuery({
    queryKey: ["blog-template-sale-history", params],
    queryFn: () => blogTemplatesApiService.getBlogTemplateSaleHistory(params),
  })
}

export const useGetTemplateOverview = () => {
  return useQuery({
    queryKey: ["template-overview"],
    queryFn: () => blogTemplatesApiService.getTemplateOverview(),
  })
}