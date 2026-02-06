"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import SocialItem from "./components/SocialItem";
import { useGetTemplateSocials } from "@/features/settings/template-socials/services/queries";
import { Loading } from "@/components/shared/loading";

const ShareTemplateSocials = () => {
  const {data, isLoading} = useGetTemplateSocials();

  if(isLoading) {
    return <Loading />
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex flex-col items-start justify-center h-full gap-4">
        <PageTitle className="mb-0"> Share Template Socials </PageTitle>
        <p className="font-bold">
          Please select which platforms are allowed to share, post the templates
          from One Site.
        </p>
        <div className="flex flex-col items-start justify-center w-full h-full gap-6">
          {data?.body?.data && data?.body?.data.map((social, index) => (
            <SocialItem
              key={index}
              name={social.name}
              icon={social?.File?.url}
              status={social?.Status}
              id={social.id}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareTemplateSocials;
