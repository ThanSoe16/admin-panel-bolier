"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ExchangeRateData } from "@/features/payment-settings/exchange-rate-service/types";
import { Flex } from "@radix-ui/themes";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import EditCurrency from "./EditCurrency";
import StatusSwitch from "@/components/shared/buttons/StatusSwitch";
import {
  useToggleExchangeRateStatus,
  useUpdateExchangeRate,
} from "@/features/payment-settings/exchange-rate-service/services/mutations";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";

const Actions = (props: { target: ExchangeRateData }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <TableBaseButton uiType="edit" onClick={() => setOpen(true)}>
        Edit
      </TableBaseButton>
      {open && (
        <EditCurrency
          open={open}
          handleClose={() => setOpen(false)}
          data={props.target}
        />
      )}
    </div>
  );
};

const Status = (props: { target: ExchangeRateData }) => {
  const statusChange = useToggleExchangeRateStatus();
  const handleChange = async () => {
    statusChange.mutate(props.target.id);
  };

  return (
    <div>
      <StatusSwitch
        value={props?.target?.Status == "ACTIVE"}
        onChange={handleChange}
        activeLabel="Active"
        inactiveLabel="Inactive"
        activeDesc={`Are you sure you want to change this payment method status as "Active"?.`}
        inactiveDesc={`Are you sure you want to change this payment method status as "Inactive"?.`}
        hideLabel
      />
    </div>
  );
};

export const exchangeRateColDefs: ColumnDef<ExchangeRateData>[] = [
  {
    accessorKey: "status",
    header: "",
    size: 80,
    cell: ({ row }) => <Status target={row.original} />,
  },

  {
    accessorKey: "currencyCode",
    header: "Currency",
    size: 150,
    cell: ({ row }) => (
      <Flex align={"center"} className="gap-2">
        <ProfileAvatar
          name={row.original.BaseCurrency?.countryCode?.charAt(0)}
          photo={row.original?.BaseCurrency?.File?.url}
          className="rounded-lg"
        />
        <div className="space-y-1">
          <p className="text-sm">{row.original.BaseCurrency?.currencyCode}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.BaseCurrency?.iso4217}
          </p>
        </div>
      </Flex>
    ),
  },
  {
    accessorKey: "exchangeRate",
    header: "Exchange Rate",
    size: 200,
    cell: ({ row }) => (
      <div>
        <span className="text-primary font-bold">
          {row.original.BaseCurrency?.currencyCode}{" "}
          {CurrencyFormat(row.original.exchangeRate)}{" "}
        </span>{" "}
        / $
      </div>
    ),
  },
  {
    accessorKey: "exchangeServiceFee",
    header: "Exchange Service Fee",
    size: 200,
    cell: ({ row }) => (
      <div>
        <span className="text-primary font-bold">
          {row.original.BaseCurrency?.currencyCode}{" "}
          {CurrencyFormat(row.original.exchangeServiceFee)}{" "}
        </span>{" "}
        / $
      </div>
    ),
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created on",
  //   size: 200,
  //   cell: ({ row }) => (
  //     <span>
  //       {row.original.createdAt ? formatDate(row.original.createdAt) : "-"}
  //     </span>
  //   ),
  // },
  {
    accessorKey: "updatedAt",
    header: "Updated on",
    size: 200,
    cell: ({ row }) => (
      <span>
        {row.original.updatedAt ? formatDate(row.original.updatedAt) : "-"}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
