'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '@/components/shared/loading';
import { useUpdateTutorial } from '@/features/settings/tutorials/services/mutations';
import { UpdateTutorialRequest, updateTutorialSchema } from '@/features/settings/tutorials/types';
import { TutorialData } from '@/features/settings/tutorials/types';
import TutorialForm from './TutorialForm';
import { TutorialsEnum } from '@/features/base/types/backend-defined-enums';

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  tutorial: TutorialData | null;
  isLoading?: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ open, handleClose, tutorial, isLoading }) => {
  const updateTutorial = useUpdateTutorial();

  const form = useForm<UpdateTutorialRequest>({
    resolver: zodResolver(updateTutorialSchema),
    defaultValues: tutorial
      ? {
          VideoType: tutorial.VideoType as TutorialsEnum,
          videoLink: tutorial.videoLink || '',
          videoId: tutorial.videoId || '',
          TutorialContent: tutorial.TutorialContent.map((content) => ({
            id: content.id,
            languageId: content.languageId,
            name: content.name,
            description: content.description,
          })),
        }
      : {
          VideoType: TutorialsEnum.LANDING,
          videoLink: '',
          videoId: '',
          TutorialContent: [],
        },
  });

  // Get unique languages from TutorialContent
  const editLanguages =
    tutorial?.TutorialContent.map((content) => ({
      id: content.languageId,
      name: content.Language.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'ACTIVE' as const,
      fileId: '',
      key: content.languageId,
      File: {
        id: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: content.languageId,
        url: content?.Language?.File?.url ?? '',
        type: 'image/png',
      },
    })) || [];

  const submit = async (data: UpdateTutorialRequest) => {
    if (!tutorial) return;
    try {
      await updateTutorial.mutateAsync({
        id: tutorial.id,
        data,
      });
      handleClose();
    } catch (error) {
      console.error('Error updating tutorial:', error);
    }
  };

  const handleDialogClose = () => {
    form.reset();
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[800px]">
        <DialogTitle>Edit Tutorial</DialogTitle>

        {isLoading ? (
          <Loading />
        ) : (
          <TutorialForm
            form={form}
            handleClose={handleDialogClose}
            mode="update"
            isLoading={updateTutorial.isPending}
            languages={editLanguages}
            onSubmit={submit as any} // Type assertion to fix type mismatch
            defaultVideoSource={tutorial?.videoId ? 'upload' : 'youtube'}
            tutorial={tutorial}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
