'use client';
import React from 'react';
import Link from 'next/link';
import { type ButtonProps } from '@/components/ui/button';
import TableBaseButton from './TableBaseButton';
import { usePathname } from 'next/navigation';
import { matchRouteToStoredPermission } from '@/utils/routeMatcher';
import { routePermissionMap } from '@/data/route-permissions';

//just ui, have to implement permission logic

interface EditButtonProps extends ButtonProps {
  basePath?: string;
  asBtn?: boolean;
  onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ basePath, asBtn = false, onClick = () => {} }) => {
  const pathname = usePathname();
  const match = matchRouteToStoredPermission(pathname, routePermissionMap);
  if (!match.includes('EDIT')) return null;

  const button = (
    <TableBaseButton onClick={asBtn ? onClick : undefined} uiType="edit">
      {' '}
      Edit
    </TableBaseButton>
  );

  return asBtn ? (
    <div>{button}</div>
  ) : (
    <Link href={`${basePath}/update`} className="">
      {button}
    </Link>
  );
};

export default EditButton;
