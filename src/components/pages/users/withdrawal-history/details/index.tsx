'use client';
import React, { useState } from 'react';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import { useGetWithdrawalHistoryById } from '@/features/withdrawal/services/queries';
import { Loading } from '@/components/shared/base/loading';
import { DetailTable } from '@/components/shared/data-table/detail-table';
import { Flex } from '@radix-ui/themes';
import { ArrowRightLeft, ChevronRight, X } from 'lucide-react';
import { formatDate } from '@/utils/dateTime';
import Link from 'next/link';
import Status from '@/components/shared/base/status';
import CopyButton from '@/components/shared/buttons/copy-button';
import { CurrencyFormat, MMKCurrencyFormat } from '@/utils/currencyFormat';
import { Image } from '@/components/ui/image';
import { useGetAdminDetail } from '@/features/admins/services/queries';
import ImagePreview from '@/components/shared/base/image-preview';
import { ImagePreviewDialog } from '@/components/shared/dialog/image-preview-dialog';
import ProfileAvatar from '@/components/shared/base/profile-avatar';

const links = [
  {
    label: 'Withdrawal History',
    href: '/users/withdrawal-history',
  },
  {
    label: 'Details',
    href: '',
  },
];

const WithdrawalHistoryDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetWithdrawalHistoryById(id);
  const detailData = data?.body;

  const { data: adminData } = useGetAdminDetail(detailData?.ApprovedByAdminId ?? '');

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
      label: 'Withdrawal Status',
      value: (
        <Flex align={'center'} className="gap-1">
          {detailData?.OnesiteWithdrawStatus === 'REJECTED' && (
            <X className="text-destructive" size={18} />
          )}
          {detailData?.OnesiteWithdrawStatus === 'SUCCESSFUL' && (
            <Image
              src="/components/done_green.svg"
              width={18}
              height={18}
              alt="done"
              className="w-4 h-4"
            />
          )}
          <p className="capitalize">{detailData?.OnesiteWithdrawStatus.toLowerCase()}</p>
        </Flex>
      ),
    },
    {
      label: 'Requested Date',
      value: detailData?.requestedDate ? formatDate(detailData?.requestedDate) : '',
    },
    {
      label: detailData?.OnesiteWithdrawStatus === 'SUCCESSFUL' ? 'Confirmed on' : 'Rejected on',
      value: detailData?.confirmedDate ? formatDate(detailData?.confirmedDate) : '',
    },
    {
      label:
        detailData?.OnesiteWithdrawStatus === 'SUCCESSFUL'
          ? 'Confirmed by (Admin)'
          : 'Rejected by (Admin)',
      value: adminData?.body?.data?.name ?? '',
    },

    {
      label:
        detailData?.OnesiteWithdrawStatus === 'SUCCESSFUL' ? 'Proof of Payment' : 'Reject Reason',
      value:
        detailData?.OnesiteWithdrawStatus === 'SUCCESSFUL' ? (
          <ImagePreviewDialog
            src={detailData.PaymentProof?.url ?? ''}
            alt="payment-proof"
            className="w-12 h-12 rounded-lg cursor-pointer"
          />
        ) : (
          <p className="line-clamp-2 text-destructive">{detailData?.rejectReason ?? '-'}</p>
        ),
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
      value: detailData?.OneSiteUser.username,
    },
    {
      label: 'Email',
      value: detailData?.OneSiteUser.email,
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
      value: <CopyButton value={detailData?.OnesiteUserReceivingAccount?.accountName ?? ''} />,
    },
    {
      label: 'Recipient Acc. Number',
      value: <CopyButton value={detailData?.OnesiteUserReceivingAccount?.accountNumber ?? ''} />,
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
      <Flex justify={'between'} align={'center'}>
        <PageBreadcrumb links={links} enableBack />
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
      {/* {open && (
        <ImagePreview
          imageUrl={detailData?.PaymentProof?.url ?? ""}
          open={open}
          onClose={() => setOpen(false)}
        />
      )} */}
    </div>
  );
};

export default WithdrawalHistoryDetail;
