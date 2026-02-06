'use client';
import React from 'react';
import { PageBreadcrumb } from '@/components/shared/breadcrumb';
import { useGetWithdrawalRequestById } from '@/features/withdrawal/services/queries';
import { Loading } from '@/components/shared/loading';
import { DetailTable } from '@/components/shared/detail-table';
import { Flex } from '@radix-ui/themes';
import { ArrowRightLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/utils/dateTime';
import Link from 'next/link';
import Status from '@/components/shared/Status';
import CopyButton from '@/components/shared/base/CopyButton';
import { CurrencyFormat, MMKCurrencyFormat } from '@/utils/currencyFormat';
import ApproveWithdrawal from './_components/ApproveWithdrawal';
import RejectWithdrawal from './_components/RejectWithdrawal';
import ProfileAvatar from '@/components/shared/base/ProfileAvatar';

const links = [
  {
    label: 'Withdrawal Requests',
    href: '/users/withdrawal-requests',
  },
  {
    label: 'Details',
    href: '',
  },
];

const WithdrawalRequestDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetWithdrawalRequestById(id);
  const detailData = data?.body;

  const exchangeRate = (detailData?.exchangeRate ?? 0) + (detailData?.exchangeFee ?? 0);

  const withdrawalPercentage =
    detailData?.withdrawFeeType == 'PERCENTAGE'
      ? (detailData?.withdrawFee ?? 0) / 100
      : (detailData?.withdrawFee ?? 0) / exchangeRate;

  const requestedAmount = (detailData?.totalRequestAmount ?? 0) * exchangeRate;

  const withdrawalFeeAmount = requestedAmount * withdrawalPercentage;

  const withdrawalDetails = [
    {
      label: 'Withdrawal ID',
      value: detailData?.transactionId,
    },
    {
      label: 'Requested Date',
      value: detailData?.requestedDate ? formatDate(detailData?.requestedDate) : '',
    },
    {
      label: '',
      value: (
        <Link
          href={`/users/all/${detailData?.OneSiteUser.id}?tab=withdrawal-history`}
          className="w-full flex items-center justify-center gap-2 normal-text"
        >
          <p className="text-brand">User Withdrawal History</p>
          <ChevronRight className="w-5 h-5" />
        </Link>
      ),
    },
  ];

  const userDetails = [
    {
      label: 'Username',
      value: <p className="truncate">{detailData?.OneSiteUser.username}</p>,
    },
    {
      label: 'Email',
      value: <p className="truncate">{detailData?.OneSiteUser.email}</p>,
    },
    {
      label: 'Joined On',
      value: detailData?.OneSiteUser.joinData ? formatDate(detailData?.OneSiteUser.joinData) : '',
    },

    {
      label: 'Status',
      value: (
        <div className="flex items-center justify-center">
          <Status
            showGreenDot={detailData?.OneSiteUser?.status === 'ACTIVE'}
            status={detailData?.OneSiteUser?.status?.toLowerCase() ?? ''}
          />
        </div>
      ),
    },
    {
      label: '',
      value: (
        <Link
          href={`/users/all/${detailData?.OneSiteUser?.id}?tab=domains`}
          className="w-full flex items-center justify-center gap-2 normal-text"
        >
          <p className="text-brand">More Details</p>
          <ChevronRight className="w-5 h-5" />
        </Link>
      ),
    },
  ];

  const paymentDetails = [
    {
      label: 'Withdrawal to',
      value: (
        <Flex align={'center'} className="gap-1">
          <ProfileAvatar
            name={
              detailData?.OnesiteUserReceivingAccount?.AcceptedReceivingAccount.name.charAt(0) || ''
            }
            photo={
              detailData?.OnesiteUserReceivingAccount.AcceptedReceivingAccount?.File?.url || ''
            }
            className="w-7 h-7"
          />
          <p>{detailData?.OnesiteUserReceivingAccount.AcceptedReceivingAccount.name}</p>
        </Flex>
      ),
    },
    {
      label: 'Recipient Acc. Name',
      value: (
        <CopyButton
          value={detailData?.OnesiteUserReceivingAccount?.accountName ?? ''}
          className="line-clamp-2"
        />
      ),
    },
    {
      label: 'Recipient Acc. Number',
      value: (
        <CopyButton
          value={detailData?.OnesiteUserReceivingAccount?.accountNumber ?? ''}
          className="max-w-[80%] md:max-w-[90%] truncate"
        />
      ),
    },
  ];

  const feeDetails = [
    {
      label: 'Exchange Rate at Requested Time',
      value: `$1` + ' = ' + CurrencyFormat(exchangeRate) + ' MMK',
    },
    {
      label: 'Total Withdrawal Amount',
      value: (
        <Flex align={'center'} className="gap-2">
          <p>$ {CurrencyFormat(detailData?.totalRequestAmount ?? 0)}</p>
          <ArrowRightLeft className="w-4 h-4 text-primary" />
          <p>{MMKCurrencyFormat(requestedAmount)} MMK</p>
        </Flex>
      ),
    },
    {
      label: 'Withdrawal Fee',
      value: MMKCurrencyFormat(withdrawalFeeAmount) + ' MMK',
    },
    {
      label: 'Final Withdrawal Amount',
      value: (
        <p className="text-primary">{MMKCurrencyFormat(detailData?.paidAmount ?? 0) + ' MMK'}</p>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Flex justify={'between'} align={'center'} wrap={'wrap'} className="gap-2">
        <PageBreadcrumb links={links} enableBack />
        {detailData && (
          <Flex className="gap-2">
            <ApproveWithdrawal data={detailData} />
            <RejectWithdrawal data={detailData} />
          </Flex>
        )}
      </Flex>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <DetailTable title="Withdrawal Details" data={withdrawalDetails} />
          <DetailTable title="User Details" data={userDetails} />
          <DetailTable title="Payment Details" data={paymentDetails} />
          <DetailTable title="Fee Details" data={feeDetails} />
        </div>
      )}
    </div>
  );
};

export default WithdrawalRequestDetail;
