'use client';
import React from 'react';
import dayjs from 'dayjs';
import PageTitle from '@/components/shared/base/page-title';
import { usePagination } from '@/features/base/hooks/usePagination';
import { DataTable } from '@/components/shared/data-table';
import { columnDefs } from './components/columnDefs';
import TopFilters from '../components/TopFilters';
import { DetailTable } from '@/components/shared/data-table/detail-table';
import { useGetIncomeReport } from '@/features/report/income/services/queries';
import { CurrencyFormat } from '@/utils/currencyFormat';

const IncomeReport = () => {
  const { date, tab } = usePagination();

  const { data, isLoading } = useGetIncomeReport({
    date:
      tab === 'monthly'
        ? dayjs(date).format('YYYY-MM')
        : tab === 'yearly'
          ? dayjs(date).format('YYYY')
          : dayjs(date).format('YYYY-MM-DD'),
    type: tab,
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <PageTitle>Income Report</PageTitle>

      <TopFilters />

      <DetailTable
        data={[
          {
            label: 'Total Income',
            value: `$${CurrencyFormat(data?.body?.data?.totalIncome?._sum?.total ?? 0)}`,
          },
        ]}
        title="Income Details"
      />

      <DataTable
        isLoading={isLoading}
        data={data?.body?.data?.results ?? []}
        columns={columnDefs}
        isShowNo={false}
      />
    </div>
  );
};

export default IncomeReport;
