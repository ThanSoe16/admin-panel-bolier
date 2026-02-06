'use client';
import React from 'react';
import { DataTable } from '@/components/shared/data-table';
import PageTitle from '@/components/shared/base/page-title';
import { usePagination } from '@/features/base/hooks/usePagination';
import { useGetWithdrawal } from '@/features/withdrawal/services/queries';
import { historyColDefs } from './_components/withdrawalColDefs';
import SearchInput from '@/components/shared/input/search-input';

const WithdrawalHistory = () => {
  const { query } = usePagination();
  const withdrawals = useGetWithdrawal({
    search: query.word,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
  });

  return (
    <div>
      <PageTitle> Withdrawal History </PageTitle>
      <div className="table-container">
        <DataTable
          isShowNo={false}
          data={withdrawals?.data?.body?.data ?? []}
          columns={historyColDefs}
          total={withdrawals?.data?.body?.total}
          query={query}
          isLoading={withdrawals?.isLoading}
          renderHeader={() => (
            <div className="flex flex-row gap-0 md:gap-4 justify-start items-center">
              <SearchInput
                placeholder="Search by username or withdrawal ID"
                className="w-[400px]"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default WithdrawalHistory;
