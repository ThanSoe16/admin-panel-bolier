'use client';
import React from 'react';
import { PageBreadcrumb } from '@/components/shared/breadcrumb';
import { Icons } from '@/components/ui/icons';
import { DetailTable } from '@/components/shared/detail-table';
import { CircleAlert } from 'lucide-react';
import { formatDate } from '@/utils/dateTime';
import { Loading } from '@/components/shared/loading';
import { useGetUserDomainDetail } from '@/features/users/services/queries';
import { getFeeTypeName } from '@/utils/getFeeTypeName';

const DomainDetails = ({ id, domainId }: { id: string; domainId: string }) => {
  const { data, isLoading } = useGetUserDomainDetail(domainId);

  const links = [
    {
      label: 'All Users',
      href: '/users',
    },
    {
      label: 'Details',
      href: `/users/all/${id}`,
    },
    {
      label: 'Domain Registration',
      href: ``,
    },
  ];

  const domainDetails = [
    {
      label: 'Domain Name',
      value: <div className="text-primary">{data?.body?.data?.domainName ?? '-'}</div>,
    },
    {
      label: 'Purchased from',
      value: 'One Site Landing',
    },
    {
      label: 'Domain Purchased Status',
      value: getFeeTypeName(data?.body?.data?.domainPurchasedType ?? 'DOMAIN_REGISTRATION'),
    },
    {
      label: 'Linked',
      value: data?.body?.data?.linkedStatus ? 'Linked' : 'Not Linked',
    },
    {
      label: 'Domain Usage Status',
      value: data?.body?.data?.inUse ? 'Use' : 'Not Use',
    },
    {
      label: 'Expire on',
      value: data?.body?.data?.expiredAt ? formatDate(data?.body?.data?.expiredAt) : '-',
    },
    {
      label: 'Register on',
      value: data?.body?.data?.registeredAt ? formatDate(data?.body?.data?.registeredAt) : '-',
    },
    {
      label: 'Linked with (Template)',
      value: '-',
    },
    {
      label: 'Current Renewal Price',
      value: '$' + data?.body?.data?.currentRenewalPrice,
    },
  ];

  const feeDetails = [
    {
      label: 'Sub Total',
      value: '$' + data?.body?.data?.subTotal,
    },
    {
      label: 'One Site Service Fee',
      value: '$' + data?.body?.data?.serviceFee,
    },
    {
      label: 'Total',
      value: '$' + data?.body?.data?.totalPrice,
    },
  ];

  const billingInfo = [
    {
      label: 'Name',
      value: data?.body?.data?.username,
    },
    {
      label: 'Email',
      value: data?.body?.data?.email,
    },
  ];

  const paymentDetails = [
    {
      label: 'Payment Status',
      value: (
        <div className="flex items-center justify-center gap-2">
          {data?.body?.data?.paymentStatus === 'SUCCESSFUL' ? (
            <Icons.Done />
          ) : (
            <CircleAlert className="text-error w-4 h-4" />
          )}
          <p className="capitalize">{data?.body?.data?.paymentStatus?.toLocaleLowerCase()}</p>
        </div>
      ),
    },
    {
      label: 'Payment Method',
      value: 'Onesite Wallet',
    },
    {
      label: 'Card Number',
      value: '-',
    },
    {
      label: 'Payment Made on',
      value: formatDate(data?.body?.data?.paymentDate ?? ''),
    },
  ];
  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6 mb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <PageBreadcrumb links={links} enableBack />
        <p className="normal-text font-normal space-x-1">
          <span className="text-default-secondary">Invoice Number:</span>
          <span className="">{data?.body?.data?.transactionNo}</span>
        </p>
      </div>
      <DetailTable title="Domain Details" data={domainDetails} />
      <DetailTable title="Fee" data={feeDetails} />
      <DetailTable title="Billing Info" data={billingInfo} />
      <DetailTable title="Payment Details" data={paymentDetails} />
    </div>
  );
};

export default DomainDetails;
