"use client";
import React from "react";
import Image from "next/image";
import { Dot } from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";

interface TemplateItemProps {
  item: any;
  tab: string;
  defaultLanguageId: string;
}

const TemplateItem = ({ item, tab, defaultLanguageId }: TemplateItemProps) => {
  return (
    <div className="rounded-xl border p-4 flex flex-col lg:flex-row gap-2">
      <div className="rounded-xl p-2 bg-gray-200 h-[98px] w-[136px]">
        <Image
          src={item?.LaptopThumb?.url}
          alt={item.name}
          width={120}
          height={82}
          className="rounded-xl w-[120px] h-[82px] object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center -mt-1">
            {tab !== "done" && (
              <Dot className="w-10 h-10 text-red-500 -ml-4 " />
            )}
            <p className="text-brand text-sm"> {item?.templateCode} </p>
          </div>
          {tab === "done" ? (
            <Link href={`/blog-templates/${item?.id}`}>
              <TableBaseButton uiType="details">Details</TableBaseButton>
            </Link>
          ) : (
            <Link href={`/dev-mode/setup?id=${item?.id}`}>
              <TableBaseButton uiType="edit">Review & Setup</TableBaseButton>
            </Link>
          )}
        </div>

        <p className="font-bold max-w-[300px] md:max-w-[500px] line-clamp-2">
          {item?.name}
        </p>

        <div className="flex flex-row items-center gap-2 text-sm">
          <p className="w-[200px] text-[#686868]"> Category : </p>
          <p className="line-clamp-1 w-full">
            {
              item?.TemplateCategory?.TemplateCategoryContent?.find(
                (category) => category.languageId === defaultLanguageId
              )?.name
            }{" "}
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 text-sm">
          <p className="w-[200px] text-[#686868]"> Uploaded on : </p>
          <p className=" w-full">
            {" "}
            {dayjs(item?.updatedAt).format("DD MMM YYYY, HH:mm")}{" "}
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 text-sm">
          <p className="w-[200px] text-[#686868]"> Uploaded by (Dev): </p>
          <p className=" w-full"> {item?.CreatedBy?.name} </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateItem;
