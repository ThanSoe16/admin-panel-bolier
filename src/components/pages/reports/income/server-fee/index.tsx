'use client';
import React from 'react';
import PageTitle from '@/components/shared/base/page-title';
import { usePagination } from '@/features/base/hooks/usePagination';
import { DataTable } from '@/components/shared/data-table';
import SearchInput from '@/components/shared/input/search-input';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import dayjs from 'dayjs';
import { useGetServerFeeIncomeReport } from '@/features/report/income/server-fee/services/queries';
import {
  serverFeeDailyColumnDefs,
  serverFeeMonthlyColumnDefs,
  serverFeeTypeColumnDefs,
  serverFeeYearlyColumnDefs,
} from './components/columnDefs';
import { ServerFeeTableData } from '@/features/report/income/server-fee/types';

const IncomeReportServerFee = () => {
  const { rowPerPage, pageIndex, tab, date, word } = usePagination();

  const { data, isLoading } = useGetServerFeeIncomeReport({
    date:
      tab === 'monthly'
        ? dayjs(date).format('YYYY-MM')
        : tab === 'yearly'
          ? dayjs(date).format('YYYY')
          : date,
    type: tab,
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
      label: tab.charAt(0).toUpperCase() + tab.slice(1),
      href: `/reports/income?tab=${tab}`,
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
        total: data?.body?.data?.totalServerFees?.total ?? 0,
        count: data?.body?.data?.totalServerFees?.count ?? 0,
      },
      {
        name: 'New Server Fee',
        total: data?.body?.data?.newServerFees?.total ?? 0,
        count: data?.body?.data?.newServerFees?.count ?? 0,
      },
      {
        name: 'Renew Server Fee',
        total: data?.body?.data?.renewServerFees?.total ?? 0,
        count: data?.body?.data?.renewServerFees?.count ?? 0,
      },
    ],
    [data],
  );

  const currentDataTable = React.useMemo(() => {
    switch (tab) {
      case 'monthly':
        return {
          data: data?.body?.data?.serverFeesList ?? [],
          columns: serverFeeMonthlyColumnDefs,
        };
      case 'yearly':
        return {
          data: data?.body?.data?.serverFeesList ?? [],
          columns: serverFeeYearlyColumnDefs,
        };
      default:
        return {
          data: data?.body?.data?.serverFeesList ?? [],
          columns: serverFeeDailyColumnDefs,
        };
    }
  }, [tab, data]);

  return (
    <div className="flex flex-col w-full gap-4">
      <PageBreadcrumb links={links} enableBack />

      <div className="text-brand normal-text font-semibold mt-2">
        Report {tab === 'yearly' ? 'Year' : tab === 'monthly' ? 'Month' : 'Date'} -{' '}
        {dayjs(date).format(
          tab === 'yearly' ? 'YYYY' : tab === 'monthly' ? 'MMM YYYY' : 'DD MMM YYYY',
        )}
      </div>
      <DataTable data={upperTableData ?? []} columns={serverFeeTypeColumnDefs} isShowNo={false} />
      <div className="mt-4">
        <DataTable
          isShowNo={false}
          isLoading={isLoading}
          data={currentDataTable?.data}
          columns={currentDataTable?.columns}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={data?.body?.total}
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {tab === 'yearly' ? (
                <PageTitle className="text-2xl font-semibold flex-1">Server Fee Renew</PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">Server Fee</PageTitle>
              )}

              {tab === 'daily' && (
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

export default IncomeReportServerFee;
