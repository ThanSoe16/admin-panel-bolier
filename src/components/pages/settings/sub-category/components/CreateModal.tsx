"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/shared/loading";
import { LandingLanguage } from "@/features/landing-languages/types";
import {
  CreateSubCategoryRequest,
  createSubCategorySchema,
} from "@/features/settings/sub-category/types";
import { useCreateSubCategory } from "@/features/settings/sub-category/services/mutations";
import SubCategoryForm from "./SubCategoryForm";

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
  const createSubCategory = useCreateSubCategory();
  const defaultValues: CreateSubCategoryRequest = {
    templateCategoryId: "",
    items:
      languages?.map((language) => {
        return {
          langId: language?.id ?? "",
          name: "",
        };
      }) ?? [],
  };

  const form = useForm<CreateSubCategoryRequest>({
    resolver: zodResolver(createSubCategorySchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: CreateSubCategoryRequest) => {
    createSubCategory.mutateAsync(data).then((res) => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle> Create Sub Category </DialogTitle>

        {isLoading ? (
          <Loading />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col "
            >
              <SubCategoryForm
                form={form}
                languages={languages}
                mode="create"
                handleClose={handleClose}
                isLoading={createSubCategory?.isPending}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
