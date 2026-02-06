'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/utils/dateTime';
import { CurrencyFormat, MMKCurrencyFormat } from '@/utils/currencyFormat';
import { UserEarningHistoryData } from '@/features/users/types';
import { Flex } from '@radix-ui/themes';
import { ArrowLeftRight } from 'lucide-react';
import ProfileAvatar from '@/components/shared/base/ProfileAvatar';

export const earningColDefs: ColumnDef<UserEarningHistoryData>[] = [
  {
    accessorKey: 'subscriberName',
    header: 'Subscriber Info',
    size: 200,
    cell: ({ row }) => (
      <div>
        <span>{row.original.subscriberName}</span>
        <p className="text-xs text-primary">{row.original.subscriberEmail}</p>
      </div>
    ),
  },
  {
    accessorKey: 'subscribedAt',
    header: 'Subscribed on',
    size: 200,
    cell: ({ row }) => (
      <div>
        <p>{row.original.subscribedAt ? formatDate(row.original.subscribedAt) : '-'}</p>
      </div>
    ),
  },
  {
    accessorKey: 'totalEarned',
    header: 'Total Earned',
    size: 200,
    cell: ({ row }) => (
      <div>
        <Flex align={'center'} className="gap-2">
          <p>$ {CurrencyFormat(row.original.totalEarned)}</p>
          <ArrowLeftRight size={14} className="text-primary" />
          <p>{MMKCurrencyFormat(row.original.totalEarned * row.original.exchangeRate)} MMK</p>
        </Flex>
        <Flex align={'center'} className="gap-1">
          <p className="text-xs text-muted-foreground ">Paid with </p>
          {/* <span className="capitalize">
            {row.original.paidWith.toLocaleLowerCase()}
          </span> */}
          <ProfileAvatar
            name={row.original.paidWith.charAt(0) || ''}
            photo={row.original.paymentMethodFile?.url || ''}
            className="w-7 h-7"
          />
        </Flex>
      </div>
    ),
  },
  {
    accessorKey: 'trxFee',
    header: 'Transaction Fee',
    size: 200,
    cell: ({ row }) => (
      <div>
        <p>$ {CurrencyFormat(row.original.trxFee)}</p>
      </div>
    ),
  },
  {
    accessorKey: 'netEarned',
    header: 'Net. Earned',
    size: 200,
    cell: ({ row }) => (
      <div>
        <p className="text-success font-medium">$ {CurrencyFormat(row.original.netEarned)}</p>
      </div>
    ),
  },
];
