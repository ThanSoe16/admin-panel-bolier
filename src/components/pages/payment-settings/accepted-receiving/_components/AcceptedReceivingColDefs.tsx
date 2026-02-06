"use client";
import React, { useState } from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import StatusSwitch from "@/components/shared/buttons/StatusSwitch";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import { formatDate } from "@/utils/dateTime";
import { AcceptedReceivingPaymentData } from "@/features/payment-settings/accepted-receiving/types";
import { Flex } from "@radix-ui/themes";
import EditMethod from "./EditMethod";
import { useToggleAcceptedReceivingPayment } from "@/features/payment-settings/accepted-receiving/services/mutations";

const Actions = (props: { target: AcceptedReceivingPaymentData }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div>
      <TableBaseButton uiType="edit" onClick={() => setEditOpen(true)}>
        Edit
      </TableBaseButton>
      {editOpen && (
        <EditMethod
          data={props.target}
          handleClose={() => setEditOpen(false)}
          open={editOpen}
        />
      )}
    </div>
  );
};

const StatusAction = (props: { target: AcceptedReceivingPaymentData }) => {
  const toggleAcceptedReceivingStatus = useToggleAcceptedReceivingPayment();
  const handleChange = async () => {
    toggleAcceptedReceivingStatus.mutate(props.target.id);
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

export const acceptedReceivingColDefs: ColumnDef<AcceptedReceivingPaymentData>[] =
  [
    {
      accessorKey: "Status",
      header: "",
      size: 30,
      cell: ({ row }) => <StatusAction target={row.original} />,
    },

    {
      accessorKey: "name",
      header: "Payment Method",
      size: 200,
      cell: ({ row }) => (
        <Flex align="center" gap="2">
          <ProfileAvatar
            name={row.original.name}
            photo={row.original.File?.url}
          />
          <div>{row.original.name}</div>
        </Flex>
      ),
    },
    {
      accessorKey: "ReceivingAccType",
      header: "Account Type",
      size: 200,
      cell: ({ row }) => <div>{row.original.ReceivingAccType}</div>,
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
