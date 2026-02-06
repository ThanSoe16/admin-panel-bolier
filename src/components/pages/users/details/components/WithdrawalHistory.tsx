import { DataTable } from '@/components/shared/data-table';
import { usePagination } from '@/features/base/hooks/usePagination';
import { useGetUserWithdrawHistory } from '@/features/users/services/queries';
import { historyColDefs } from './withdrawColDefs';

const WithdrawalHistory = ({ id }: { id: string }) => {
  const { query } = usePagination();
  const { data, isLoading } = useGetUserWithdrawHistory(id);

  return (
    <div className="w-[calc(100dvw-50px)] md:w-full">
      <DataTable
        columns={historyColDefs}
        data={data?.body?.data ?? []}
        isShowNo={false}
        total={data?.body?.total}
        query={query}
        isLoading={isLoading}
      />
    </div>
  );
};

export default WithdrawalHistory;
