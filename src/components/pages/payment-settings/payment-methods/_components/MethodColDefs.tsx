"use client";
import React, { useState } from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentMethodData } from "@/features/payment-settings/payment-methods/types";
import StatusSwitch from "@/components/shared/buttons/StatusSwitch";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import { formatDate } from "@/utils/dateTime";
import { Flex } from "@radix-ui/themes";
import EditMethod from "./EditMethod";
import { useTogglePaymentMethodStatus } from "@/features/payment-settings/payment-methods/services/mutation";

const Actions = (props: { target: PaymentMethodData }) => {
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

const Status = (props: { target: PaymentMethodData }) => {
  const toggleStatus = useTogglePaymentMethodStatus();
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
        activeDesc={`Are you sure you want to change this payment method status as "Active"?.`}
        inactiveDesc={`Are you sure you want to change this payment method status as "Inactive"?.`}
        hideLabel
      />
    </div>
  );
};

export const methodColumnDefs: ColumnDef<PaymentMethodData>[] = [
  {
    accessorKey: "Status",
    header: "",
    size: 30,
    cell: ({ row }) => <Status target={row.original} />,
  },
  {
    accessorKey: "name",
    header: "Payment Method",
    size: 250,
    cell: ({ row }) => (
      <Flex align={"center"} className="gap-2">
        <ProfileAvatar
          photo={row.original?.File?.url ?? ""}
          name={row.original.name?.charAt(0)}
        />
        <p>{row.original?.name ?? ""}</p>
      </Flex>
    ),
  },
  {
    accessorKey: "PaymentMethodChannel",
    header: "Payment Channel",
    size: 200,
    cell: ({ row }) => (
      <div className="uppercase">
        {row.original.PaymentMethodChannels?.map((item) =>
          item.replaceAll("_", " ")
        ).join(", ") ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created on",
    size: 150,
    cell: ({ row }) => (
      <span>
        {row.original.createdAt ? formatDate(row.original.createdAt) : "-"}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated on",
    size: 150,
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
