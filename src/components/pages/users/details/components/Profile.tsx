'use client';
import React from 'react';
import { Ban, Dot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import { CustomerDetailData } from '@/features/users/types';
import { BalanceCurrencyFormat, CurrencyFormat } from '@/utils/currencyFormat';

const Profile = ({ balance, profile }: { balance: string; profile?: CustomerDetailData }) => {
  return (
    <div className="mb-4">
      {/* {userData?.status === "Blocked" && (
        <div className="flex flex-row gap-2 items-center bg-error-secondary w-full px-4 py-[10px] rounded-2xl mb-4">
          <Ban className="text-error" />
          <p className="text-sm md:text-base">
            {" "}
            This user has been blocked since 03 Sep 2024, 06:14.{" "}
          </p>
        </div>
      )} */}

      <div
        className={cn(
          'flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-4 w-full px-4 py-[10px] rounded-2xl border',
          // userData.status === "Blocked" && "bg-error-secondary"
        )}
      >
        <div className="relative">
          <Avatar className="w-[120px] h-[120px] rounded-full object-cover ">
            <AvatarImage src={profile?.image} />
            <AvatarFallback>{profile?.username?.charAt(0)?.toUpperCase() ?? 'O'}</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'absolute -bottom-1 left-5 rounded-full w-[80px] h-6 flex flex-row items-center justify-center',
              'bg-[rgba(255, 255, 255, 0.80)]  backdrop-blur-lg',
            )}
          >
            <Dot
              className={cn(
                'w-8 h-8 -ml-[12px] md:w-10 md:h-10 md:-ml-[16px]',
                profile?.status ? 'text-green-500' : 'text-white',
              )}
            />
            <p className="text-text-primary text-sm -ml-1">
              {' '}
              {profile?.status ? 'Active' : 'Inactive'}{' '}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center lg:items-start justify-center flex-1">
          <div className="flex flex-row items-center gap-2">
            <p className="text-lg md:text-xl font-bold"> {profile?.username} </p>
            <p className="mt-1 text-default-secondary text-base"> {profile?.name} </p>
          </div>
          <p className="text-brand"> {profile?.generated_account_id} </p>
          <p className="text-default-secondary text-base">
            Joined on <b>One Site Blog</b> at
            <b> {dayjs(profile?.createdAt).format('DD MMM YYYY, HH:mm')}</b>
          </p>
        </div>

        <div className='bg-[url("/users/wallet-bg.png")] h-[115px] rounded-2xl w-[260px] bg-right  bg-cover flex flex-col justify-center items-start text-white p-4'>
          <p> Remaining balance </p>
          <p className="font-bold text-lg md:text-xl">
            {' '}
            ${BalanceCurrencyFormat(parseFloat(balance))}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
