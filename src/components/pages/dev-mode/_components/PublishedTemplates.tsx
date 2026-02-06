"use client";
import React, { useEffect } from "react";
import { useGetPublishedTemplates } from "@/features/dev-mode/services/queries";
import { useInView } from "react-intersection-observer";
import TemplateItem from "./TemplatesUI";
import useGetLandingEngLanguageId from "@/features/base/hooks/useGetLandingEngLanguageId";
import { Loading } from "@/components/shared/loading";
import { usePagination } from "@/features/base/hooks/usePagination";

const PublishedTemplates = () => {
  const { word } = usePagination();
  const { ref, inView } = useInView();
  const defaultLanguageId = useGetLandingEngLanguageId();

  const {
    data: publishedTemplates,
    isLoading,
    fetchNextPage,
  } = useGetPublishedTemplates({
    search: word,
  });

  const publishedTemplatesToShow =
    publishedTemplates?.pages.flatMap((page) => page?.body?.data || []) || [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading)
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {publishedTemplatesToShow.length > 0 ? (
        publishedTemplatesToShow.map((item) => (
          <TemplateItem
            key={item.id}
            item={item}
            tab="done"
            defaultLanguageId={defaultLanguageId}
          />
        ))
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center">
          <p>No templates found</p>
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};

export default PublishedTemplates;
