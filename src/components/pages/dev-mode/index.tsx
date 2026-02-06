"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import Tabs from "@/components/shared/tabs";
import { useGetRecentDevActivities } from "@/features/dev-mode/services/queries";
import { Loading } from "@/components/shared/loading";
import SearchInput from "@/components/shared/search-input";
import DevActivity from "./_components/DevActivity";
import PendingTemplates from "./_components/PendingTemplates";
import PublishedTemplates from "./_components/PublishedTemplates";
import { parseAsString, useQueryState } from "nuqs";

const tabList = [
  { tab: "new", label: "New" },
  { tab: "done", label: "Done" },
];

const DevModeTemplates = () => {
  const [tab] = useQueryState(
    "tab",
    parseAsString.withDefault("new").withOptions({ clearOnDefault: true })
  );
  const { data: devActivities, isLoading: fetchingDevActivities } =
    useGetRecentDevActivities();

  const devActivitiesToShow = devActivities?.body?.data || [];

  return (
    <div className="flex flex-col">
      <PageTitle> Dev Mode Blog Template </PageTitle>

      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="w-ful lg:flex-1 ">
          <Tabs tabList={tabList} defaultValue="new" />
          {tab === "done" && (
            <SearchInput
              placeholder="Search by template or ID"
              className="mt-4 w-full"
            />
          )}

          <div className="flex flex-col gap-4 w-full">
            {tab === "new" ? <PendingTemplates /> : <PublishedTemplates />}
          </div>
        </div>

        {fetchingDevActivities ? (
          <Loading />
        ) : (
          <div className="w-full lg:w-2/5 border rounded-xl py-4">
            <p className="font-bold pl-4"> Recent Activities </p>
            <div>
              {devActivities?.body?.data &&
                devActivities?.body?.data.map((item, index) => (
                  <DevActivity
                    key={index}
                    item={item}
                    devActivities={devActivities}
                    isLastItem={index === devActivitiesToShow.length - 1}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevModeTemplates;
