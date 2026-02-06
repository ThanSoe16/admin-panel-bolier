"use client";
import React from "react";
import { Tooltip } from "@radix-ui/themes";
import { ChevronRight, Dot } from "lucide-react";
import Image from "next/image";
import { PendingTemplateData } from "@/features/dev-mode/types";
import { formatDate } from "@/utils/dateTime";
import Link from "next/link";
import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";

interface PendingTemplatesProps {
  data: PendingTemplateData[];
}

const DevTemplateList: React.FC<PendingTemplatesProps> = ({ data }) => {
  return (
    <div className="w-full flex flex-col gap-2 border rounded-2xl p-4 lg:p-6">
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-row items-center gap-0  font-bold">
          <Dot className="text-red-500 -ml-4" size={40} />
          <p> Ready From Developer </p>
        </div>
        <Link href={`/dev-mode?tab=new`}>
          <div className="flex flex-row items-center gap-2  ">
            <p> {data?.length} </p>
            <ChevronRight />
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {data.length == 0 ? (
          <div>
            <p className="text-default-secondary text-lg font-bold text-center h-[100px] flex items-center justify-center">
              No templates found
            </p>
          </div>
        ) : (
          data?.slice(0, 3)?.map((item, index) => (
            <div
              className="flex flex-row gap-2 items-center w-full"
              key={index}
            >
              <Image
                src={item.LaptopThumb?.url}
                alt={item.name}
                width={90}
                height={60}
                className="w-[90px] h-[60px] rounded-lg"
              />
              <div className="flex-1 ">
                <Tooltip content={item.name} className="w-content max-w-full ">
                  <p className="text-default font-bold cursor-pointer line-clamp-1">
                    {" "}
                    {item.name}{" "}
                  </p>
                </Tooltip>
                <p className="text-default-secondary text-sm">
                  Ready on {formatDate(item.updatedAt)}{" "}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DevTemplateList;
