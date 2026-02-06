'use client'
import React from "react";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {  Eye } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatDate } from "@/utils/dateTime";
import ImagePreview from "@/components/shared/image-preview";
import { TemplateSaleHistoryResponse } from "@/features/sale-histoy/templates/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import Status from "@/components/shared/Status";

const Actions = (props: {
  target: TemplateSaleHistoryResponse
}) => {

  return (
    <div>
      <Link href={`/sale-history/template-sales/${props?.target?.id}`}>
        <TableBaseButton
          uiType='details'
        >Details</TableBaseButton>
      </Link>

    </div>
  )
}

const Thumbnail = (props: {
  target: TemplateSaleHistoryResponse
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-2 w-fit">
      <div onClick={() => setOpen(true)} className="group relative cursor-pointer">
        <Image src={props?.target?.Template?.LaptopThumb?.url} alt="thumbnail" width={1080} height={1080} className="rounded-md min-w-16 min-h-12 w-16 h-12 object-cover object-center group-hover:opacity-80 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
          <Eye className="h-5 w-5 text-white" />
        </div>
        {open && <ImagePreview imageUrl={props?.target?.Template?.LaptopThumb?.url} open={open} onClose={() => setOpen(false)} />}
      </div>
      <p className="w-full whitespace-normal break-words text-ellipsis line-clamp-2">{props?.target?.Template?.name}</p>
    </div>
  )
}

export const columnDefs: ColumnDef<TemplateSaleHistoryResponse>[] = [
  {
    accessorKey: "template.name",
    header: "Template Name",
    size: 250,
    cell: ({ row }) => <Thumbnail target ={row?.original} />
  },
  {
    accessorKey: "template.id",
    header: "Template ID",
    cell: ({ row }) => <p>{row?.original?.Template?.templateCode}</p>
  },
  {
    accessorKey: "user.username",
    header: "Username",
    cell: ({ row }) => <p>{row?.original?.OneSiteUser?.username}</p>
  },
  {
    accessorKey: "fee.total",
    header: "Price",
    cell: ({ row }) => <p>${CurrencyFormat(row?.original?.price)}</p>
  },
  {
    accessorKey: "createdAt",
    size: 150,
    header: "Purchased Date",
    cell: ({ row }) => <p>{formatDate(row?.original?.createdAt)}</p>
  },
  {
    accessorKey: "status",
    size: 150,
    header: "Status",
    cell: ({ row }) => <Status showGreenDot={row?.original?.OneSiteUserOrder[0]?.PaymentStatus === "SUCCESSFUL"} status={row?.original?.OneSiteUserOrder[0]?.PaymentStatus?.toLocaleLowerCase()??'Failed'} />
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />
  }

]