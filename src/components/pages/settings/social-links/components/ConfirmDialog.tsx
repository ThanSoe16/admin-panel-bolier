'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ConfirmStatusDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  newStatus: boolean;
}

export const ConfirmStatusDialog: React.FC<ConfirmStatusDialogProps> = ({
  open,
  onClose,
  onConfirm,
  newStatus,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <div className="w-full flex items-center justify-between">
            <DialogTitle className="font-bold text-lg md:text-[24px] leading-[26px] lg:leading-[36px]">
              Change to &quot;{newStatus ? 'On' : 'Off'}&quot;?
            </DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="normal-text text-default-secondary">
          Are you sure you want to turn {newStatus ? 'on' : 'off'} this social link? It will no
          longer be visible to users.
        </DialogDescription>
        <DialogFooter className="w-full flex items-center">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            className="flex-1 h-12 text-text-primary"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant={newStatus ? 'success' : 'destructive'}
            className={cn(!newStatus && 'text-white', 'flex-1 h-12')}
            onClick={onConfirm}
          >
            <Image
              src={newStatus ? '/components/on.svg' : '/components/off.svg'}
              alt={newStatus ? 'On' : 'Off'}
              width={20}
              height={20}
            />
            <span>{newStatus ? 'On' : 'Off'}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
