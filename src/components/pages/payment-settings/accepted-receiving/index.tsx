"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";
import CreateButton from "@/components/shared/buttons/CreateButton";
import { acceptedReceivingColDefs } from "./_components/AcceptedReceivingColDefs";
import CreateMethod from "./_components/CreateMethod";
import { Flex } from "@radix-ui/themes";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import MaxAccSetting from "./_components/MaxAccSetting";
import { useGetAcceptedReceivingPayment } from "@/features/payment-settings/accepted-receiving/services/queries";
import { useGetReceivingAccountConfig } from "@/features/payment-settings/accepted-receiving/services/queries";
import { cn } from "@/lib/utils";
import { CurrencyFormat } from "@/utils/currencyFormat";

const AcceptedReceiving = () => {
  const { query } = usePagination();
  const { data, isLoading } = useGetAcceptedReceivingPayment(query);
  const { data: configData } = useGetReceivingAccountConfig();

  const [open, setOpen] = useState(false);
  const [maxAccOpen, setMaxAccOpen] = useState(false);

  return (
    <div>
      <PageTitle> Accepted Receiving Payment Methods </PageTitle>
      <Flex
        justify={"between"}
        align={"center"}
        wrap={"wrap"}
        className="shadow p-4 rounded-xl mb-2"
      >
        <p className={cn("text-sm", data?.body?.total === 0 && "opacity-50")}>
          Maximum number of receiving account per blog owner:{" "}
          <b className="text-primary text-base">
            {CurrencyFormat(configData?.body?.data.maxReceivingAccount ?? 0)}
          </b>
        </p>
        <div>
          <TableBaseButton
            uiType="edit"
            onClick={() => setMaxAccOpen(true)}
            disabled={data?.body?.total === 0}
          >
            Edit
          </TableBaseButton>
        </div>
      </Flex>
      {data?.body?.total === 0 ? (
        <div>
          <FirstTimeContainer
            title={"Create new payment method."}
            description={"Click on the button below to start adding data."}
            onPress={() => setOpen(true)}
          />
        </div>
      ) : (
        <div className="table-container-tab">
          <DataTable
            isShowNo={false}
            data={data?.body?.data ?? []}
            columns={acceptedReceivingColDefs}
            total={data?.body?.total ?? 0}
            query={query}
            isLoading={isLoading}
            renderHeader={() => (
              <div className="flex flex-row gap-0 md:gap-4 justify-start items-center">
                <CreateButton asBtn onClick={() => setOpen(true)} />
              </div>
            )}
          />
        </div>
      )}
      <CreateMethod open={open} handleClose={() => setOpen(false)} />
      {configData && (
        <MaxAccSetting
          open={maxAccOpen}
          handleClose={() => setMaxAccOpen(false)}
          maxAccount={configData?.body?.data.maxReceivingAccount ?? 0}
        />
      )}
    </div>
  );
};

export default AcceptedReceiving;
