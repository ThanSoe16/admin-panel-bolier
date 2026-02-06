'use client';
import React from 'react';
import TableBaseButton from '@/components/shared/buttons/TableBaseButton';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { RoleData } from '@/features/admins/types';
import { formatDate } from '@/utils/dateTime';
import { CurrencyFormat } from '@/utils/currencyFormat';
import { useUpdateRole } from '@/features/admins/services/mutations';
import StatusSwitch from '@/components/shared/buttons/StatusSwitch';

const Actions = (props: { target: RoleData }) => {
  return (
    <div className="space-x-3">
      <Link href={`/admins/roles/${props?.target?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
      <Link href={`/admins/roles/${props?.target?.id}/update`}>
        <TableBaseButton uiType="edit">Edit</TableBaseButton>
      </Link>
    </div>
  );
};

const AccessSwitch = (props: { target: RoleData }) => {
  const updateRole = useUpdateRole();

  const handleChange = async () => {
    await updateRole.mutateAsync({
      id: props?.target?.id,
      name: props?.target?.name,
      permissions: props?.target?.permissions,
      Status: props?.target?.Status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
    });
  };

  return (
    <StatusSwitch
      value={props?.target?.Status == 'ACTIVE'}
      onChange={handleChange}
      activeLabel="On"
      inactiveLabel="Off"
      activeDesc={`Are you sure you want to change this role as “Active”?. Once changed, you will be able to create new admin with this role.`}
      inactiveDesc={`Are you sure you want to change this role as “Inactive”?. Once you changed, admins with this user role will be able to login but you will not be able to add new admin with this role.`}
    />
  );
};

export const roleColDefs: ColumnDef<RoleData>[] = [
  {
    accessorKey: 'name',
    header: 'Role Name',
    size: 150,
    cell: ({ row }) => <div className="line-clamp-1">{row.original.name}</div>,
  },
  {
    accessorKey: 'userCount',
    header: 'Total User',
    cell: ({ row }) => <span>{CurrencyFormat(row.original.userCount)}</span>,
  },
  {
    accessorKey: 'createdAt',
    size: 150,
    header: 'Created on',
    cell: ({ row }) => <span>{formatDate(row.original.createdAt)}</span>,
  },
  {
    accessorKey: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row }) => <AccessSwitch target={row.original} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 150,
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
