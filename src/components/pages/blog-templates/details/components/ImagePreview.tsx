"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ScreenKeysEnum } from "@/features/base/types/backend-defined-enums";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TemplateDetailsData } from "@/features/blog-templates/types";
import TemplatePreviewDrawer from "./TemplatePreviewDrawer";

interface Props {
  data: TemplateDetailsData;
}

const screens = [
  {
    icon: "/template/pc.svg",
    activeIcon: "/template/pc-active.svg",
    key: ScreenKeysEnum.LAPTOP,
  },
  {
    icon: "/template/tablet.svg",
    activeIcon: "/template/tablet-active.svg",
    key: ScreenKeysEnum.TABLET,
  },
  {
    icon: "/template/mobile.svg",
    activeIcon: "/template/mobile-active.svg",
    key: ScreenKeysEnum.MOBILE,
  },
];

const ImagePreview: React.FC<Props> = ({ data }) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedScreenSize, setSelectedScreenSize] = useState<ScreenKeysEnum>(
    ScreenKeysEnum.LAPTOP
  );

  return (
    <div className="mx-auto flex flex-col gap-4 w-full max-w-[394px]">
      <div className="w-full bg-[#D0D8D8] py-1 px-4 rounded-xl">
        <Image
          src={
            selectedScreenSize === ScreenKeysEnum.LAPTOP
              ? data?.LaptopThumb?.url
              : selectedScreenSize === ScreenKeysEnum.TABLET
              ? data?.TabletThumb?.url
              : data?.MobileThumb?.url
          }
          alt={data?.name}
          width={1200}
          height={1200}
          className="w-full h-full object-cover object-center aspect-[290/160]"
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-2">
          {screens.map((item, index) => (
            <Button
              key={index}
              onClick={() => setSelectedScreenSize(item.key)}
              className={cn(
                "rounded-xl w-10 h-10 flex items-center justify-center p-0",
                selectedScreenSize === item.key
                  ? "bg-brand-secondary"
                  : "bg-transparent"
              )}
            >
              <Image
                src={
                  item.key === selectedScreenSize ? item.activeIcon : item.icon
                }
                alt={item.key}
                width={20}
                height={20}
                className="w-[20px] h-[20px] rounded-xl"
              />
            </Button>
          ))}
        </div>
        <Button onClick={() => setOpenPreview(true)}>
          <Image
            src="/template/gallery.svg"
            alt="download"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
          />
          Full Gallery
        </Button>
      </div>
      <TemplatePreviewDrawer
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        data={data}
      />
    </div>
  );
};

export default ImagePreview;
