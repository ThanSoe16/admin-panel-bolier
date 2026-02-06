"use client";
import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import NoInvoice from "./components/NoInvoice";
import CreateButton from "@/components/shared/buttons/CreateButton";
import SearchInput from "@/components/shared/search-input";
import { DataTable } from "@/components/shared/data-table";
import { columnDefs } from "./components/columnDefs";
import MonthPicker from "@/components/ui/month-picker";
import OptionSelect from "@/components/shared/OptionSelect";
import { toSentenceCase } from "@/utils/toSentenceCase";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetInvoices } from "@/features/invoice/services/queries";
import { parseAsString, useQueryState } from "nuqs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useGetInvoiceNumber } from "@/features/invoice/services/mutations";

const UserInvoice = () => {
  const router = useRouter();
  const getInvoiceNumber = useGetInvoiceNumber();
  const { status, setStatus, query } = usePagination();
  const [month, setMonth] = useQueryState(
    "month",
    parseAsString.withDefault(
      `${dayjs().startOf("month").format("YYYY-MM-DD")}`
    )
  );

  const invoiceCount = useGetInvoices({});

  const invoices = useGetInvoices({
    word: query.word,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
    InvoiceStatus:
      status === "all"
        ? undefined
        : status == "Paid"
        ? "PAID"
        : status == "Unpaid"
        ? "UNPAID"
        : status == "Draft"
        ? "PENDING"
        : "OVERDUE",
    month: dayjs(month).format("YYYY-MM"),
  });

  return (
    <div>
      <PageTitle> User Invoices </PageTitle>
      {invoiceCount?.data?.body?.total === 0 && <NoInvoice />}
      <div className="table-container">
        {invoiceCount?.data?.body?.total !== 0 && (
          <DataTable
            columns={columnDefs}
            data={invoices.data?.body?.data ?? []}
            isLoading={invoices.isLoading}
            isShowNo={false}
            query={query}
            total={invoices.data?.body?.total ?? 0}
            renderHeader={() => (
              <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex flex-row gap-0 md:gap-4 justify-start items-center">
                  <CreateButton
                    asBtn
                    isLoading={getInvoiceNumber.isPending}
                    onClick={() => {
                      getInvoiceNumber.mutateAsync().then((res) => {
                        router.push(
                          `/invoice/create?invoiceNumber=${res.body?.data}`
                        );
                      });
                    }}
                  />
                  <SearchInput />
                </div>
                <div className="flex flex-row gap-0 md:gap-4 justify-start items-center">
                  <MonthPicker
                    enableMonth
                    date={month ? new Date(month) : new Date()}
                    onChange={(e) =>
                      setMonth(dayjs(e).startOf("month").toISOString())
                    }
                    className="w-[150px] h-[44px]"
                  />
                  <OptionSelect
                    options={["all", "Paid", "Unpaid", "Overdue", "Draft"].map(
                      (item) => ({
                        label: toSentenceCase(item),
                        value: item,
                      })
                    )}
                    value={status}
                    onChange={setStatus}
                    selectClassName="w-[150px]"
                  />
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default UserInvoice;
