"use client";
import { useGetExchangeRate } from "@/features/payment-settings/exchange-rate-service/services/queries";
import { exchangeRateColDefs } from "./exchangeRateColDefs";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useState } from "react";
import { DraggableTable } from "@/components/shared/data-table/draggable-table";
import CreateButton from "@/components/shared/buttons/CreateButton";
import SearchInput from "@/components/shared/search-input";
import SecondaryEditButton from "@/components/shared/buttons/SecondaryEditButton";
import { Flex } from "@radix-ui/themes";
import CreateCurrency from "./CreateCurrency";
import EditAllExchangeRate from "./EditAllExchangeRate";
import { useUpdateExchangeRateOrder } from "@/features/payment-settings/exchange-rate-service/services/mutations";

const ExchangeRate = () => {
  const { query } = usePagination();
  const updateExchangeRateOrder = useUpdateExchangeRateOrder();
  const exchangeRate = useGetExchangeRate({
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
    search: query.word,
  });

  const allExchangeRate = useGetExchangeRate({
    pageIndex: 1,
    rowPerPage: 9999,
    search: "",
  });

  const [open, setOpen] = useState(false);
  const [editAllOpen, setEditAllOpen] = useState(false);

  return (
    <div>
      <div className="table-container-tab">
        <DraggableTable
          data={exchangeRate.data?.body?.data ?? []}
          columns={exchangeRateColDefs}
          isLoading={exchangeRate.isLoading}
          total={exchangeRate.data?.body?.total ?? 0}
          query={query}
          onPositionChange={(data) => {
            const newArr = data.map((item, idx) => ({
              id: String(item.id),
              index: idx + 1,
            }));

            updateExchangeRateOrder.mutate({ items: newArr });
            return;
          }}
          renderHeader={() => (
            <div className="flex flex-row gap-0 md:gap-4 justify-between items-center">
              <SearchInput placeholder="Search by currency name" />
              <Flex className="space-x-2">
                <CreateButton asBtn onClick={() => setOpen(true)} />
                <SecondaryEditButton
                  asBtn
                  onClick={() => {
                    setEditAllOpen(true);
                  }}
                />
              </Flex>
            </div>
          )}
          isShowNo={false}
        />
      </div>
      {open && (
        <CreateCurrency
          open={open}
          handleClose={() => setOpen(false)}
          total={exchangeRate.data?.body?.total ?? 0}
        />
      )}
      {allExchangeRate.data?.body?.data && editAllOpen && (
        <EditAllExchangeRate
          open={editAllOpen}
          handleClose={() => setEditAllOpen(false)}
          data={allExchangeRate.data?.body?.data ?? []}
        />
      )}
    </div>
  );
};
export default ExchangeRate;
