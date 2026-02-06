"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/shared/loading";
import { LandingLanguage } from "@/features/landing-languages/types";
import { useCreateTutorial } from "@/features/settings/tutorials/services/mutations";
import { CreateTutorialRequest, createTutorialSchema } from "@/features/settings/tutorials/types";
import { TutorialsEnum } from '@/features/base/types/backend-defined-enums';
import TutorialForm from "./TutorialForm";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  languages: LandingLanguage[];
  isLoading?: boolean;
}

const CreateModal: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  languages,
  isLoading,
}) => {
  const createTutorial = useCreateTutorial();
  
  const defaultValues: CreateTutorialRequest = {
    VideoType: TutorialsEnum.LANDING,
    videoLink: "",
    videoId: "",
    TutorialContent: languages?.map((language) => ({
      languageId: language.id,
      name: "",
      description: ""
    })) ?? []
  };

  const form = useForm<CreateTutorialRequest>({
    resolver: zodResolver(createTutorialSchema),
    defaultValues
  });

  const submit = async (data: CreateTutorialRequest) => {
    try {
      await createTutorial.mutateAsync(data);
      handleClose();
    } catch (error) {
      console.error("Error creating tutorial:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[800px]">
        <DialogTitle>Create Tutorial</DialogTitle>

        {isLoading ? (
          <Loading />
        ) : (
          <TutorialForm
            form={form}
            handleClose={handleClose}
            mode="create"
            isLoading={createTutorial.isPending}
            languages={languages}
            onSubmit={submit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal; 