'use client';
import React from 'react';
import dayjs from 'dayjs';
import PageTitle from '@/components/shared/PageTitle';
import { usePagination } from '@/features/base/hooks/usePagination';
import { DataTable } from '@/components/shared/data-table';
import {
  monthlyNewUsersColumnDefs,
  todayNewUsersColumnDefs,
  yearlyNewUsersColumnDefs,
} from './components/columnDefs';
import TopFilters from '../components/TopFilters';
import SearchInput from '@/components/shared/search-input';
import { DetailTable } from '@/components/shared/detail-table';
import { useGetUserReport } from '@/features/report/users/services/queries';

const UserReport = () => {
  const { rowPerPage, pageIndex, date, tab, word } = usePagination();
  const { data, isLoading } = useGetUserReport({
    date:
      tab === 'monthly'
        ? dayjs(date).format('YYYY-MM')
        : tab === 'yearly'
          ? dayjs(date).format('YYYY')
          : date,
    type: tab,
    word,
    pageIndex,
    rowPerPage,
  });

  const currentDataTable = React.useMemo(() => {
    switch (tab) {
      case 'monthly':
        return {
          data: data?.body?.data?.userList ?? [],
          columns: monthlyNewUsersColumnDefs,
          isShowNo: false,
          header: <PageTitle>All Templates</PageTitle>,
        };
      case 'yearly':
        return {
          data: data?.body?.data?.userList ?? [],
          columns: yearlyNewUsersColumnDefs,
          isShowNo: false,
          header: <PageTitle>All Templates</PageTitle>,
        };
      default:
        return {
          data: data?.body?.data?.userList ?? [],
          columns: todayNewUsersColumnDefs,
          isShowNo: false,
          header: <PageTitle>Today Sale Templates</PageTitle>,
        };
    }
  }, [tab, data]);

  return (
    <div className="flex flex-col w-full gap-4">
      <PageTitle> User Reports </PageTitle>

      <TopFilters />

      <DetailTable
        data={[
          {
            label: 'Total Users',
            value: data?.body?.data?.totalUsers,
          },
          {
            label: 'New Users',
            value: data?.body?.data?.newUsers,
          },
        ]}
        title="User Details"
      />
      <div className="w-[calc(100dvw-65px)] md:w-full">
        <DataTable
          isLoading={isLoading}
          isShowNo={false}
          data={currentDataTable.data}
          columns={currentDataTable.columns}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={data?.body?.total}
          renderHeader={() => (
            <div className="flex items-center justify-between gap-2">
              <PageTitle className="mb-0"> Users List </PageTitle>
              {tab === 'daily' && <SearchInput placeholder="Search by Username or ID" />}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default UserReport;
