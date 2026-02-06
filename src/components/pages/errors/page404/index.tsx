'use client';
import React from 'react';
import ErrorUI from '@/components/shared/ErrorUI';
import Image from 'next/image';

const Page404 = () => {
  return (
    <ErrorUI
      Icon={
        <Image
          src="/error/404.svg"
          width={420}
          height={420}
          alt="404"
          className="w-[210px] h-[210px] sm:w-[420px] sm:h-[420px] -my-4"
        />
      }
      description={"Sorry, we couldn't find that page."}
    />
  );
};

export default Page404;
