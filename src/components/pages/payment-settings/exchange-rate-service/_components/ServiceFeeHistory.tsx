import { DataTable } from "@/components/shared/data-table";
import { rateHistoryColDefs } from "./rateHistoryColDefs";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetExchangeRateHistory } from "@/features/payment-settings/exchange-rate-service/services/queries";
import dayjs from "dayjs";
import SelectBoxFilter from "@/components/shared/base/SelectBoxFilter";
import { ExchangeRateData } from "@/features/payment-settings/exchange-rate-service/types";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

const ServiceFeeHistory = ({
  currency,
  exchangeRates,
}: {
  currency: string;
  exchangeRates: ExchangeRateData[];
}) => {
  const { query, start, end, setStart, setEnd } = usePagination();

  const exchangeRateHistory = useGetExchangeRateHistory({
    id: currency,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
    startDate: start ? dayjs(start).startOf("day")?.toISOString() : "",
    endDate: end ? dayjs(end).endOf("day")?.toISOString() : "",
  });

  return (
    <div>
      <div className="table-container-tab">
        <DataTable
          data={exchangeRateHistory.data?.body?.data ?? []}
          columns={rateHistoryColDefs}
          isLoading={exchangeRateHistory.isLoading}
          total={exchangeRateHistory.data?.body?.total ?? 0}
          query={query}
          renderHeader={() => (
            <div className="flex flex-row gap-0 md:gap-4 justify-between items-center">
              <DatePickerWithRange
                value={
                  start
                    ? {
                        from: new Date(start),
                        to: end ? new Date(end) : undefined,
                      }
                    : undefined
                }
                onChange={(range) => {
                  setStart(range?.from ? range?.from?.toISOString() : null);
                  setEnd(range?.to ? range?.to?.toISOString() : null);
                }}
              />
              <SelectBoxFilter
                arr={
                  exchangeRates?.map((item) => ({
                    label: item.BaseCurrency?.currencyCode,
                    value: item.id,
                  })) || []
                }
                selectParam="currency"
                classNames="h-11 w-[150px] bg-background rounded-xl"
              />
            </div>
          )}
          isShowNo={false}
        />
      </div>
    </div>
  );
};
export default ServiceFeeHistory;
