"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateButton from "../buttons/CreateButton";
import { cn } from "@/lib/utils";

interface NoDataProps {
  title: string;
  description?: string;
  onPress?: () => void;
  isError?: boolean;
  hideBtn?: boolean;
  hideIcon?: boolean;
  icon?: string;
}

const FirstTimeContainer: React.FC<NoDataProps> = ({
  title,
  description = " Click on the button below to start adding invoice.",
  onPress = () => {},
  isError = false,
  hideBtn = false,
  hideIcon = false,
  icon = "",
}) => {
  return (
    <div
      className={cn(
        hideIcon ? "min-h-[300px]" : "min-h-[500px]",
        "w-full flex flex-col gap-2 justify-center items-center px-4 md:p-6"
      )}
    >
      {!hideIcon && (
        <Image
          src={
            icon
              ? icon
              : isError
              ? "/invoice/info-invoice.svg"
              : "/invoice/invoice.svg"
          }
          alt="empty"
          width={100}
          height={100}
          className="w-[100px] h-[100px] object-cover"
        />
      )}
      <p className="text-default-secondary text-lg font-bold text-center">
        {" "}
        {title}{" "}
      </p>

      <p className="text-default-secondary text-base text-center">
        {description}
      </p>

      {!hideBtn && <CreateButton asBtn onClick={onPress} />}
    </div>
  );
};

export default FirstTimeContainer;
