'use client';

import React from 'react';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import Tabs from '@/components/shared/base/tabs';
import { useSearchParams } from 'next/navigation';
import Domains from './components/Domains';
import PurchasedTemplates from './components/PurchasedTemplates';
import Blog from './components/Blog';
import Profile from './components/Profile';
import TransactionHistory from './components/TransactionHistory';
import { useGetUserDetail, useGetUserEarningSummary } from '@/features/users/services/queries';
import WithdrawalHistory from './components/WithdrawalHistory';
import EarningHistory from './components/EarningHistory';
import { Flex, Grid } from '@radix-ui/themes';
import { CurrencyFormat, MMKCurrencyFormat } from '@/utils/currencyFormat';
import { ArrowLeftRight } from 'lucide-react';
import { Loading } from '@/components/shared/base/loading';

const links = [
  {
    label: 'All Users',
    href: '/users',
  },
  {
    label: 'User Details',
    href: '/users/details',
  },
];

const mainTabList = [
  {
    tab: ['domains', 'purchased-templates', 'blogs', 'earning-history', 'withdrawal-history'],
    label: 'Details',
    includeSearchParam: [
      'domains',
      'purchased-templates',
      'blogs',
      'withdrawal-history',
      'earning-history',
    ],
  },
  {
    tab: `transactions`,
    label: 'Transactions History',
  },
];

const secondaryTabList = [
  {
    tab: `domains`,
    label: 'Domains',
  },
  {
    tab: `purchased-templates`,
    label: 'Purchased Templates',
  },
  {
    tab: `blogs`,
    label: 'Blogs',
  },
  {
    tab: `withdrawal-history`,
    label: 'Withdrawal History',
  },
  {
    tab: `earning-history`,
    label: 'Earning History',
  },
];

interface UserDetailsProps {
  id: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ id }) => {
  const searchParams = useSearchParams();
  const userDetail = useGetUserDetail(id);
  const userEarningSummary = useGetUserEarningSummary(id);

  return (
    <div>
      <PageBreadcrumb links={links} enableBack />
      <div className="flex flex-row gap-4 justify-between">
        <Tabs tabList={mainTabList} className="my-4" />
      </div>

      <Profile
        balance={userDetail?.data?.body?.balance ?? ''}
        profile={userDetail?.data?.body?.customer}
      />

      {searchParams.get('tab') === 'transactions' ? (
        <TransactionHistory id={id} />
      ) : (
        <div className="space-y-4">
          {userEarningSummary.isPending ? (
            <Loading />
          ) : (
            <Grid columns={{ initial: '1', md: '2' }} className="gap-4">
              <div className="flex flex-col gap-2 bg-primary p-4 rounded-2xl text-white space-y-2">
                <p className="text-sm font-medium">Net. Earned (Available to Withdraw)</p>
                <Flex align={'center'} className="gap-2">
                  <p className="text-xl font-bold">
                    $
                    {CurrencyFormat(
                      Number(userEarningSummary?.data?.body?.data?.netEarn?.toFixed(2) ?? 0),
                    )}
                  </p>
                </Flex>
              </div>
              <div className="flex flex-col gap-2 bg-[#F7F7F7] p-4 rounded-2xl  space-y-2">
                <p className="text-sm font-medium">Total Earned</p>
                <Flex align={'center'} className="gap-2">
                  <p className="text-xl font-bold">
                    $
                    {CurrencyFormat(
                      Number(userEarningSummary?.data?.body?.data?.totalEarning?.toFixed(2) ?? 0),
                    )}
                  </p>
                </Flex>
              </div>
            </Grid>
          )}
          <Tabs tabList={secondaryTabList} />
          <>
            {(() => {
              switch (searchParams.get('tab')) {
                case 'domains':
                  return <Domains id={id} />;
                case 'purchased-templates':
                  return <PurchasedTemplates id={id} />;
                case 'blogs':
                  return <Blog id={id} />;
                case 'withdrawal-history':
                  return <WithdrawalHistory id={id} />;
                case 'earning-history':
                  return <EarningHistory id={id} />;
                default:
                  return null;
              }
            })()}
          </>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
