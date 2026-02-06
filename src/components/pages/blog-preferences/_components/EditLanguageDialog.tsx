"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Combobox from "@/components/shared/combobox";
import { languageOptionsData } from "@/data/languagesOptionsData";
import { useUpdateBlogLanguage } from "@/features/blog-preferences/services/mutations";
import {
  BlogLanguageData,
  UpdateBlogLanguageRequest,
  updateBlogLanguageSchema,
} from "@/features/blog-preferences/types";
import { toast } from "sonner";
import FlagUpload from "./FlagUpload";

interface EditLanguageDialogProps {
  open: boolean;
  onClose: () => void;
  data: BlogLanguageData;
}

export const EditLanguageDialog = ({
  open,
  onClose,
  data,
}: EditLanguageDialogProps) => {
  const { mutateAsync: updateBlog, isPending } = useUpdateBlogLanguage();
  const [search, setSearch] = useState("");

  const form = useForm<UpdateBlogLanguageRequest>({
    resolver: zodResolver(updateBlogLanguageSchema),
    defaultValues: {
      name: data?.name,
      fileId: data?.fileId,
      key: data?.key,
      isDefault: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (submittedData: UpdateBlogLanguageRequest) => {
    try {
      const response = await updateBlog({
        id: data?.id,
        data: submittedData,
      });
      if (response?.meta?.success) {
        toast.success(response?.meta?.message);
        onClose();
      }
    } catch (error) {}
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <div className="flex w-full items-center justify-between">
            <DialogTitle className="text-lg font-bold leading-[26px] md:text-[24px] lg:leading-[36px]">
              Edit Store Language
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
                    <FlagUpload
                      onChange={(fileId) => field.onChange(fileId)}
                      defaultUrl={data?.File?.url}
                    />
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
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
