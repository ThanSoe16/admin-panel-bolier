'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import React from 'react';

interface StatusChangeDialogProps {
  open: boolean;
  isActive: boolean;
  handleClose: () => void;
  handleChange: () => void;
  type?: string;
  loading?: boolean;
  description?: string;
  title?: string;
  onName?: string;
  offName?: string;
}

const StatusChangeDialog: React.FC<StatusChangeDialogProps> = ({
  open,
  isActive,
  handleClose,
  handleChange,
  type = '',
  loading = false,
  description,
  title,
  onName = 'On',
  offName = 'Off',
}) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>Change to {isActive ? '"' + offName + '"' : '"' + onName + '"'}</DialogTitle>
        <p className="text-default-secondary">
          {description
            ? description
            : isActive
              ? `Are you sure you want to set this ${type} to 'Off'? Once turned off, this ${type} will no longer be visible to users.`
              : `Are you sure you want to set this ${type} to 'On'?  Once turned on, it will become visible to users.`}
        </p>
        <div className="flex flex-row gap-4 justify-end items-center mt-4">
          <Button
            variant="outline"
            className="text-text-primary"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            className={cn(
              '',
              isActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white',
            )}
            onClick={handleChange}
          >
            {isActive ? <ToggleLeft /> : <ToggleRight />}
            <p> {isActive ? offName : onName} </p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeDialog;
