"use client";
import React, { useState } from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import StatusSwitch from "@/components/shared/buttons/StatusSwitch";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import { formatDate } from "@/utils/dateTime";
import { TransactionFeeData } from "@/features/payment-settings/transaction-fee/types";
import { Flex } from "@radix-ui/themes";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { useToggleTransactionFee } from "@/features/payment-settings/transaction-fee/servicex/mutations";
import EditTransactionFee from "./EditTransactionFee";
import Link from "next/link";

const Actions = (props: { target: TransactionFeeData }) => {
  const { target } = props;
  const [editOpenModal, setEditOpenModal] = useState(false);
  return (
    <div className="flex gap-2">
      <Link href={`/payment-settings/blog-service-fee/${target.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
      <TableBaseButton uiType="edit" onClick={() => setEditOpenModal(true)}>
        Edit
      </TableBaseButton>
      {editOpenModal && (
        <EditTransactionFee
          data={target}
          open={editOpenModal}
          handleClose={() => setEditOpenModal(false)}
        />
      )}
    </div>
  );
};

const StatusAction = (props: { target: TransactionFeeData }) => {
  const toggleTransactionFee = useToggleTransactionFee();
  const handleChange = async () => {
    toggleTransactionFee.mutate(props?.target?.id);
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
      />
    </div>
  );
};

export const blogServiceFeeColDefs: ColumnDef<TransactionFeeData>[] = [
  {
    accessorKey: "Status",
    header: "",
    size: 30,
    cell: ({ row }) => <StatusAction target={row.original} />,
  },

  {
    accessorKey: "name",
    header: "Payment Method",
    size: 250,
    cell: ({ row }) => (
      <Flex align={"center"} className="gap-2">
        <ProfileAvatar
          name={row.original.name}
          photo={row.original.File?.url}
        />
        <p className="text-sm">{row.original.name}</p>
      </Flex>
    ),
  },
  {
    accessorKey: "fee",
    header: "Fee Per Transaction (%)",
    size: 250,
    cell: ({ row }) => (
      <div>
        {row.original.trxFeeType == "FIX_AMOUNT" && "$"}{" "}
        {CurrencyFormat(row.original.trxFee)}{" "}
        {row.original.trxFeeType == "PERCENTAGE" && "%"}
      </div>
    ),
  },

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
