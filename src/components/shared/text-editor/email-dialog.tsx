'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface EmailDialogProps {
  open: boolean;
  handleClose: () => void;
  handleOkay: (email: string) => void;
}

const EmailDialog: React.FC<EmailDialogProps> = ({ open, handleClose, handleOkay }) => {
  const [email, setEmail] = useState('');

  const handleClick = () => {
    try {
      if (!email) {
        toast.error('Please enter email');
        return;
      }

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValidEmail) {
        toast.error('Invalid Email');
        return;
      }

      handleOkay(email);
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Email</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-4">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoFocus={false}
          />
          <div className="w-full flex flex-row justify-end gap-2">
            <Button onClick={handleClose} type="button" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClick} disabled={!email} type="button">
              Okay
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
