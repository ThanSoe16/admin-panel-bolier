"use client";
import React, { useState } from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import StatusSwitch from "@/components/shared/buttons/StatusSwitch";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import { formatDate } from "@/utils/dateTime";
import { PaymentAccountData } from "@/features/payment-settings/payment-accounts/types";
import { Flex } from "@radix-ui/themes";
import { useTogglePaymentAccountStatus } from "@/features/payment-settings/payment-accounts/services/mutation";
import EditAccount from "./EditAccount";

const Actions = (props: { target: PaymentAccountData }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div>
      <TableBaseButton uiType="edit" onClick={() => setEditOpen(true)}>
        Edit
      </TableBaseButton>
      {editOpen && (
        <EditAccount
          data={props.target}
          open={editOpen}
          handleClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
};

const Status = (props: { target: PaymentAccountData }) => {
  const toggleStatus = useTogglePaymentAccountStatus();
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
        activeDesc={`Are you sure you want to change this payment account status as "Active"?.`}
        inactiveDesc={`Are you sure you want to change this payment account status as "Inactive"?.`}
        hideLabel
      />
    </div>
  );
};

export const accountColumnDefs: ColumnDef<PaymentAccountData>[] = [
  {
    accessorKey: "status",
    header: "",
    size: 30,
    cell: ({ row }) => <Status target={row.original} />,
  },
  {
    accessorKey: "name",
    header: "Payment Method",
    size: 200,
    cell: ({ row }) => (
      <Flex align={"center"} className="gap-2">
        <ProfileAvatar
          name={row.original.MembershipPaymentMethod?.name}
          photo={row.original.MembershipPaymentMethod?.File?.url}
        />
        <p>{row.original.MembershipPaymentMethod?.name}</p>
      </Flex>
    ),
  },
  {
    accessorKey: "name",
    header: "Account Info",
    size: 200,
    cell: ({ row }) => (
      <div>
        <p>{row.original.name}</p>
        <p className="text-xs text-gray-500">{row.original.number}</p>
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
