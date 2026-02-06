'use client';
import Image from 'next/image';
import React from 'react';

interface NoDataProps {
  title: string;
}

const NoDataUI: React.FC = ({}) => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center py-8 px-4 md:p-6">
      <Image
        src="/invoice/invoice.svg"
        alt="empty"
        width={100}
        height={100}
        className="w-[100px] h-[100px] object-cover"
      />

      <p className="text-default-secondary text-lg font-bold">No Data</p>
    </div>
  );
};

export default NoDataUI;
