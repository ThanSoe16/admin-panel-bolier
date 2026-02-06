'use client'
import { NotificationEnum } from '@/features/base/types/backend-defined-enums';
import { CurrencyFormat } from '@/utils/currencyFormat';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MetaBoxProps {
  iconUrl: string,
  type: "maintain" | "hosting" | "server",
  willExpire: number,
  renew: number,
  expired: number,
}

const MetaBox: React.FC<MetaBoxProps> = ({
  iconUrl,
  type,
  willExpire,
  renew,
  expired,
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <Item
        iconUrl={iconUrl}
        type={type}
        tab={NotificationEnum.EXPIRING}
        count={willExpire}
      />
      <Item
        iconUrl={iconUrl}
        type={type}
        tab={NotificationEnum.RENEW}
        count={renew}
      />
      <Item
        iconUrl={iconUrl}
        type={type}
        tab={NotificationEnum.EXPIRED}
        count={expired}
      />
    </div>
  )
}


interface ItemProps {
  iconUrl: string,
  type: "maintain" | "hosting" | "server",
  tab: NotificationEnum,
  count: number;
}

const Item: React.FC<ItemProps> = ({
  iconUrl,
  type,
  tab,
  count,
}) => {
  return (
    <Link href={`/notifications/${type}/details?tab=${tab}`} className='w-full'>
      <div className='rounded-lg border p-4 lg:p-6 w-full flex flex-col gap-0 justify-center items-start bg-white shadow-sm'>
        <div className='flex items-start gap-2 justify-between w-full'>
          <Image
            src={iconUrl}
            alt='icon'
            width={40}
            height={40}
            className='w-10 h-10'
          />
          <ArrowRight size={24} />
        </div>
        <p className='text-default-secondary text-xs lg:text-sm mt-6'> 
          {tab === NotificationEnum.EXPIRING
            ? "Total Will Expire (Next 7 days)"
            : tab === NotificationEnum.RENEW
              ? "Total Renews (In 7 days)"
              : "Total Expired (Expired 30 days ago)"
          } </p>
          <p className='text-brand text-xl md:text-2xl font-bold'> {CurrencyFormat(count)} </p>
      </div>
    </Link>
  )
}

export default MetaBox