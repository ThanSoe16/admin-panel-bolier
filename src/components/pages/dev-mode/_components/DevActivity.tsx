"use client";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";

interface DevActivityProps {
  item: any;
  devActivities: any;
  isLastItem: boolean;
}

const DevActivity: React.FC<DevActivityProps> = ({
  item,
  devActivities,
  isLastItem,
}) => {
  return (
    <div
      className={cn(
        "flex flex-row lg:flex-col xl:flex-row items-start justify-start gap-2 p-4 border-b",
        isLastItem && "border-b-0"
      )}
    >
      <ProfileAvatar
        photo={item?.CreatedBy?.Avatar?.url}
        className="rounded-full w-[32px] h-[32px] object-cover"
        name={item?.CreatedBy?.name}
      />

      <div className="text-sm">
        <p> {item?.CreatedBy?.name} uploaded a new template. </p>

        <div className="flex flex-row items-center justify-start gap-2">
          <div className="bg-brand w-2 h-2 rounded-full" />
          <p className="text-sm"> {item?.name} </p>
        </div>

        <p className="text-brand text-sm xl:-mt-0"> {item?.templateCode} </p>
        <p className="text-default-secondary">
          {" "}
          {dayjs(item?.createdAt).format("DD MMM YYYY, HH:mm")}{" "}
        </p>
      </div>
    </div>
  );
};

export default DevActivity;
