'use client';
import React from 'react';
import PageTitle from '@/components/shared/base/page-title';
import { usePagination } from '@/features/base/hooks/usePagination';
import { DataTable } from '@/components/shared/data-table';
import SearchInput from '@/components/shared/input/search-input';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import dayjs from 'dayjs';
import { useGetHostingFeeIncomeReport } from '@/features/report/income/hosting-fee/services/queries';
import {
  hostingFeeDailyColumnDefs,
  hostingFeeMonthlyColumnDefs,
  hostingFeeTypeColumnDefs,
  hostingFeeYearlyColumnDefs,
} from './components/columnDefs';
import { HostingFeeTableData } from '@/features/report/income/hosting-fee/types';

const IncomeReportHostingFee = () => {
  const { rowPerPage, pageIndex, tab, date, word, mode, setMode } = usePagination();

  const { data, isLoading } = useGetHostingFeeIncomeReport({
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
    filter: mode === 'all' ? '' : mode,
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
      label: 'Hosting Fee',
      href: '',
    },
  ];

  const upperTableData: HostingFeeTableData[] = React.useMemo(
    () => [
      {
        name: 'Total Hosting Fee',
        total: data?.body?.data?.totalHostingFees?.total ?? 0,
        count: data?.body?.data?.totalHostingFees?.count ?? 0,
      },
      {
        name: 'New Hosting Fee',
        total: data?.body?.data?.newHostingFees?.total ?? 0,
        count: data?.body?.data?.newHostingFees?.count ?? 0,
      },
      {
        name: 'Renew Hosting Fee',
        total: data?.body?.data?.renewHostingFees?.total ?? 0,
        count: data?.body?.data?.renewHostingFees?.count ?? 0,
      },
    ],
    [data],
  );

  const currentDataTable = React.useMemo(() => {
    switch (tab) {
      case 'monthly':
        return {
          data: data?.body?.data?.hostingFeesList ?? [],
          columns: hostingFeeMonthlyColumnDefs,
        };
      case 'yearly':
        return {
          data: data?.body?.data?.hostingFeesList ?? [],
          columns: hostingFeeYearlyColumnDefs,
        };
      default:
        return {
          data: data?.body?.data?.hostingFeesList ?? [],
          columns: hostingFeeDailyColumnDefs,
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
      <DataTable data={upperTableData ?? []} columns={hostingFeeTypeColumnDefs} isShowNo={false} />
      <div className="mt-4 table-container">
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
                <PageTitle className="text-2xl font-semibold flex-1">Hosting Fee Renew</PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">Hosting Fee</PageTitle>
              )}

              {tab === 'daily' && (
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <SearchInput
                    placeholder="Search by Domain Name"
                    className="w-full md:w-[300px]"
                  />
                  <Select defaultValue="all" onValueChange={(value) => setMode(value)}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="renew">Renew</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IncomeReportHostingFee;
