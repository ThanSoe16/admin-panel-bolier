"use client";
import PageTitle from "@/components/shared/PageTitle";
import Tabs from "@/components/shared/tabs";
import { usePagination } from "@/features/base/hooks/usePagination";
import ExchangeRate from "./_components/ExchangeRate";
import ServiceFeeHistory from "./_components/ServiceFeeHistory";
import { useGetExchangeRate } from "@/features/payment-settings/exchange-rate-service/services/queries";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

const secondaryTabList = [
  {
    tab: `exchange-rate`,
    label: "Exchange Rates",
  },
  {
    tab: `service-fee`,
    label: "Rate & Exchange Service Fee History",
  },
];

const ExchangeRateService = () => {
  const { tab } = usePagination();
  const exchangeRate = useGetExchangeRate({
    pageIndex: 1,
    rowPerPage: 100,
    search: "",
  });

  const [currency, setCurrency] = useQueryState("currency");

  useEffect(() => {
    const list = exchangeRate.data?.body?.data;
    if (!list?.length) return;

    if (!currency) {
      setCurrency(list[0].id);
    }
  }, [exchangeRate.data, currency, setCurrency]);

  return (
    <div>
      <PageTitle> Exchange Rate & Service Fee </PageTitle>
      <div>
        <Tabs tabList={secondaryTabList} className="mb-4" />
        {(() => {
          switch (tab) {
            case "exchange-rate":
              return (
                <div>
                  <ExchangeRate />
                </div>
              );
            case "service-fee":
              return (
                <div>
                  {exchangeRate.data?.body?.data && currency && (
                    <ServiceFeeHistory
                      currency={currency}
                      exchangeRates={exchangeRate.data?.body?.data}
                    />
                  )}
                </div>
              );

            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};
export default ExchangeRateService;
