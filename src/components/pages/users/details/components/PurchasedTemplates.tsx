"user client";
import React, { useEffect } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useGetUserTemplates } from "@/features/users/services/queries";
import { usePagination } from "@/features/base/hooks/usePagination";
import { Loading } from "@/components/shared/loading";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { useInView } from "react-intersection-observer";

const PurchasedTemplates = ({ id }: { id: string }) => {
  const { ref, inView } = useInView();
  const { query } = usePagination();
  const {
    data: purchasedTemplates,
    fetchNextPage,
    isLoading,
  } = useGetUserTemplates({
    search: query.word,
    id: id,
  });
  const { data: languageData } = useGetLandingLanguages();

  const templateListToShow =
    purchasedTemplates?.pages?.flatMap((page) => page?.body?.data || []) || [];

  const defaultLanguageId =
    languageData?.body?.data?.find((lang) => lang.key === "en")?.id || "";

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Loading />
      ) : templateListToShow.length > 0 ? (
        templateListToShow.map((item, index) => (
          <div
            className="flex flex-col sm:flex-row justify-start items-center gap-4 border rounded-2xl p-4"
            key={index}
          >
            <Image
              src={item.Template?.LaptopThumb?.url}
              alt={item.Template?.name}
              width={200}
              height={142}
              className="w-[200px] h-[142px] object-cover rounded-[24px]"
            />
            <div className="flex flex-col text-sm gap-2 w-full">
              <p className="font-bold text-base"> {item.Template?.name} </p>
              <p className="text-brand"> {item.Template?.templateCode} </p>
              <div className="flex flex-row items-center ">
                <p className="text-default-secondary w-24 lg:w-[200px]">
                  Category :{" "}
                </p>
                <p className="line-clamp-1">
                  {" "}
                  {item.Template?.TemplateCategory &&
                    item.Template?.TemplateCategory?.TemplateCategoryContent.find(
                      (category) => category.languageId === defaultLanguageId
                    )?.name}{" "}
                  {">"}{" "}
                  {item.Template?.TemplateOnTemplateSubCategory &&
                    item.Template?.TemplateOnTemplateSubCategory[0]?.TemplateSubCategory.TemplateSubCategoryContent.find(
                      (category) => category.languageId === defaultLanguageId
                    )?.name}
                </p>
              </div>
              <div className="flex flex-row items-center ">
                <p className="text-default-secondary w-24 lg:w-[200px]">
                  {" "}
                  Price :{" "}
                </p>
                <p className="font-bold">
                  {" "}
                  {item.price === 0 ? "Free(0$)" : item.price + "$"}{" "}
                </p>
              </div>
              <div className="flex flex-row items-center ">
                <p className="text-default-secondary w-28 lg:w-[200px]">
                  {" "}
                  Purchased on :{" "}
                </p>
                <p className="">
                  {" "}
                  {dayjs(item.createdAt).format("DD MMM YYYY, HH:mm")}{" "}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center">
          <p>No template found</p>
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};

export default PurchasedTemplates;
