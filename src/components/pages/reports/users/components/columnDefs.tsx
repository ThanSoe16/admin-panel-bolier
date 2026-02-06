import { ColumnDef } from "@tanstack/react-table";
import { UserReportListData } from "@/features/report/users/types";
import Status from "@/components/shared/Status";
import { toSentenceCase } from "@/utils/toSentenceCase";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import {formatMonth, formatYear } from "@/utils/dateTime";

export const todayNewUsersColumnDefs: ColumnDef<UserReportListData>[] = [
  {
    accessorKey: "generatedAccountId",
    header: "User ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Status
      showGreenDot={row?.original?.status === "ACTIVE"}
      status={toSentenceCase(row?.original?.status === "ACTIVE" ? "Verified" : "Unverified")}
    />
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => <Link href={`/users/${row?.original?.id}`}>
      <TableBaseButton uiType="details">Details</TableBaseButton>
    </Link>
  }
]


export const monthlyNewUsersColumnDefs: ColumnDef<UserReportListData>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <p className="text-primary font-semibold">{formatMonth(row?.original?.date)}</p>
  },
  {
    accessorKey: "count",
    header: "New Users",
    cell: ({ row }) => <p className="">{row?.original?.count}</p>
  }
]

export const yearlyNewUsersColumnDefs: ColumnDef<UserReportListData>[] = [
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => <p className="text-primary font-semibold">{formatYear(row?.original?.month)}</p>
  },
  {
    accessorKey: "count",
    header: "New Users",
    cell: ({ row }) => <p className="">{row?.original?.count}</p>
  }
]     

