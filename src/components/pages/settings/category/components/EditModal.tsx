"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  updateCategorySchema,
  CategoryData,
  UpdateCategoryRequest,
} from "@/features/settings/category/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/shared/loading";
import { LandingLanguage } from "@/features/landing-languages/types";
import { useUpdateCategory } from "@/features/settings/category/services/mutations";
import CategoryForm from "./CategoryForm";

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  languages: LandingLanguage[];
  isLoading?: boolean;
  target: CategoryData;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  handleClose,
  languages,
  isLoading,
  target,
}) => {
  const updateCategory = useUpdateCategory();

  const defaultValues: UpdateCategoryRequest = {
    id: target.id,
    fileId: target.Thumbnail.id,
    url: target.Thumbnail.url,
    name: target.Thumbnail.name,
    items: target.TemplateCategoryContent.map((item) => ({
      langId: item.languageId,
      name: item.name,
    })),
  };
  const form = useForm<UpdateCategoryRequest>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdateCategoryRequest) => {
    updateCategory.mutateAsync(data).then((res) => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px]">
        <DialogTitle> Edit Category </DialogTitle>
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
                mode="update"
                isLoading={updateCategory.isPending}
                languages={languages}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
