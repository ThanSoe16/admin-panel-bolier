import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import Status from "@/components/shared/Status";
import { BlogTemplateSaleHistoryData } from "@/features/blog-templates/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";
import { toSentenceCase } from "@/utils/toSentenceCase";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columnDefs: ColumnDef<BlogTemplateSaleHistoryData>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => row?.original.OneSiteUser?.username,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) =>
      `$${CurrencyFormat(row.original.OneSiteUserOrder?.[0]?.price)}`,
  },
  {
    accessorKey: "createdAt",
    header: "Purchased Date",
    size: 150,
    cell: ({ row }) => formatDate(row.original.OneSiteUserOrder[0]?.createdAt),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Status
        showGreenDot={
          row.original.OneSiteUserOrder?.[0]?.PaymentStatus === "SUCCESSFUL"
        }
        status={toSentenceCase(
          row.original.OneSiteUserOrder?.[0]?.PaymentStatus
        )}
      />
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/sale-history/template-sales/${row.original.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
    ),
  },
];
