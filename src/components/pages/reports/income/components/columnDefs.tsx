import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { IncomeResultData } from "@/features/report/income/types";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { usePagination } from "@/features/base/hooks/usePagination";
import { getFeeType } from "@/utils/getFeeTypeName";

const Actions = (props: { target: IncomeResultData }) => {
  const { tab, date } = usePagination();
  return (
    <Link
      href={
        tab == "daily"
          ? `/reports/income/${props.target.feeType.toLowerCase()}/${tab}?date=${date}`
          : `/reports/income/${props.target.feeType.toLowerCase()}?tab=${tab}&date=${date}`
      }
    >
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  );
};

export const columnDefs: ColumnDef<IncomeResultData>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <p className="capitalize">{getFeeType(row.original.feeType)}</p>
    ),
  },
  {
    accessorKey: "amount",
    header: "Total",
    cell: ({ row }) => <p>${CurrencyFormat(row.original.total)}</p>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions target={row?.original} />,
  },
];
