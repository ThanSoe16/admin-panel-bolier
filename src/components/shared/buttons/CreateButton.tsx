'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CirclePlus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { matchRouteToStoredPermission } from '@/utils/routeMatcher';
import { routePermissionMap } from '@/data/route-permissions';

//just ui, have to implement permission logic

interface CreateButtonProps {
  basePath?: string;
  asBtn?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  basePath,
  asBtn = false,
  onClick = () => {},
  isLoading,
  disabled,
}) => {
  const pathname = usePathname();
  const match = matchRouteToStoredPermission(pathname, routePermissionMap);

  if (!match?.includes('CREATE')) return null;

  const button = (
    <Button
      onClick={asBtn ? onClick : undefined}
      className={cn(
        'text-sm !min-w-8 w-8 h-8 md:!min-w-[130px] md:h-11',
        asBtn && 'fixed bottom-6 right-6 z-50 md:static ',
      )}
      size={'lg'}
      loading={isLoading}
      disabled={disabled}
    >
      <Plus className="w-4 h-4 md:hidden" />
      <CirclePlus className="w-4 h-4 hidden md:block" />
      <span className="hidden md:inline">Create New</span>
    </Button>
  );

  return asBtn ? (
    <div>{button}</div>
  ) : (
    <Link href={`${basePath}/create`} className="fixed bottom-4 right-6 z-50 md:static">
      {button}
    </Link>
  );
};

export default CreateButton;
