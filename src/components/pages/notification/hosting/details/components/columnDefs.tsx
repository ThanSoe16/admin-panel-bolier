import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import Status from "@/components/shared/Status";
import { HostingNotificationDetailsData } from "@/features/notification/hosting/types";
import { formatDate } from "@/utils/dateTime";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const Actions = (props: {
  target: HostingNotificationDetailsData
}) => {
  return (
    <Link href={`/sale-history/hosting/${props.target.id}`} >
      <TableBaseButton
        uiType='details'
      >Details</TableBaseButton>
    </Link>
  )
}


const columnDefs: ColumnDef<HostingNotificationDetailsData>[] = [
  {
    accessorKey: "userName",
    header: "Username",
    cell: ({ row }) => row.original?.MerchantBlog?.OneSiteUser?.username,
  },
  {
    accessorKey: "templateName",
    header: "Template Name",
    cell: ({ row }) => row.original?.MerchantBlog?.OneSiteUserPurchasedTemplate?.Template?.name,
  },
  {
    accessorKey: "blogName",
    header: "Blog Name",
    cell: ({ row }) => row.original?.MerchantBlog?.name,
  },
]

export const willExpireColumnDefs: ColumnDef<HostingNotificationDetailsData>[] = [
  ...columnDefs,
  {
    accessorKey: "expiredAt",
    header: "Expire On",
    cell: ({ row }) => formatDate(row.original.dueDate),
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
]

export const renewColumnDefs: ColumnDef<HostingNotificationDetailsData>[] = [
  ...columnDefs,
  {
    accessorKey: "renewedAt",
    header: "Renewal Date",
    cell: ({ row }) => formatDate(row.original.dueDate),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => <Status 
      showGreenDot={true}
      status={"Verified"}
    />
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
]

export const expiredColumnDefs: ColumnDef<HostingNotificationDetailsData>[] = [
  ...columnDefs,
  {
    accessorKey: "",
    header: "Purchased On",
    cell: ({ row }) => formatDate(row.original.paidDate),
  },
  {
    accessorKey: "paymentStatus",
    header: "Domain Usage Status",
    cell: ({ row }) => <Status 
      showGreenDot={false}
      status={'Expired'}
    />
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  }
]