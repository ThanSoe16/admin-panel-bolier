"use client";
import React from "react";
import { NotiSettingData } from "@/features/notification/types";
import { toSentenceCase } from "@/utils/toSentenceCase";
import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import StatusChangeDialog from "@/components/shared/status-change-dialog";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import EditModal from "./EditModal";
import { formatDate } from "@/utils/dateTime";
import { usePathname } from "next/navigation";
import { useToggleMaintainNotificationSettings } from "@/features/notification/maintain/services/mutations";
import { useToggleServerNotificationSettings } from "@/features/notification/server/services/mutations";
import { toast } from "sonner";
import { useToggleHostingNotificationSettings } from "@/features/notification/hosting/services/mutations";

const StatusChange = (props: { target: NotiSettingData }) => {
  const { target } = props;
  const [open, setOpen] = React.useState(false);
  const {
    mutateAsync: toggleMaintainNotiSettings,
    isPending: isMaintainPending,
  } = useToggleMaintainNotificationSettings();
  const { mutateAsync: toggleServerNotiSettings, isPending: isServerPending } =
    useToggleServerNotificationSettings();
  const {
    mutateAsync: toggleHostingNotiSettings,
    isPending: isHostingPending,
  } = useToggleHostingNotificationSettings();
  const pathname = usePathname();
  const type = pathname.includes("maintain")
    ? "maintain"
    : pathname.includes("hosting")
    ? "hosting"
    : "server";

  const toggleHandler =
    type === "maintain"
      ? toggleMaintainNotiSettings
      : type === "hosting"
      ? toggleHostingNotiSettings
      : toggleServerNotiSettings;

  const handleToggle = async () => {
    try {
      const response = await toggleHandler(target.id);

      if (response?.meta?.success) {
        toast.success(response?.meta?.message);
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.meta?.message ?? "Something went wrong"
      );
    }
  };

  const description =
    target.Status === "ACTIVE"
      ? "Are you sure you want to change this status as “Inactive”?."
      : "Are you sure you want to change this status as “Active”?. ";

  return (
    <div className="flex flex-row gap-2 items-center">
      <Switch
        checked={target.Status === "ACTIVE"}
        onCheckedChange={() => setOpen(true)}
      />
      <p> {target.Status === "ACTIVE" ? "On" : "Off"} </p>
      {open && (
        <StatusChangeDialog
          open={open}
          isActive={target.Status === "ACTIVE"}
          handleClose={() => setOpen(false)}
          handleChange={handleToggle}
          description={description}
          loading={isMaintainPending || isServerPending || isHostingPending}
        />
      )}
    </div>
  );
};

const Actions = (props: { target: NotiSettingData }) => {
  const pathname = usePathname();
  const { target } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <TableBaseButton uiType="edit" onClick={() => setOpen(true)}>
        Edit
      </TableBaseButton>
      {open && (
        <EditModal
          open={open}
          handleClose={() => setOpen(false)}
          data={{
            time: target.time,
            unit: target.Unit,
          }}
          type={
            pathname.includes("maintain")
              ? "maintain"
              : pathname.includes("hosting")
              ? "hosting"
              : "server"
          }
          id={target.id}
        />
      )}
    </div>
  );
};

export const columnDefs: ColumnDef<NotiSettingData>[] = [
  {
    accessorKey: "sendTime",
    header: "Email Send Time",
    size: 150,
    cell: ({ row }) => (
      <p>
        {" "}
        {row.original?.Schedule === "FIRST"
          ? "1st"
          : row.original?.Schedule === "SECOND"
          ? "2nd"
          : "3rd"}{" "}
      </p>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) =>
      `${row.original.time} ${toSentenceCase(row.original.Unit)} before`,
  },
  {
    accessorKey: "createdAt",
    header: "Created/Updated On",
    size: 200,
    cell: ({ row }) => (
      <div className="flex flex-col justify- items-start">
        <p> {formatDate(row?.original?.createdAt)} </p>
        <p> {formatDate(row?.original?.updatedAt)} </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusChange target={row.original} />,
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
