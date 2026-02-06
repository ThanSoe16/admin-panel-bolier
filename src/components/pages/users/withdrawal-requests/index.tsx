'use client';
import React, { useState } from 'react';
import { DataTable } from '@/components/shared/data-table';
import PageTitle from '@/components/shared/base/page-title';
import { usePagination } from '@/features/base/hooks/usePagination';
import {
  useGetWithdrawalRequests,
  useGetWithdrawalSetting,
} from '@/features/withdrawal/services/queries';
import SearchInput from '@/components/shared/input/search-input';
import { Flex } from '@radix-ui/themes';
import SecondaryEditButton from '@/components/shared/buttons/secondary-edit-button';
import { requestColDefs } from './_components/requestColDefs';
import WithdrawSetting from './_components/WithdrawSetting';
import { Settings } from 'lucide-react';

const WithdrawalRequest = () => {
  const { query } = usePagination();
  const withdrawals = useGetWithdrawalRequests({
    search: query.word,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
  });
  const withdrawSetting = useGetWithdrawalSetting();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageTitle> Withdrawal Requests </PageTitle>
      <div className="table-container">
        <DataTable
          isShowNo={false}
          data={withdrawals?.data?.body?.data ?? []}
          columns={requestColDefs}
          total={withdrawals?.data?.body?.total}
          query={query}
          isLoading={withdrawals?.isLoading}
          renderHeader={() => (
            <Flex justify={'between'} align={'center'} className="flex flex-row gap-0 md:gap-4 ">
              <SearchInput
                placeholder="Search by username or withdrawal ID"
                className="md:w-[400px]"
              />

              <SecondaryEditButton
                asBtn
                btnName="Withdrawal Date Setting"
                onClick={() => setIsModalOpen(true)}
                icon={<Settings className="min-w-5 min-h-5" size={20} />}
              />
            </Flex>
          )}
        />
      </div>
      {isModalOpen && withdrawSetting?.data?.body?.data && (
        <WithdrawSetting
          open={isModalOpen}
          handleClose={setIsModalOpen}
          data={withdrawSetting?.data?.body?.data}
        />
      )}
    </div>
  );
};

export default WithdrawalRequest;
