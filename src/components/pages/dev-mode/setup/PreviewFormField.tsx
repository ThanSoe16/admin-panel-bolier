"use client";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  TemplatePagePreviewData,
  TemplateSetUpRequest,
} from "@/features/blog-templates/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreatePreviewModal from "./CreatePreviewModal";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import LanguageFormLabel from "@/components/shared/LanguageFormLabel";
import { ColumnDef } from "@tanstack/react-table";
import PreviewTableAction from "./PreviewTableAction";
import { DraggableTable } from "@/components/shared/data-table/draggable-table";
import { usePagination } from "@/features/base/hooks/usePagination";

interface Props {
  form: UseFormReturn<TemplateSetUpRequest>;
}

const PREVIEW_LIMIT = 10;

const PreviewFormField: React.FC<Props> = ({ form }) => {
  const { data: languageData } = useGetLandingLanguages();
  const [open, setOpen] = React.useState(false);
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "previews",
  });
  const { query } = usePagination();

  const templatePreviewColumnDefs: ColumnDef<TemplatePagePreviewData>[] = [
    {
      accessorKey: "en-title",
      size: 200,
      header: () => (
        <LanguageFormLabel
          imageUrl={
            languageData?.body?.data?.find((lang) => lang.key === "en")?.File
              ?.url
          }
          label={`${
            languageData?.body?.data?.find((lang) => lang.key === "en")?.name
          }`}
        />
      ),
      cell: ({ row }) =>
        row.original.pages.find(
          (lang) =>
            lang.languageId ===
            languageData?.body?.data?.find((lang) => lang.key === "en")?.id
        )?.page_name,
    },
    {
      accessorKey: "ch-title",
      header: () => (
        <LanguageFormLabel
          imageUrl={
            languageData?.body?.data?.find((lang) => lang.key === "ch")?.File
              ?.url
          }
          label={`${
            languageData?.body?.data?.find((lang) => lang.key === "ch")?.name
          }`}
        />
      ),
      cell: ({ row }) =>
        row.original.pages.find(
          (lang) =>
            lang.languageId ===
            languageData?.body?.data?.find((lang) => lang.key === "ch")?.id
        )?.page_name,
    },
    {
      accessorKey: "mm-title",
      header: () => (
        <LanguageFormLabel
          imageUrl={
            languageData?.body?.data?.find((lang) => lang.key === "mm")?.File
              ?.url
          }
          label={`${
            languageData?.body?.data?.find((lang) => lang.key === "mm")?.name
          }`}
        />
      ),
      cell: ({ row }) =>
        row.original.pages.find(
          (lang) =>
            lang.languageId ===
            languageData?.body?.data?.find((lang) => lang.key === "mm")?.id
        )?.page_name,
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => (
        //eslint-disable-next-line
        <img
          src={row?.original?.imageUrls?.laptop}
          className="w-[56px] h-[56px] object-cover"
        />
      ),
    },
    {
      accessorKey: "Tablet",
      header: "Tablet",
      cell: ({ row }) => (
        //eslint-disable-next-line
        <img
          src={row?.original?.imageUrls?.tablet}
          className="w-[56px] h-[56px] object-cover"
        />
      ),
    },
    {
      accessorKey: "Mobile",
      header: "Mobile",
      cell: ({ row }) => (
        //eslint-disable-next-line
        <img
          src={row?.original?.imageUrls?.mobile}
          className="w-[56px] h-[56px] object-cover"
        />
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <PreviewTableAction
          target={row.original}
          remove={remove}
          index={row.index}
          handleEdit={(data) => update(row.index, data)}
        />
      ),
    },
  ];

  const handleCreatePreview = (data: TemplatePagePreviewData) => {
    append({
      pages: data?.pages,
      thumbnail: data?.thumbnail,
      imageUrls: data?.imageUrls,
    });
    setOpen(false);
  };

  return (
    <div>
      {fields.length === 0 && (
        <div className="text-default font-bold pb-4">
          {`Preview Photos (${fields.length}/ ${PREVIEW_LIMIT})`}
        </div>
      )}
      {fields.length === 0 ? (
        <div className="rounded-2xl py-6 flex flex-col justify-center items-center gap-4 w-full bg-[#F7F7F7]">
          <p className="text-sm"> No preview photo yet! Add some.</p>
          <Button onClick={() => setOpen(true)} type="button">
            <Plus /> Add New
          </Button>
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-row justify-between items-center mb-4">
            <div className="text-default font-bold pb-4">
              {`Preview Photos (${fields.length}/ ${PREVIEW_LIMIT})`}
            </div>
            <Button
              onClick={() => setOpen(true)}
              type="button"
              disabled={fields.length >= PREVIEW_LIMIT}
            >
              <Plus /> Add New
            </Button>
          </div>
          <DraggableTable
            data={fields}
            columns={templatePreviewColumnDefs}
            onPositionChange={(data) => {
              form.setValue("previews", data);
            }}
            query={query}
          />
        </div>
      )}

      {open && languageData?.body?.data && (
        <CreatePreviewModal
          open={open}
          handleCancel={() => setOpen(false)}
          handleOk={handleCreatePreview}
          landingLanguages={languageData?.body?.data}
        />
      )}
    </div>
  );
};

export default PreviewFormField;
