"use client";
import ErrorUI from "@/components/shared/ErrorUI";
import { useGetMe } from "@/features/auth/service/queries";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Maintain = () => {
  const router = useRouter();
  const { isSuccess } = useGetMe();

  if (isSuccess) {
    router.push("/");
  }
  return (
    <div className="w-[100dvw] h-[100dvh] flex items-center justify-center">
      <ErrorUI
        Icon={
          <Image
            src="/error/maintain.svg"
            width={420}
            height={420}
            alt="maintain"
            className="w-[210px] h-[210px] sm:w-[420px] sm:h-[420px] -my-4"
          />
        }
        description={
          "We apologize for the inconvenience. Our website is currently under maintenance, and we're working to restore it as soon as possible."
        }
      />
    </div>
  );
};

export default Maintain;
