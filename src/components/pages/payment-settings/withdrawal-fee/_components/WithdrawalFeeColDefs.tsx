"use client";
import React, { useState } from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import { WithdrawFeeData } from "@/features/payment-settings/transaction-fee/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import EditWithdrawalFee from "./EditWithdrawalFee";
import Link from "next/link";

const Actions = (props: { target: WithdrawFeeData }) => {
  const { target } = props;
  const [editOpenModal, setEditOpenModal] = useState(false);
  return (
    <div className="flex gap-2">
      <Link href={`/payment-settings/withdrawal-fee/${target.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
      <TableBaseButton uiType="edit" onClick={() => setEditOpenModal(true)}>
        Edit
      </TableBaseButton>
      {editOpenModal && (
        <EditWithdrawalFee
          data={target}
          open={editOpenModal}
          handleClose={() => setEditOpenModal(false)}
        />
      )}
    </div>
  );
};

export const withdrawalFeeColDefs: ColumnDef<WithdrawFeeData>[] = [
  {
    accessorKey: "amount",
    header: "Withdrawal Fee",
    size: 250,
    cell: ({ row }) => (
      <span>
        <span className="text-primary font-semibold">
          {row.original.feeType == "FIX_AMOUNT" && "MMK"}
          {CurrencyFormat(row.original.amount)}
        </span>
        {row.original.feeType == "PERCENTAGE" && "%"}{" "}
        {row.original.feeType == "FIX_AMOUNT" && `/ $`}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
