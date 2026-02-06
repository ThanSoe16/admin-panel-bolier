'use client';
import React from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { usePagination } from '@/features/base/hooks/usePagination';
import { DataTable } from '@/components/shared/data-table';
import SearchInput from '@/components/shared/search-input';
import { PageBreadcrumb } from '@/components/shared/breadcrumb';
import {
  useGetSetupFeeIncomeMonthlyReport,
  useGetSetupFeeIncomeReport,
} from '@/features/report/income/setup-fee/services/queries';
import dayjs from 'dayjs';
import { setupFeeDailyColumnDefs, setupFeeTypeColumnDefs } from '../components/columnDefs';

const IncomeReportSetupFeeDetail = ({ type }: { type: 'daily' | 'monthly' | 'yearly' }) => {
  const { rowPerPage, pageIndex, date, word } = usePagination();

  const setupFeeDaily = useGetSetupFeeIncomeReport({
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

  const setupFeeMonthly = useGetSetupFeeIncomeMonthlyReport({
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
      label: 'Setup (Blog Sites)',
      href: '',
    },
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      <PageBreadcrumb links={links} enableBack />

      <div className="text-brand normal-text font-semibold mt-2">
        Report {type === 'yearly' ? 'Year' : type === 'monthly' ? 'Month' : 'Date'} -{' '}
        {type == 'monthly' ? dayjs(date).format('MMM YYYY') : dayjs(date).format('DD MMM YYYY')}
      </div>
      <DataTable
        data={setupFeeDaily?.data?.body?.data?.total ?? []}
        columns={setupFeeTypeColumnDefs}
        isShowNo={false}
      />
      <div className="mt-4">
        <DataTable
          isShowNo={false}
          isLoading={type == 'daily' ? setupFeeDaily.isLoading : setupFeeMonthly.isLoading}
          data={
            type == 'daily'
              ? (setupFeeDaily?.data?.body?.data?.blogs ?? [])
              : (setupFeeMonthly?.data?.body?.data?.blogs ?? [])
          }
          columns={setupFeeDailyColumnDefs}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={
            type == 'daily' ? setupFeeDaily?.data?.body?.total : setupFeeMonthly?.data?.body?.total
          }
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {type === 'yearly' ? (
                <PageTitle className="text-2xl font-semibold flex-1">Maintain Fee Renew</PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">
                  Setup (Blog Sites)
                </PageTitle>
              )}

              {type === 'daily' && (
                <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 max-w-[340px]">
                  <SearchInput placeholder="Search by template name or ID" className="w-full" />
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IncomeReportSetupFeeDetail;
