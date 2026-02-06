'use client';
import React from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { usePagination } from '@/features/base/hooks/usePagination';
import { DataTable } from '@/components/shared/data-table';
import SearchInput from '@/components/shared/search-input';
import { PageBreadcrumb } from '@/components/shared/breadcrumb';
import dayjs from 'dayjs';
import {
  useGetServerFeeIncomeMonthlyReport,
  useGetServerFeeIncomeReport,
} from '@/features/report/income/server-fee/services/queries';
import { ServerFeeTableData } from '@/features/report/income/server-fee/types';
import { serverFeeDailyColumnDefs, serverFeeTypeColumnDefs } from '../components/columnDefs';

const IncomeReportServerFeeDetail = ({ type }: { type: 'daily' | 'monthly' | 'yearly' }) => {
  const { rowPerPage, pageIndex, date, word } = usePagination();

  const serverFeeDaily = useGetServerFeeIncomeReport({
    date:
      type === 'monthly'
        ? dayjs(date).format('YYYY-MM')
        : type === 'yearly'
          ? dayjs(date).format('YYYY')
          : date,
    type: type,
    pageIndex,
    rowPerPage,
    word,
  });

  const serverFeeMonthly = useGetServerFeeIncomeMonthlyReport({
    date:
      type === 'monthly'
        ? dayjs(date).format('YYYY-MM')
        : type === 'yearly'
          ? dayjs(date).format('YYYY')
          : date,
    type: type,
    pageIndex,
    rowPerPage,
    word,
  });

  const links = [
    {
      label: 'Income Report',
      href: '/reports/income',
    },
    {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      href: `/reports/income?tab=${type}`,
    },
    {
      label: 'Server Fee',
      href: '',
    },
  ];

  const upperTableData: ServerFeeTableData[] = React.useMemo(
    () => [
      {
        name: 'Total Server Fee',
        total: serverFeeDaily?.data?.body?.data?.totalServerFees?.total ?? 0,
        count: serverFeeDaily?.data?.body?.data?.totalServerFees?.count ?? 0,
      },
      {
        name: 'New Server Fee',
        total: serverFeeDaily?.data?.body?.data?.newServerFees?.total ?? 0,
        count: serverFeeDaily?.data?.body?.data?.newServerFees?.count ?? 0,
      },
      {
        name: 'Renew Server Fee',
        total: serverFeeDaily?.data?.body?.data?.renewServerFees?.total ?? 0,
        count: serverFeeDaily?.data?.body?.data?.renewServerFees?.count ?? 0,
      },
    ],
    [serverFeeDaily?.data],
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <PageBreadcrumb links={links} enableBack />

      <div className="text-brand normal-text font-semibold mt-2">
        Report {type === 'yearly' ? 'Year' : type === 'monthly' ? 'Month' : 'Date'} -{' '}
        {type == 'monthly' ? dayjs(date).format('MMM YYYY') : dayjs(date).format('DD MMM YYYY')}
      </div>
      <DataTable data={upperTableData ?? []} columns={serverFeeTypeColumnDefs} isShowNo={false} />
      <div className="mt-4">
        <DataTable
          isShowNo={false}
          isLoading={type == 'daily' ? serverFeeDaily?.isLoading : serverFeeMonthly?.isLoading}
          data={
            type == 'daily'
              ? (serverFeeDaily?.data?.body?.data?.serverFeesList ?? [])
              : (serverFeeMonthly?.data?.body?.data?.serverFeesList ?? [])
          }
          columns={serverFeeDailyColumnDefs}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={
            type == 'daily'
              ? (serverFeeMonthly?.data?.body?.total ?? 0)
              : (serverFeeMonthly?.data?.body?.total ?? 0)
          }
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {type === 'yearly' ? (
                <PageTitle className="text-2xl font-semibold flex-1">Server Fee Renew</PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">Server Fee</PageTitle>
              )}

              {type === 'daily' && (
                <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 max-w-[340px]">
                  <SearchInput placeholder="Search by User Name or Store Name" className="w-full" />
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IncomeReportServerFeeDetail;
