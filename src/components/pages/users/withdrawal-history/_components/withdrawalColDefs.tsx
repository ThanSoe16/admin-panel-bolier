'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/utils/dateTime';
import { WithdrawalRequestData } from '@/features/withdrawal/types';
import { CurrencyFormat, MMKCurrencyFormat } from '@/utils/currencyFormat';
import TableBaseButton from '@/components/shared/buttons/TableBaseButton';
import Link from 'next/link';
import { CheckCheck, X } from 'lucide-react';
import { Flex } from '@radix-ui/themes';
import { Image } from '@/components/ui/image';
import ProfileAvatar from '@/components/shared/base/ProfileAvatar';

const Actions = (props: { target: WithdrawalRequestData }) => {
  return (
    <div className="flex space-x-2">
      <Link href={`/users/withdrawal-history/${props.target.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    </div>
  );
};

export const historyColDefs: ColumnDef<WithdrawalRequestData>[] = [
  {
    accessorKey: 'username',
    header: 'Username & Withdrawal ID',
    size: 200,
    cell: ({ row }) => (
      <div>
        <p>{row.original.OneSiteUser?.username}</p>
        <p className="text-sm text-muted-foreground">{row.original.transactionId}</p>
      </div>
    ),
  },
  {
    accessorKey: 'confirmedDate',
    header: 'Date',
    size: 150,
    cell: ({ row }) => (
      <div>{row.original.confirmedDate ? formatDate(row.original.confirmedDate) : '-'}</div>
    ),
  },
  {
    accessorKey: 'withdrawalAmount',
    header: 'Withdrawal Amt.',
    size: 150,
    cell: ({ row }) => <span>{MMKCurrencyFormat(row.original.paidAmount)} MMK</span>,
  },
  {
    accessorKey: 'recipientAccount',
    header: 'Recipient Acc.',
    size: 200,
    cell: ({ row }) => (
      <div>
        <div>
          <p>
            {row.original.OnesiteUserReceivingAccount.accountName} (
            {row.original.OnesiteUserReceivingAccount.accountNumber})
          </p>
          <Flex align={'center'} className="gap-1">
            <ProfileAvatar
              name={row.original.OnesiteUserReceivingAccount.accountName.charAt(0) || ''}
              photo={
                row.original.OnesiteUserReceivingAccount.AcceptedReceivingAccount?.File?.url || ''
              }
              className="w-7 h-7"
            />
            <p>{row.original.OnesiteUserReceivingAccount.AcceptedReceivingAccount.name}</p>
          </Flex>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'OnesiteWithdrawStatus',
    header: 'Status',
    size: 100,
    cell: ({ row }) => (
      <Flex align={'center'} className="gap-1">
        {row.original.OnesiteWithdrawStatus === 'REJECTED' && (
          <X className="text-destructive" size={18} />
        )}
        {row.original.OnesiteWithdrawStatus === 'SUCCESSFUL' && (
          <Image
            src="/components/done_green.svg"
            width={18}
            height={18}
            alt="done"
            className="w-4 h-4"
          />
        )}
        <span className="capitalize">{row.original.OnesiteWithdrawStatus.toLowerCase()}</span>
      </Flex>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
