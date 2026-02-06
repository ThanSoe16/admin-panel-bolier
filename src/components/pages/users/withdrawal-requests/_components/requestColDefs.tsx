'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/utils/dateTime';
import { WithdrawalRequestData } from '@/features/withdrawal/types';
import { CurrencyFormat, MMKCurrencyFormat } from '@/utils/currencyFormat';
import TableBaseButton from '@/components/shared/buttons/TableBaseButton';
import Link from 'next/link';
import { Flex } from '@radix-ui/themes';
import ProfileAvatar from '@/components/shared/base/ProfileAvatar';

const Actions = (props: { target: WithdrawalRequestData }) => {
  return (
    <div className="flex space-x-2">
      <Link href={`/users/withdrawal-requests/${props.target.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    </div>
  );
};

export const requestColDefs: ColumnDef<WithdrawalRequestData>[] = [
  {
    accessorKey: 'username',
    header: 'Username & Withdrawal ID',
    size: 200,
    cell: ({ row }) => (
      <div>
        <p>{row.original.OneSiteUser.username}</p>
        <p className="text-sm text-muted-foreground">{row.original.transactionId}</p>
      </div>
    ),
  },
  {
    accessorKey: 'requestedDate',
    header: 'Requested On',
    size: 150,
    cell: ({ row }) => (
      <div>{row.original.requestedDate ? formatDate(row.original.requestedDate) : '-'}</div>
    ),
  },
  {
    accessorKey: 'withdrawalAmount',
    header: 'Withdrawal Amt.',
    size: 200,
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
