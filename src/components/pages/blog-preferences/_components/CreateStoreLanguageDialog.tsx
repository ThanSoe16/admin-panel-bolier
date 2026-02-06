"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreateBlogLanguageRequest,
  createBlogLanguageSchema,
} from "@/features/blog-preferences/types";
import { toast } from "sonner";
import { useCreateBlogLanguage } from "@/features/blog-preferences/services/mutations";
import Combobox from "@/components/shared/combobox";
import { languageOptionsData } from "@/data/languagesOptionsData";
import FlagUpload from "./FlagUpload";

interface CreateStoreLanguageDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateStoreLanguageDialog = ({
  open,
  onClose,
}: CreateStoreLanguageDialogProps) => {
  const { mutateAsync: createBlogLanguage, isPending } =
    useCreateBlogLanguage();
  const [search, setSearch] = useState("");

  const form = useForm<CreateBlogLanguageRequest>({
    resolver: zodResolver(createBlogLanguageSchema),
    defaultValues: {
      name: "",
      fileId: "",
      key: "",
      isDefault: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (submittedData: CreateBlogLanguageRequest) => {
    try {
      const response = await createBlogLanguage(submittedData);
      if (response?.meta?.success) {
        toast.success(response?.meta?.message);
        onClose();
      }
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[520px] max-h-[80dvh] ">
        <DialogHeader>
          <div className="flex w-full items-center justify-between">
            <DialogTitle className="text-lg font-bold leading-[26px] md:text-[24px] lg:leading-[36px]">
              Create Store Language
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="fileId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FlagUpload onChange={(fileId) => field.onChange(fileId)} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Currency Name Field */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute -top-2 left-2 z-10 bg-white text-xs text-default-secondary md:text-sm">
                      Language Name
                    </FormLabel>
                    <div className="relative">
                      <Combobox
                        options={languageOptionsData
                          ?.filter((item) =>
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          ?.map((language) => ({
                            label: language?.name,
                            value: language?.name,
                          }))}
                        value={field.value}
                        setValue={(value) => {
                          field.onChange(value);
                          form.setValue(
                            "key",
                            languageOptionsData.find(
                              (item) => item.name === value
                            )?.code ?? ""
                          );
                        }}
                        onSearchChange={(searchValue) => {
                          setSearch(searchValue);
                        }}
                        position="top"
                      />
                    </div>
                    {form.formState.errors.name && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                addDoneIcon
                disabled={!form.getValues("fileId") || !form.getValues("name")}
                loading={isPending}
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
