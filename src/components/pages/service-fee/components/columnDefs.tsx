import { ServiceFeeHistoryData } from "@/features/service-fee/types";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";
import { ColumnDef } from "@tanstack/react-table";

export const serviceFeeColumnDefs: ColumnDef<ServiceFeeHistoryData>[] = [
  {
    accessorKey: "from",
    header: "From",
    size: 100,
    cell: ({ row }) => (
      <div>${CurrencyFormat(parseFloat(row.original?.from))}</div>
    ),
  },
  {
    accessorKey: "to",
    header: "To",
    size: 100,
    cell: ({ row }) => (
      <div>${CurrencyFormat(parseFloat(row.original?.to))}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated on",
    size: 200,
    cell: ({ row }) => formatDate(row.original?.updatedAt),
  },
  {
    accessorKey: "UpdatedBy",
    header: "Updated By",
    size: 150,
    cell: ({ row }) => row.original?.updatedBy?.name ?? "-",
  },
];
