'use client';
import React from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { CurrencyFormat } from '@/utils/currencyFormat';
import IncomeReport from './components/IncomeReport';
import PopularCategory from './components/PopularCategory';
import { useGetDashboardData } from '@/features/dashboard/services/queries';
import { Loading } from '@/components/shared/loading';
import { formatYear } from '@/utils/dateTime';

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardData();

  const dashboardMetaData = [
    {
      icon: '/dashboard/users.svg',
      label: 'New Users',
      value: data?.body?.data?.newUsers,
      url: '/users',
    },
    {
      icon: '/dashboard/templates.svg',
      label: 'Template Sales',
      value: data?.body?.data?.templateSales,
      url: '/sale-history/template-sales',
    },
    {
      icon: '/dashboard/blog.svg',
      label: 'Blog Site Sales',
      value: data?.body?.data?.blogSiteSales,
      url: '/sale-history/blog-site',
    },
  ];
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle> Dashboard</PageTitle>
        <p>{formatYear(new Date())}</p>
      </div>
      {data?.body?.data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardMetaData.map((item, index) => (
              <Link key={index} href={item.url}>
                <div className="flex flex-row justify-between items-center pl-4">
                  <div className="flex flex-row items-center md:space-x-4">
                    {index != 0 && (
                      <div className="h-[50px] w-[1px] bg-[#E5E5E5] hidden md:block" />
                    )}
                    <div className="flex flex-row items-center justify-start gap-4 py-2  ">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={56}
                        height={56}
                        className="w-[56px] h-[56px]"
                      />
                      <div className="flex flex-col justify-center items-start gap-1">
                        <p className="text-default-secondary"> {item.label} </p>
                        <p className="text-default font-bold">
                          {' '}
                          {CurrencyFormat(item.value ?? 0)}{' '}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      index === 2 ? 'hidden' : 'md:block',
                      'h-[80%] w-[1px] bg-[#E5E5E5] mr-4 hidden',
                    )}
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <IncomeReport data={data?.body?.data} />
          </div>

          {data?.body?.data?.popularCategories.length > 0 && (
            <PopularCategory data={data?.body?.data?.popularCategories} />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
