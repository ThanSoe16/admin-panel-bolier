'use client';
import React from 'react';
import TableBaseButton from '@/components/shared/buttons/table-base-button';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { AdminData } from '@/features/admins/types';
import { formatDate } from '@/utils/dateTime';
import StatusSwitch from '@/components/shared/buttons/status-switch';
import { useUpdateAdmin } from '@/features/admins/services/mutations';
import { useGetMe } from '@/features/auth/service/queries';

const Actions = (props: { target: AdminData }) => {
  return (
    <div className="space-x-3">
      <Link href={`/admins/list/${props?.target?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
      <Link href={`/admins/list/${props?.target?.id}/update`}>
        <TableBaseButton uiType="edit">Edit</TableBaseButton>
      </Link>
    </div>
  );
};

const AccessSwitch = (props: { target: AdminData }) => {
  const updateRole = useUpdateAdmin();
  const profile = useGetMe();

  const handleChange = async () => {
    await updateRole.mutateAsync({
      id: props?.target?.id,
      name: props?.target?.name,
      loginId: props?.target?.loginId,
      phone: props?.target?.phone,
      adminRoleId: props?.target?.AdminRole.id,
      avatarId: props?.target?.Avatar?.id,
      AdminAccountStatus: props?.target?.AdminAccountStatus == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      profileUrl: props?.target?.Avatar?.url,
    });
  };

  return (
    <StatusSwitch
      value={props?.target?.AdminAccountStatus == 'ACTIVE'}
      onChange={handleChange}
      disabled={profile?.data?.body?.data?.id == props.target.id}
    />
  );
};

const AdminName = (props: { target: AdminData }) => {
  const profile = useGetMe();

  return (
    <div>
      {props.target.name}{' '}
      {profile?.data?.body?.data?.id == props.target.id && (
        <span className="text-xs text-green-500">(Yourself)</span>
      )}
    </div>
  );
};

export const adminColDefs: ColumnDef<AdminData>[] = [
  {
    accessorKey: 'name',
    header: 'Admin Name',
    size: 200,
    cell: ({ row }) => <AdminName target={row.original} />,
  },
  {
    accessorKey: 'phone',
    header: 'Phone No.',
    size: 100,
  },
  {
    accessorKey: 'loginId',
    header: 'Login ID',
    size: 100,
  },
  {
    accessorKey: 'AdminRole.name',
    header: 'Role',
    size: 200,
    cell: ({ row }) => <div className="line-clamp-1">{row.original.AdminRole.name}</div>,
  },
  {
    accessorKey: 'AdminAccountStatus',
    header: 'Status',
    size: 100,
    cell: ({ row }) => <AccessSwitch target={row.original} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created on/ Updated on',
    size: 150,
    cell: ({ row }) => <span>{formatDate(row.original.createdAt)}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 150,
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
