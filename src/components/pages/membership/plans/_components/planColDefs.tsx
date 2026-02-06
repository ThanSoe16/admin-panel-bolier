"use client";
import React, { useState } from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import StatusSwitch from "@/components/shared/buttons/StatusSwitch";
import { formatDate } from "@/utils/dateTime";
import { MembershipPlanData } from "@/features/membership/plans/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import UpdateMembership from "./UpdateMembership";
import { useToggleMembershipPlanStatus } from "@/features/membership/plans/services/mutations";

const Actions = (props: { target: MembershipPlanData }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <TableBaseButton
        uiType="edit"
        onClick={() => setOpen(true)}
        disabled={props.target.Status == "INACTIVE"}
      >
        Edit
      </TableBaseButton>
      {open && (
        <UpdateMembership
          data={props.target}
          open={open}
          handleClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

const Status = (props: { target: MembershipPlanData }) => {
  const toggleStatus = useToggleMembershipPlanStatus();
  const handleChange = async () => {
    toggleStatus.mutateAsync(props.target.id);
  };

  return (
    <div>
      <StatusSwitch
        value={props?.target?.Status == "ACTIVE"}
        onChange={handleChange}
        activeLabel="Active"
        inactiveLabel="Inactive"
        activeDesc={`Are you sure you want to change this membership plan status as "Active"?.`}
        inactiveDesc={`Are you sure you want to change this membership plan status as "Inactive"?.`}
        hideLabel
      />
    </div>
  );
};

export const planColDefs: ColumnDef<MembershipPlanData>[] = [
  {
    accessorKey: "status",
    header: "",
    size: 30,
    cell: ({ row }) => <Status target={row.original} />,
  },
  {
    accessorKey: "duration",
    header: "Plan Duration",
    size: 250,
    cell: ({ row }) => (
      <div>
        <p className="capitalize">
          {CurrencyFormat(row.original.amount)}{" "}
          {row.original.DurationType.toLowerCase()}
          {row.original.amount > 1 && <span className="lowercase">s</span>}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Created on",
    size: 200,
    cell: ({ row }) => (
      <span>
        {row.original.createdAt ? formatDate(row.original.createdAt) : "-"}
      </span>
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
