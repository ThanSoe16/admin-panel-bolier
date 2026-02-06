"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import Tabs from "@/components/shared/tabs";
import QNA from "./components/QNA";
import CreateButton from "@/components/shared/buttons/CreateButton";
import { useRouter, useSearchParams } from "next/navigation";
import { FAQTypesEnum } from "@/features/base/types/backend-defined-enums";
import { useGetFAQs } from "@/features/faqs/services/queries";
import { Loading } from "@/components/shared/loading";
import NoDataUI from "@/components/shared/base/NoData";

const tabList = [
  {
    tab: `${FAQTypesEnum.PURCHASING_DOMAINS}`,
    label: "Purchasing Domains",
    inCludeSearchParam: [FAQTypesEnum.PURCHASING_DOMAINS],
  },
  {
    tab: `${FAQTypesEnum.EXPIRED_DOMAINS}`,
    label: "Expired Domains",
  },
  {
    tab: `${FAQTypesEnum.PAYMENT}`,
    label: "Payment",
  },
  {
    tab: `${FAQTypesEnum.OTHERS}`,
    label: "Others",
  },
];

const FAQs = () => {
  const router = useRouter();
  const tab =
    useSearchParams().get("tab") || `${FAQTypesEnum.PURCHASING_DOMAINS}`;
  const { data, isLoading } = useGetFAQs({
    type: tab as FAQTypesEnum,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageTitle> FAQs </PageTitle>
      <div className="flex items-center justify-between">
        <Tabs tabList={tabList} />
        <CreateButton
          asBtn
          onClick={() =>
            router.push(
              `/settings/faqs/create?tab=${
                tab || FAQTypesEnum.PURCHASING_DOMAINS
              }`
            )
          }
        />
      </div>
      <div className="border mt-4 p-4 lg:p-6 rounded-2xl flex flex-col gap-4">
        {isLoading ? (
          <Loading />
        ) : data?.body?.data?.length ? (
          data.body.data.map((faq, index) => (
            <QNA key={faq.id} data={faq} index={index} />
          ))
        ) : (
          <NoDataUI />
        )}
      </div>
    </div>
  );
};

export default FAQs;
