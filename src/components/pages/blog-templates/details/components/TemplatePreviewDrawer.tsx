import React from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import TemplatePreview from "./TemplatePreview";
import { TemplateDetailsData } from "@/features/blog-templates/types";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";

interface TemplatePreviewDrawerProps {
  open: boolean;
  onClose: () => void;
  data: TemplateDetailsData;
}

const TemplatePreviewDrawer: React.FC<TemplatePreviewDrawerProps> = ({
  open,
  onClose,
  data,
}) => {
  const { data: languageData } = useGetLandingLanguages();
  const defaultLanguageId =
    languageData?.body?.data?.find((lang) => lang.key === "en")?.id || "";

  const previewData = {
    name: data?.name ?? "",
    price: data?.price ?? 0,
    views: {
      pc: {
        pages:
          data?.TemplatePreviews?.map((item) => ({
            id: item.index.toString(),
            name:
              item.pages?.find((page) => page.languageId === defaultLanguageId)
                ?.page_name ?? "",
            url: item.thumbnail?.laptop?.url,
          })) ?? [],
      },
      tablet: {
        pages:
          data?.TemplatePreviews?.map((item) => ({
            id: item.index.toString(),
            name:
              item.pages?.find((page) => page.languageId === defaultLanguageId)
                ?.page_name ?? "",
            url: item.thumbnail?.tablet?.url,
          })) ?? [],
      },
      mobile: {
        pages:
          data?.TemplatePreviews?.map((item) => ({
            id: item.index.toString(),
            name:
              item.pages?.find((page) => page.languageId === defaultLanguageId)
                ?.page_name ?? "",
            url: item.thumbnail?.mobile?.url,
          })) ?? [],
      },
    },
    pages: data?.TemplatePreviews?.map((item) => ({
      id: item.index.toString(),
      name:
        item.pages?.find((page) => page.languageId === defaultLanguageId)
          ?.page_name ?? "",
      url: "",
    })),
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="h-[90vh] bg-white">
        <DrawerTitle hidden></DrawerTitle>
        <TemplatePreview onClose={onClose} templateData={previewData} />
      </DrawerContent>
    </Drawer>
  );
};

export default TemplatePreviewDrawer;
