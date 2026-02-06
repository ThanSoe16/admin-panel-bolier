"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CreateFeatureRequest,
  createFeatureSchema,
} from "@/features/membership/features-user-agreement/types";
import FeatureForm from "./FeatureForm";
import { useCreateFeature } from "@/features/membership/features-user-agreement/services/mutations";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateFeature: React.FC<CreateModalProps> = ({ open, handleClose }) => {
  const createFeature = useCreateFeature();
  const defaultValues: CreateFeatureRequest = {
    fileId: "",
    title: "",
    description: "",
  };
  const form = useForm<CreateFeatureRequest>({
    resolver: zodResolver(createFeatureSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: CreateFeatureRequest) => {
    createFeature.mutateAsync(data).then((res) => handleClose());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle> Create Membership Feature </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <FeatureForm
              form={form}
              handleClose={handleClose}
              mode="create"
              isLoading={createFeature.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeature;
