"use client";
import React from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ContactUsFormsType } from "@/features/contact-us-forms/types";
import { ColumnDef } from "@tanstack/react-table";
import DetailsDialog from "./DetailsDialog";
import dayjs from "dayjs";

const Actions = (props: { target: ContactUsFormsType }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <TableBaseButton
        onClick={() => {
          setOpen(true);
        }}
        uiType="details"
      >
        Details
      </TableBaseButton>
      {open && (
        <DetailsDialog
          open={open}
          handleClose={() => setOpen(false)}
          data={props?.target}
        />
      )}
    </div>
  );
};

export const columnDefs: ColumnDef<ContactUsFormsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "message",
    header: "Message",
    size: 200,
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-[300px]">
        {row.getValue("message")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    size: 150,
    header: "Contacted on",
    cell: ({ row }) => (
      <span>
        {dayjs(row?.original?.createdAt).format("DD MMM YYYY, HH:mm")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
