"use client";
import React, { useEffect } from "react";
import {
  TemplateSetUpRequest,
  templateSetUpSchema,
} from "@/features/blog-templates/types";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LandingLanguage } from "@/features/landing-languages/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetCategories } from "@/features/settings/category/services/queries";
import OptionSelect from "@/components/shared/OptionSelect";
import { useGetSubCategories } from "@/features/sub-category/services/queries";
import Image from "next/image";
import CustomTextArea from "@/components/shared/custom-textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PreviewFormField from "./PreviewFormField";
import LanguageFormLabel from "@/components/shared/LanguageFormLabel";
import TemplateImagePicker from "./TemplateImagePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { perks } from "@/data/perks";
import MultiSelect from "@/components/ui/multi-select";
import { STATUS_ENUM } from "@/features/base/types/backend-defined-enums";
import { IOptions } from "@/features/base/types";
import { ThumbnailData } from "@/features/blog-templates/types";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { toast } from "sonner";
import { useUploadBlogTemplate } from "@/features/blog-templates/services/mutations";
import { MoneyInput } from "@/components/shared/base/MoneyInput";

interface TemplateSetupFormProps {
  data: TemplateSetUpRequest;
  landingLanguages: LandingLanguage[];
  thumbnailUrls?: ThumbnailData;
}

const TemplateSetupForm: React.FC<TemplateSetupFormProps> = ({
  data,
  landingLanguages,
  thumbnailUrls,
}) => {
  const router = useRouter();

  const { data: categoryData } = useGetCategories({});

  const { data: subCategoryData } = useGetSubCategories({
    categoryId: data?.template_category_id,
  });

  const { data: languageData } = useGetLandingLanguages();

  const defaultLanguageId =
    languageData?.body?.data?.find((lang) => lang.key === "en")?.id || "";

  const { mutateAsync: updateTemplate, isPending } = useUploadBlogTemplate();

  const form = useForm<TemplateSetUpRequest>({
    resolver: zodResolver(templateSetUpSchema),
    defaultValues: data,
  });

  //uncomment this field in case of debugging
  useEffect(() => {
    const subscription = form.watch((data) => {
      // console.log("Form State:", data);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const { fields: highlightFields } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const { fields: mainDescriptionsFields } = useFieldArray({
    control: form.control,
    name: "descriptions",
  });

  const selectedParks = form.watch("perks");

  const submit = async (submittedData: TemplateSetUpRequest) => {
    try {
      const dataToSend = {
        ...submittedData,
        price: Number(submittedData.price),
        previews: submittedData.previews.map((preview) => ({
          thumbnail: preview.thumbnail,
          pages: preview.pages,
        })),
      };
      const response = await updateTemplate(dataToSend);
      if (response?.meta?.success) {
        toast.success(response?.meta?.message);
        router.back();
      }
    } catch (error) {
      // console.log("error", error);
    }
  };

  // console.log("errors", form.formState.errors);
  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="thumbnail.laptop"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TemplateImagePicker
                      onChange={({ url, fileId }) => {
                        field.onChange(fileId);
                      }}
                      width="100%"
                      aspectRatio="333/220"
                      labelText="Website"
                      uniqueKey="thumbnail-website-main"
                      acceptFiles=".jpg, .jpeg, .png"
                      defaultUrl={thumbnailUrls?.laptop}
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
                        field.onChange(fileId);
                      }}
                      width="100%"
                      aspectRatio="333/220"
                      labelText="Tablet"
                      uniqueKey="thumbnail-tablet-main"
                      acceptFiles=".jpg, .jpeg, .png"
                      defaultUrl={thumbnailUrls?.tablet}
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
                        field.onChange(fileId);
                      }}
                      width="100%"
                      aspectRatio="333/220"
                      labelText="Mobile"
                      uniqueKey="thumbnail-mobile-main"
                      acceptFiles=".jpg, .jpeg, .png"
                      defaultUrl={thumbnailUrls?.mobile}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <PreviewFormField form={form} />

          <div>
            <p className="font-bold"> Basic Information </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Template ID"
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="template_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Template Name"
                        maxLength={70}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="template_category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Main Category </FormLabel>
                    <FormControl>
                      <OptionSelect
                        {...field}
                        options={
                          categoryData?.body?.data
                            ?.filter(
                              (category) =>
                                category?.Status === STATUS_ENUM.ACTIVE
                            )
                            ?.map((item) => ({
                              value: item.id,
                              label:
                                item.TemplateCategoryContent?.find(
                                  (option) =>
                                    option.languageId === defaultLanguageId
                                )?.name ?? "",
                            })) ?? []
                        }
                        placeholder="Select Template Category"
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="template_sub_category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Sub Category </FormLabel>
                    <FormControl>
                      <MultiSelect
                        disabled
                        data={
                          subCategoryData?.body?.data
                            ?.filter(
                              (subCategory) =>
                                subCategory?.Status === STATUS_ENUM.ACTIVE
                            )
                            ?.map((subCategory) => ({
                              label:
                                subCategory.TemplateSubCategoryContent?.find(
                                  (option) =>
                                    option.languageId === defaultLanguageId
                                )?.name ?? "",
                              value: subCategory.id,
                            })) ?? []
                        }
                        onChange={(value) =>
                          field.onChange(
                            value?.map((subCategory) => subCategory.value) ?? []
                          )
                        }
                        value={
                          field.value.map((subCategoryId) => ({
                            label:
                              subCategoryData?.body?.data
                                ?.find((option) => option.id === subCategoryId)
                                ?.TemplateSubCategoryContent.find(
                                  (option) =>
                                    option.languageId === defaultLanguageId
                                )?.name ?? "",
                            value: subCategoryId,
                          })) as IOptions[]
                        }
                        minHeight="48px"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <p className="font-bold"> Add Pricing</p>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MoneyInput
                      placeholder="Price"
                      value={field.value.toString()}
                      setValue={(value) => field.onChange(value)}
                      postfix="$"
                      maxLength={10}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <p className="font-bold"> Highlight Text</p>
            <div className="grid grid-cols-1 gap-4">
              {highlightFields.map((item, index) => (
                <div key={index} className="">
                  <FormField
                    control={form.control}
                    name={`highlights.${index}.highlight`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row items-center space-x-2 justify-start ">
                          <Image
                            src={
                              landingLanguages?.find(
                                (lang) =>
                                  lang.id === highlightFields[index]?.languageId
                              )?.File?.url || "/images/flag.svg"
                            }
                            width={20}
                            height={20}
                            alt="icon"
                            className="rounded-full w-5 h-5"
                          />
                          <p className="font-bold text-default text-base">
                            {" "}
                            For{" "}
                            {
                              landingLanguages?.find(
                                (lang) =>
                                  lang.id === highlightFields[index]?.languageId
                              )?.name
                            }{" "}
                          </p>
                        </div>
                        <FormControl>
                          <CustomTextArea
                            {...field}
                            placeholder="Highlight Text"
                            textLimit={500}
                            showCount
                            rows={4}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold"> Main Description </p>
            <div className="grid grid-cols-1 gap-4">
              {mainDescriptionsFields.map((item, index) => (
                <div key={index} className="">
                  <FormField
                    control={form.control}
                    name={`descriptions.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <LanguageFormLabel
                          imageUrl={
                            landingLanguages?.find(
                              (lang) =>
                                lang.id ===
                                mainDescriptionsFields[index]?.languageId
                            )?.File?.url
                          }
                          label={`For ${
                            landingLanguages?.find(
                              (lang) =>
                                lang.id ===
                                mainDescriptionsFields[index]?.languageId
                            )?.name
                          }`}
                        />
                        <FormControl>
                          <CustomTextArea
                            {...field}
                            placeholder="Main Description"
                            textLimit={500}
                            showCount
                            rows={4}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold">
              {" "}
              {`Select Perks ( ${selectedParks.length} / 3) `}{" "}
            </p>
            <div className="flex flex-row justify-start items-center gap-x-4 gap-y-2 flex-wrap">
              {perks.map((perk, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-row justify-start items-center gap-2">
                          <Checkbox
                            id={perk}
                            checked={field.value.includes(perk)}
                            disabled={
                              field.value.length >= 3 &&
                              !field.value.includes(perk)
                            }
                            onCheckedChange={(target) => {
                              if (target) {
                                field.onChange([...field.value, perk]);
                              } else {
                                field.onChange(
                                  field.value.filter((id) => id !== perk)
                                );
                              }
                            }}
                          />
                          <FormLabel htmlFor={perk}>{perk}</FormLabel>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div>
            <p className=""> Copyrights </p>
            <FormField
              control={form.control}
              name="copyright"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Designed by" />
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
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              loading={isPending}
              addDoneIcon
              disabled={!form.formState.isValid}
            >
              Upload to One Site Blog
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TemplateSetupForm;
