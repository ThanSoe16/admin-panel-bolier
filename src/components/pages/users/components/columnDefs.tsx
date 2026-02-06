"use client";
import React from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { UserData } from "@/features/users/types";
import Link from "next/link";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

const Actions = (props: { target: UserData }) => {
  return (
    <div>
      <Link href={`/users/all/${props?.target?.id}?tab=domains`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    </div>
  );
};

export const columnDefs: ColumnDef<UserData>[] = [
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    size: 150,
    header: "Joined on",
    cell: ({ row }) => (
      <span>
        {dayjs(row?.original?.createdAt).format("DD MMM YYYY, HH:mm")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    size: 150,
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-0">
        <Dot
          className={cn(
            "-ml-4",
            row?.original?.status === "ACTIVE"
              ? "text-green-500"
              : "text-red-500"
          )}
          size={40}
        />
        <p> {row?.original?.status} </p>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
