"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Loading } from "@/components/shared/loading";
import { Grid } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/dateTime";
import TermsCard from "../terms/_components/TermsCard";
import useGetLandingEngLanguageId from "@/features/base/hooks/useGetLandingEngLanguageId";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { useGetRegistrationTNC } from "@/features/settings/registration-tnc/services/queries";
import { RegistrationTermsConditionsTypeEnum } from "@/features/base/types/backend-defined-enums";

const PhoneRegistrationTNC = () => {

  const router = useRouter();

  const engLandId = useGetLandingEngLanguageId();

  const { data: languageData } = useGetLandingLanguages();

  const { data, isLoading } = useGetRegistrationTNC({
    type: RegistrationTermsConditionsTypeEnum.PHONE
  });

  const engLanguage = languageData?.body?.data?.find((item) => item.id === engLandId);

  const tncData = data?.body?.data

  if(!engLanguage) return <Loading />

  return (
    <div>
      <PageTitle> Phone Registration T&C </PageTitle>
      {isLoading ? (
        <Loading />
      ) : (
        data?.body?.data && (
          <Grid columns={{ initial: "1" }} className="gap-4">

              <TermsCard
                key={tncData?.id}
                flagSrc={engLanguage?.File?.url}
                language={engLanguage?.name}
                title={engLanguage?.name}
                updatedOn={formatDate(tncData?.updatedAt || "")}
                description={tncData?.content || ""}
                onEdit={() =>
                  router.push(
                    `/settings/phone-registration-tnc/detail?language=${engLanguage?.key}`
                  )
                }
              />
          </Grid>
        )
      )}
    </div>
  );
};

export default PhoneRegistrationTNC;
