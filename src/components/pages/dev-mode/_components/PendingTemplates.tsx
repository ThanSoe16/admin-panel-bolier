"use client";
import React, { useEffect } from "react";
import { useGetPendingTemplates } from "@/features/dev-mode/services/queries";
import { useInView } from "react-intersection-observer";
import TemplateItem from "./TemplatesUI";
import useGetLandingEngLanguageId from "@/features/base/hooks/useGetLandingEngLanguageId";
import { Loading } from "@/components/shared/loading";
import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";

const PendingTemplates = () => {
  const { ref, inView } = useInView();
  const defaultLanguageId = useGetLandingEngLanguageId();

  const {
    data: pendingTemplates,
    isLoading,
    fetchNextPage,
  } = useGetPendingTemplates();

  const pendingTemplatesToShow =
    pendingTemplates?.pages.flatMap((page) => page?.body?.data || []) || [];

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
      {pendingTemplatesToShow.length == 0 ? (
        <FirstTimeContainer
          title={"No templates found"}
          description={""}
          hideBtn
          isError
        />
      ) : (
        pendingTemplatesToShow.map((item) => (
          <TemplateItem
            key={item.id}
            item={item}
            tab="new"
            defaultLanguageId={defaultLanguageId}
          />
        ))
      )}

      <div ref={ref} />
    </div>
  );
};

export default PendingTemplates;
