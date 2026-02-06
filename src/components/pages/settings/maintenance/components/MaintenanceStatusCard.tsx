'use client';
import React from 'react';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { formatDate } from '@/utils/dateTime';
import StatusChangeDialog from '@/components/shared/dialog/status-change-dialog';

interface MaintenanceStatusCardProps {
  isActive: boolean;
  lastMaintainedAt?: string;
  onToggle: () => void;
}

export const MaintenanceStatusCard = ({
  isActive,
  lastMaintainedAt,
  onToggle,
}: MaintenanceStatusCardProps) => {
  const [open, setOpen] = React.useState(false);
  const title = isActive ? 'Change to “Maintenance Off”?' : 'Change to “Maintenance On”?';
  const description = isActive
    ? 'Are you sure you want to change the maintenance mode as “Off”? Once you turn it off, all services in the system will back to work as usual.'
    : 'Are you sure you want to change the maintenance mode as “On”? Once you turn it on, all users will not be able to login, use or manage their accounts as well as access One Site Services.';
  return (
    <>
      {!isActive ? (
        <div className="flex w-full flex-col items-start md:flex-row justify-between md:items-center gap-2 py-4 lg:py-6">
          <div className="flex flex-row items-center space-x-2">
            <Switch checked={isActive} onCheckedChange={() => setOpen((p) => !p)} />
            <p className="font-semibold"> Maintenance Off </p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-default-secondary"> Last Maintained on: </p>
            <p className="text-sm">{lastMaintainedAt ? formatDate(lastMaintainedAt) : 'N/A'}</p>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl bg-error-secondary p-4 lg:p-6 relative flex flex-col md:flex-row items-start md:items-start justify-between gap-2">
          <Image
            src={'/settings/maintain-left.svg'}
            width={56}
            height={56}
            alt="icon"
            className="rounded-full w-14 h-14"
          />
          <div className="flex-1 flex flex-col items-start justify-center gap-1 lg:pr-[120px]">
            <p className="text-error font-bold text-lg">System is undergoing maintenance!</p>
            <p className="w-full">
              Users will not be able to login, use or manage their accounts until the system is back
              to online.
            </p>

            <div className="flex flex-row items-center gap-2 justify-start text-sm">
              <p className="text-default-secondary">Started on:</p>
              <p className="text-error">
                {lastMaintainedAt ? formatDate(lastMaintainedAt) : 'N/A'}
              </p>
            </div>

            <div className="flex flex-row items-center space-x-2 mt-6 mb-2">
              <Switch checked={isActive} onCheckedChange={() => setOpen((p) => !p)} />
              <p className="font-semibold">Maintenance On</p>
            </div>
          </div>

          <div className="absolute top-1 right-0">
            <Image
              src={'/settings/maintain-right.svg'}
              width={155}
              height={180}
              alt="icon"
              className="w-[150px] h-[175px] object-cover hidden lg:block"
            />
          </div>
        </div>
      )}
      {open && (
        <StatusChangeDialog
          open={open}
          isActive={isActive}
          handleClose={() => setOpen(false)}
          title={title}
          handleChange={() => {
            setOpen(false);
            onToggle();
          }}
          description={description}
        />
      )}
    </>
  );
};
