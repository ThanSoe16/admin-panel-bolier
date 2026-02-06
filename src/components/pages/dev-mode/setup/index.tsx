"use client";
import React from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import TemplateSetupForm from "./TemplateSetupForm";
import { useQueryState } from "nuqs";
import { useGetTemplateDetails } from "@/features/blog-templates/services/queries";
import { Loading } from "@/components/shared/loading";

const links = [
  {
    label: "Dev Mode Blog Template",
    href: "/dev-mode",
  },
  {
    label: "Review & Setup",
    href: "",
  },
];

const SetupTemplate = () => {
  const { data: languages } = useGetLandingLanguages();
  const [id] = useQueryState("id");
  const { data, isLoading } = useGetTemplateDetails({
    id: id ?? "",
  });

  const templateData = data?.body?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageBreadcrumb enableBack links={links} />
      {languages?.body?.data && (
        <TemplateSetupForm
          data={{
            id: templateData?.id || "",
            code: templateData?.templateCode || "",
            thumbnail: {
              laptop: templateData?.LaptopThumb?.id || "",
              tablet: templateData?.TabletThumb?.id || "",
              mobile: templateData?.MobileThumb?.id || "",
            },
            previews:
              templateData?.TemplatePreviews.flatMap((item) => {
                return {
                  thumbnail: {
                    laptop: item.thumbnail.laptop.id,
                    mobile: item.thumbnail.mobile.id,
                    tablet: item.thumbnail.tablet.id,
                  },
                  pages: item.pages,
                  imageUrls: {
                    laptop: item.thumbnail.laptop.url,
                    mobile: item.thumbnail.mobile.url,
                    tablet: item.thumbnail.tablet.url,
                  },
                };
              }) ?? [],
            template_name: templateData?.name || "",
            template_url: templateData?.templateUrl || "",
            template_category_id: templateData?.templateCategoryId || "",
            template_sub_category_id:
              templateData?.TemplateOnTemplateSubCategory?.map(
                (item) => item?.TemplateSubCategory?.id
              ) || [], // need to fix
            price: templateData?.price || 0,
            highlights:
              languages.body.data.map((item) => ({
                languageId: item.id,
                highlight:
                  templateData?.TemplateHighlight?.find(
                    (highlight) => highlight.languageId === item.id
                  )?.highlight || "",
              })) || [],
            descriptions:
              languages.body.data.map((item) => ({
                languageId: item.id,
                description:
                  templateData?.TemplateDescription?.find(
                    (highlight) => highlight.languageId === item.id
                  )?.description || "",
              })) || [],
            perks: templateData?.perks || [],
            copyright: templateData?.copyright || "",
            template_code: templateData?.templateCode || "",
          }}
          landingLanguages={languages.body.data}
          thumbnailUrls={{
            laptop: templateData?.LaptopThumb?.url || "",
            tablet: templateData?.TabletThumb?.url || "",
            mobile: templateData?.MobileThumb?.url || "",
          }}
        />
      )}
    </div>
  );
};

export default SetupTemplate;
