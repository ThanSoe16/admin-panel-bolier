'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteTutorial } from '@/features/settings/tutorials/services/mutations';
import { TutorialData } from '@/features/settings/tutorials/types';

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  tutorial: TutorialData | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, handleClose, tutorial }) => {
  const deleteTutorial = useDeleteTutorial();

  const handleDelete = async () => {
    if (!tutorial) return;
    try {
      await deleteTutorial.mutateAsync({ id: tutorial.id });
      handleClose();
    } catch (error) {
      console.error('Error deleting tutorial:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>Delete Tutorial</DialogTitle>
        <p>Are you sure you want to delete this tutorial?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteTutorial.isPending}>
            {deleteTutorial.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
