import { DataTable } from "@/components/shared/data-table";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetUserEarningHistory } from "@/features/users/services/queries";
import { earningColDefs } from "./earningColDefs";

const EarningHistory = ({ id }: { id: string }) => {
  const { query } = usePagination();
  const { data, isLoading } = useGetUserEarningHistory(id);

  return (
    <div className="w-[calc(100dvw-50px)] md:w-full">
      <DataTable
        columns={earningColDefs}
        data={data?.body?.data ?? []}
        isShowNo={false}
        total={data?.body?.total}
        query={query}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EarningHistory;
