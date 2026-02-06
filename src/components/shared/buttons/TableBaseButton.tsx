'use client';
import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { matchRouteToStoredPermission } from '@/utils/routeMatcher';
import { routePermissionMap } from '@/data/route-permissions';

interface TableBaseButtonProps extends ButtonProps {
  uiType: 'edit' | 'delete' | 'details' | 'block' | 'unblock';
}

const TableBaseButton: React.FC<TableBaseButtonProps> = ({ uiType, children, ...props }) => {
  const pathname = usePathname();
  const match = matchRouteToStoredPermission(pathname, routePermissionMap);
  const needsPermission = uiType === 'edit' || uiType === 'delete';
  if (needsPermission && !match?.includes(uiType.toUpperCase())) return null;
  const getTextColor = (uiType: TableBaseButtonProps['uiType']) => {
    switch (uiType) {
      case 'edit':
        return '#319300';
      case 'delete':
        return 'text-red-500';
      case 'details':
        return '#275EE2';
      case 'block':
        return '#FF1A1A';
      case 'unblock':
        return '#8C7813';
      default:
        return '#319300';
    }
  };

  const getBgColor = (uiType: TableBaseButtonProps['uiType']) => {
    switch (uiType) {
      case 'edit':
        return '#ECFAE6';
      case 'delete':
        return '#F0F6FE';
      case 'details':
        return '#F0F6FE';
      case 'block':
        return '#FFE8E8';
      case 'unblock':
        return '#FFFBE9';
      default:
        return '#ECFAE6';
    }
  };

  return (
    <Button
      className="px-1 rounded-[8px] h-6"
      style={{
        color: getTextColor(uiType),
        backgroundColor: getBgColor(uiType),
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default TableBaseButton;
