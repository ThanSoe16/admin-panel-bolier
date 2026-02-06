"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  CreateCategoryRequest,
  createCategorySchema,
} from "@/features/settings/category/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/shared/loading";
import { LandingLanguage } from "@/features/landing-languages/types";
import { useCreateCategory } from "@/features/settings/category/services/mutations";
import CategoryForm from "./CategoryForm";

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
  const createCategory = useCreateCategory();
  const defaultValues: CreateCategoryRequest = {
    fileId: "",
    url: "",
    name: "",
    items:
      languages?.map((language) => {
        return {
          langId: language?.id ?? "",
          name: "",
        };
      }) ?? [],
  };
  const form = useForm<CreateCategoryRequest>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: CreateCategoryRequest) => {
    createCategory.mutateAsync(data).then((res) => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px]">
        <DialogTitle> Create Category </DialogTitle>

        {isLoading ? (
          <Loading />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col "
            >
              <CategoryForm
                form={form}
                handleClose={handleClose}
                mode="create"
                isLoading={createCategory.isPending}
                languages={languages}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
