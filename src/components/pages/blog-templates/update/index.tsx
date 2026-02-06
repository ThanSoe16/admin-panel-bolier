"use client";
import React from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import TemplateSetupForm from "../../dev-mode/setup/TemplateSetupForm";
import { Loading } from "@/components/shared/loading";
import { useQueryState } from "nuqs";
import { useGetTemplateDetails } from "@/features/blog-templates/services/queries";

const UpdateTemplate = () => {
  const { data: languages } = useGetLandingLanguages();
  const [id] = useQueryState("id");
  const { data, isLoading } = useGetTemplateDetails({
    id: id ?? "",
  });

  const templateData = data?.body?.data;

  if (isLoading) {
    return <Loading />;
  }

  const links = [
    { label: "Manage Blog Templates", href: "/blog-templates" },
    { label: "Template Details", href: `/blog-templates/${id}` },
    { label: "Edit Details", href: `` },
  ];

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
            template_name: templateData?.name || "",
            template_url: templateData?.templateUrl || "",
            template_category_id: templateData?.templateCategoryId || "",
            template_sub_category_id:
              templateData?.TemplateOnTemplateSubCategory?.map(
                (item) => item?.TemplateSubCategory?.id
              ) || [],
            previews:
              templateData?.TemplatePreviews?.map((item) => ({
                pages: item.pages,
                thumbnail: {
                  laptop: item.thumbnail?.laptop?.id || "",
                  tablet: item.thumbnail?.tablet?.id || "",
                  mobile: item.thumbnail?.mobile?.id || "",
                },
                imageUrls: {
                  laptop: item.thumbnail?.laptop?.url || "",
                  tablet: item.thumbnail?.tablet?.url || "",
                  mobile: item.thumbnail?.mobile?.url || "",
                },
              })) || [], // need to fix
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

export default UpdateTemplate;
