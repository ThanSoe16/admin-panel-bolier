import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import Status from "@/components/shared/Status";
import { ServerNotificationDetailsData } from "@/features/notification/server/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const Actions = (props: { target: ServerNotificationDetailsData }) => {
  return (
    <Link href={`/sale-history/server/${props.target.id}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

const columnDefs: ColumnDef<ServerNotificationDetailsData>[] = [
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
  {
    accessorKey: "numberOfBlogs",
    header: "No. of Blogs",
    size: 200,
    cell: ({ row }) =>
      CurrencyFormat(row.original?.MerchantBlog?.numberOfBlogs),
  },
  {
    accessorKey: "fee",
    header: "Fee",
    size: 200,
    cell: ({ row }) => `$${CurrencyFormat(row.original?.total)}/ month`,
  },
];

export const willExpireColumnDefs: ColumnDef<ServerNotificationDetailsData>[] =
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

export const renewColumnDefs: ColumnDef<ServerNotificationDetailsData>[] = [
  ...columnDefs,
  {
    accessorKey: "renewedAt",
    header: "Renewed on",
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
    size: 200,
    cell: ({ row }) => <Actions target={row.original} />,
  },
];

export const expiredColumnDefs: ColumnDef<ServerNotificationDetailsData>[] = [
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
    size: 200,
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
