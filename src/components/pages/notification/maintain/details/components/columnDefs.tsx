import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import Status from "@/components/shared/Status";
import { MaintainNotificationDetailsData } from "@/features/notification/maintain/types";
import { formatDate } from "@/utils/dateTime";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const Actions = (props: { target: MaintainNotificationDetailsData }) => {
  return (
    <Link href={`/sale-history/maintain/${props.target.id}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const columnDefs: ColumnDef<MaintainNotificationDetailsData>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
    size: 200,
    cell: ({ row }) =>
      row.original?.MerchantBlog?.OneSiteUser?.generatedAccountId,
  },
  {
    accessorKey: "userName",
    header: "Username",
    size: 200,
    cell: ({ row }) => row.original?.MerchantBlog?.OneSiteUser?.username,
  },
  {
    accessorKey: "templateName",
    header: "Template Name",
    size: 200,
    cell: ({ row }) =>
      row.original?.MerchantBlog?.OneSiteUserPurchasedTemplate?.Template?.name,
  },
  {
    accessorKey: "blogName",
    header: "Blog Name",
    size: 200,
    cell: ({ row }) => row.original?.MerchantBlog?.name,
  },
];

export const willExpireColumnDefs: ColumnDef<MaintainNotificationDetailsData>[] =
  [
    ...columnDefs,
    {
      accessorKey: "expiredAt",
      header: "Expire On",
      size: 200,
      cell: ({ row }) => formatDate(row.original.dueDate),
    },
    {
      accessorKey: "",
      header: "Actions",
      size: 200,
      cell: ({ row }) => <Actions target={row.original} />,
    },
  ];

export const renewColumnDefs: ColumnDef<MaintainNotificationDetailsData>[] = [
  ...columnDefs,
  {
    accessorKey: "renewedAt",
    header: "Renewal Date",
    size: 200,
    cell: ({ row }) => formatDate(row.original.dueDate),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    size: 200,
    cell: ({ row }) => <Status showGreenDot={true} status={"Verified"} />,
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];

export const expiredColumnDefs: ColumnDef<MaintainNotificationDetailsData>[] = [
  ...columnDefs,
  {
    accessorKey: "",
    header: "Purchased On",
    size: 200,
    cell: ({ row }) => formatDate(row.original.paidDate),
  },
  {
    accessorKey: "paymentStatus",
    header: "Domain Usage Status",
    size: 200,
    cell: ({ row }) => <Status showGreenDot={false} status={"Expired"} />,
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
