"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/shared/loading";
import { LandingLanguage } from "@/features/landing-languages/types";
import {
  SubCategoryData,
  UpdateSubCategoryRequest,
  updateSubCategorySchema,
} from "@/features/sub-category/types";
import { useUpdateSubCategory } from "@/features/sub-category/services/mutations";
import SubCategoryForm from "./SubCategoryForm";

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  languages: LandingLanguage[];
  isLoading?: boolean;
  data: SubCategoryData;
}

const DetailModal: React.FC<EditModalProps> = ({
  open,
  handleClose,
  languages,
  isLoading,
  data,
}) => {
  const updateSubCategory = useUpdateSubCategory();
  const defaultValues: UpdateSubCategoryRequest = {
    id: data.id ?? "",
    templateCategoryId: data.templateCategoryId ?? "",
    items: data.TemplateSubCategoryContent.flatMap((item) => {
      return {
        langId: item.languageId,
        name: item.name,
      };
    }),
  };

  const form = useForm<UpdateSubCategoryRequest>({
    resolver: zodResolver(updateSubCategorySchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdateSubCategoryRequest) => {
    updateSubCategory.mutateAsync(data).then((res) => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle> Detail Sub Category </DialogTitle>

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
                mode="view"
                handleClose={handleClose}
                isLoading={updateSubCategory?.isPending}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
