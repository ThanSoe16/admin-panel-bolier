"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TemplatePagePreviewData,
  templatePagePreviewSchema,
} from "@/features/blog-templates/types";
import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LandingLanguage } from "@/features/landing-languages/types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import TemplateImagePicker from "./TemplateImagePicker";
import { Image } from "@/components/ui/image";

const IMAGE_FILE_SIZE_LIMIT = 10 * 1024;

interface Props {
  landingLanguages: LandingLanguage[];
  data: TemplatePagePreviewData;
  open: boolean;
  handleCancel: () => void;
  handleOk: (data: TemplatePagePreviewData) => void;
}

const EditPReviewModel: React.FC<Props> = ({
  open,
  data,
  handleCancel,
  handleOk,
  landingLanguages,
}) => {
  const form = useForm<TemplatePagePreviewData>({
    resolver: zodResolver(templatePagePreviewSchema),
    defaultValues: {
      pages: data?.pages,
      thumbnail: data?.thumbnail,
      imageUrls: data.imageUrls,
    },
  });

  const { fields: titleFields } = useFieldArray({
    control: form.control,
    name: "pages",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit(handleOk)(event);
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogTitle> Edit Preview Photo </DialogTitle>
        <div className="flex flex-col gap-0">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="w-full ">
              {titleFields.map((item, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`pages.${index}.page_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={`Page Name in ${
                            landingLanguages?.find(
                              (language) => language?.id === item?.languageId
                            )?.name ?? ""
                          }`}
                          {...field}
                          maxLength={20}
                          preFix={
                            <Image
                              src={
                                landingLanguages?.find(
                                  (language) =>
                                    language?.id === item?.languageId
                                )?.File?.url ?? ""
                              }
                              width={20}
                              height={20}
                              alt="icon"
                              className="rounded-full w-5 h-5"
                            />
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}

              <p className="text-lg font-bold mt-4"> Upload image </p>
              <p className="text-xs text-default-secondary">
                {" "}
                Accepted formats : jpg, png only Max file size : 10 MB
              </p>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="thumbnail.laptop"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TemplateImagePicker
                          onChange={({ url, fileId }) => {
                            form.setValue("imageUrls", {
                              ...form.getValues("imageUrls"),
                              laptop: url,
                            });
                            field.onChange(fileId);
                          }}
                          labelText="Website"
                          uniqueKey="thumbnail-laptop"
                          acceptFiles=".jpg, .jpeg, .png"
                          defaultUrl={data?.imageUrls?.laptop}
                          maxFileSizeInKb={IMAGE_FILE_SIZE_LIMIT}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail.tablet"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TemplateImagePicker
                          onChange={({ url, fileId }) => {
                            form.setValue("imageUrls", {
                              ...form.getValues("imageUrls"),
                              tablet: url,
                            });
                            field.onChange(fileId);
                          }}
                          labelText="Tablet"
                          uniqueKey="thumbnail-tablet"
                          acceptFiles=".jpg, .jpeg, .png"
                          defaultUrl={data?.imageUrls?.tablet}
                          maxFileSizeInKb={IMAGE_FILE_SIZE_LIMIT}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail.mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TemplateImagePicker
                          onChange={({ url, fileId }) => {
                            form.setValue("imageUrls", {
                              ...form.getValues("imageUrls"),
                              mobile: url,
                            });
                            field.onChange(fileId);
                          }}
                          labelText="Mobile"
                          uniqueKey="thumbnail-mobile"
                          acceptFiles=".jpg, .jpeg, .png"
                          defaultUrl={data?.imageUrls?.mobile}
                          maxFileSizeInKb={IMAGE_FILE_SIZE_LIMIT}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row gap-4 justify-end items-center mt-4">
                <Button
                  variant="outline"
                  className="text-text-primary"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  // loading={isPending}
                  addDoneIcon
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPReviewModel;
