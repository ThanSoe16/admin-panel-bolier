'use client"';
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { ColumnDef } from '@tanstack/react-table';
import TableBaseButton from '@/components/shared/buttons/TableBaseButton';
import EditModal from './EditModal';
import StatusChangeDialog from '@/components/shared/status-change-dialog';
import { CategoryData } from '@/features/settings/category/types';
import { formatDate } from '@/utils/dateTime';
import { useGetLandingLanguages } from '@/features/landing-languages/services/queries';
import { useToggleCategory } from '@/features/settings/category/services/mutations';
import DetailModal from './DetailModal';

const Actions = (props: { target: CategoryData }) => {
  const { data: landingLanguages, isLoading } = useGetLandingLanguages();

  const { target } = props;
  const [open, setOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);
  return (
    <div className="flex space-x-2">
      {/* <TableBaseButton uiType="details" onClick={() => setDetailOpen(true)}>
        Details
      </TableBaseButton> */}
      <TableBaseButton uiType="edit" onClick={() => setOpen(true)}>
        Edit
      </TableBaseButton>
      {open && (
        <EditModal
          open={open}
          handleClose={() => setOpen(false)}
          target={target}
          languages={landingLanguages?.body?.data || []}
          isLoading={isLoading}
        />
      )}
      {detailOpen && (
        <DetailModal
          open={detailOpen}
          handleClose={() => setDetailOpen(false)}
          target={target}
          languages={landingLanguages?.body?.data || []}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

const StatusChange = (props: { target: CategoryData }) => {
  const { target } = props;
  const [open, setOpen] = React.useState(false);
  const toggleCategory = useToggleCategory();

  const handleChange = () => {
    toggleCategory.mutateAsync(target.id).then((res) => setOpen(false));
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <Switch checked={target.Status === 'ACTIVE'} onCheckedChange={() => setOpen(true)} />
      <p> {target.Status === 'ACTIVE' ? 'On' : 'Off'} </p>
      {open && (
        <StatusChangeDialog
          open={open}
          isActive={target.Status === 'ACTIVE'}
          handleClose={() => setOpen(false)}
          handleChange={handleChange}
          type="category"
        />
      )}
    </div>
  );
};

export const columnDefs: ColumnDef<CategoryData>[] = [
  {
    accessorKey: 'name',
    header: 'Category Name',
    size: 300,
    cell: ({ row }) => (
      <div className="line-clamp-2 ">
        {row.original.TemplateCategoryContent.map((item) => item.name).join('/ ')}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created on',
    size: 200,
    cell: ({ row }) => <span>{formatDate(row.original.createdAt)}</span>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated on',
    size: 200,
    cell: ({ row }) => (
      <span>{row.original.updatedAt ? formatDate(row.original.updatedAt) : '-'}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 150,
    cell: ({ row }) => <StatusChange target={row.original} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <Actions target={row.original} />,
  },
];
