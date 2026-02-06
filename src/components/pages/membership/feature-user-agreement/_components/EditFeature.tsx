"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FeatureData,
  UpdateFeatureRequest,
  updateFeatureSchema,
} from "@/features/membership/features-user-agreement/types";
import FeatureForm from "./FeatureForm";
import { useUpdateFeature } from "@/features/membership/features-user-agreement/services/mutations";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  data: FeatureData;
}

const EditFeature: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const updateFeature = useUpdateFeature();
  const defaultValues: UpdateFeatureRequest = {
    id: data.id,
    fileId: data.fileId,
    title: data.title,
    description: data.description,
  };
  const form = useForm<UpdateFeatureRequest>({
    resolver: zodResolver(updateFeatureSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdateFeatureRequest) => {
    updateFeature.mutateAsync(data).then((res) => handleClose());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle> Edit Membership Feature</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <FeatureForm
              form={form}
              handleClose={handleClose}
              mode="update"
              isLoading={updateFeature.isPending}
              defaultImage={data.File.url}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFeature;
