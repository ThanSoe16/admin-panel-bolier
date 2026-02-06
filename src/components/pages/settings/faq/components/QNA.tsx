"use client";
import { Loading } from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FAQData } from "@/features/faqs/types";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface QNAProps {
  data: FAQData;
  index: number;
}

const QNA: React.FC<QNAProps> = ({ data, index }) => {
  const tab = useSearchParams().get("tab") || "";
  const { data: landingLanguages, isLoading } = useGetLandingLanguages();
  const [isOpen, setIsOpen] = React.useState(false);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base md:text-lg font-bold">
          {" "}
          Question {index + 1}{" "}
        </h2>
        {isOpen ? (
          <div className="flex gap-4 items-center">
            <Link
              href={`/settings/faqs/update?id=${data.id}&tab=${tab || "hosting"
                }`}
              className="flex gap-2 items-center"
            >
              <Button> Edit </Button>
            </Link>
            <ChevronDown
              size={24}
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand cursor-pointer"
            />
          </div>
        ) : (
          <div>
            <Plus
              size={24}
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {landingLanguages?.body?.data?.map((language, idx) => {
          const content = data.FaqContent.find((content) => content?.languageId === language?.id);
          return (
            <div
              key={language.id}
              className={`flex flex-col gap-4 ${isOpen ? "block" : "hidden"}`}
            >
              <p className="text-brand font-semibold">
                {" "}
                Question {index + 1} for{" "}
                {language?.name}
              </p>
              <Input
                type="text"
                className="w-full"
                disabled
                value={content?.question}
              />
              <p className="text-brand font-semibold">
                {" "}
                Answer {index + 1} For{" "}
                {language?.name}
              </p>
              <Textarea
                className="w-full"
                disabled
                value={content?.answer}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default QNA;
