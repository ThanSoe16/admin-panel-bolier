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
import {
  useGetMaintainFeeIncomeMonthlyReport,
  useGetMaintainFeeIncomeReport,
} from '@/features/report/income/maintain-fee/services/queries';
import { MaintainFeeTableData } from '@/features/report/income/maintain-fee/types';
import { maintainFeeDailyColumnDefs, maintainFeeTypeColumnDefs } from '../components/columnDefs';

const IncomeReportMaintainFeeDetail = ({ type }: { type: 'daily' | 'monthly' | 'yearly' }) => {
  const { rowPerPage, pageIndex, date, word, mode, setMode } = usePagination();

  const maintainFeeDaily = useGetMaintainFeeIncomeReport({
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
    filter: mode === 'all' ? '' : mode,
  });

  const maintainFeeMonthly = useGetMaintainFeeIncomeMonthlyReport({
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
    filter: mode === 'all' ? '' : mode,
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
      label: 'Maintain Fee',
      href: '',
    },
  ];

  const upperTableData: MaintainFeeTableData[] = React.useMemo(
    () => [
      {
        name: 'Total Maintain Fee',
        total: maintainFeeDaily?.data?.body?.data?.totalMaintainFees?.total ?? 0,
        count: maintainFeeDaily?.data?.body?.data?.totalMaintainFees?.count ?? 0,
      },
      {
        name: 'New Maintain Fee',
        total: maintainFeeDaily?.data?.body?.data?.newMaintainFees?.total ?? 0,
        count: maintainFeeDaily?.data?.body?.data?.newMaintainFees?.count ?? 0,
      },
      {
        name: 'Renew Maintain Fee',
        total: maintainFeeDaily?.data?.body?.data?.renewMaintainFees?.total ?? 0,
        count: maintainFeeDaily?.data?.body?.data?.renewMaintainFees?.count ?? 0,
      },
    ],
    [maintainFeeDaily?.data],
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <PageBreadcrumb links={links} enableBack />

      <div className="text-brand normal-text font-semibold mt-2">
        Report {type === 'yearly' ? 'Year' : type === 'monthly' ? 'Month' : 'Date'} -{' '}
        {type == 'monthly' ? dayjs(date).format('MMM YYYY') : dayjs(date).format('DD MMM YYYY')}
      </div>
      <DataTable data={upperTableData ?? []} columns={maintainFeeTypeColumnDefs} isShowNo={false} />
      <div className="mt-4">
        <DataTable
          isShowNo={false}
          isLoading={type == 'daily' ? maintainFeeDaily.isLoading : maintainFeeMonthly.isLoading}
          data={
            type == 'daily'
              ? (maintainFeeDaily.data?.body?.data?.maintainFeesList ?? [])
              : (maintainFeeMonthly.data?.body?.data?.maintainFeesList ?? [])
          }
          columns={maintainFeeDailyColumnDefs}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={maintainFeeDaily.data?.body?.total}
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {type === 'yearly' ? (
                <PageTitle className="text-2xl font-semibold flex-1">Maintain Fee Renew</PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">Maintain Fee</PageTitle>
              )}

              {type === 'daily' && (
                <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
                  <SearchInput placeholder="Search by User Name" className="w-full md:w-[65%]" />
                  <Select defaultValue="all" onValueChange={(value) => setMode(value)}>
                    <SelectTrigger className="w-full md:w-[35%]">
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

export default IncomeReportMaintainFeeDetail;
