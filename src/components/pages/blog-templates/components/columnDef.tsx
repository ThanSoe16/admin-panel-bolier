"use client";
import React from "react";
import { TemplateByCategoryData } from "@/features/blog-templates/types";
import { ColumnDef } from "@tanstack/react-table";
import { Dot, Eye } from "lucide-react";
import Image from "next/image";
import ImagePreview from "@/components/shared/image-preview";
import { CurrencyFormat } from "@/utils/currencyFormat";
import dayjs from "dayjs";
import Link from "next/link";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { BlogTemplateData } from "@/features/blog-templates/types";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { cn } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";

const TemplateName = ({ target }: { target: BlogTemplateData }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-2">
      <div
        className="relative w-[64px] h-[48px] group cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src={target.LaptopThumb?.url}
          alt="Template Image"
          width={64}
          height={48}
          className="rounded-sm min-w-[64px] h-[48px] object-cover"
        />
        <div className="bg-black/50 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
          <Eye className="text-black" fill="white" />
        </div>
      </div>
      <p className="line-clamp-1"> {target.name} </p>
      {open && (
        <ImagePreview
          imageUrl={target.LaptopThumb?.url}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

const Actions = (props: { target: BlogTemplateData }) => {
  return (
    <div className="space-x-3">
      <Link href={`/blog-templates/${props?.target?.id}`}>
        <TableBaseButton uiType="details">Details</TableBaseButton>
      </Link>
      <Link href={`/blog-templates/update?id=${props?.target?.id}`}>
        <TableBaseButton uiType="edit">Edit</TableBaseButton>
      </Link>
    </div>
  );
};

const CategoryName = ({ target }: { target: BlogTemplateData }) => {
  const { data: languageData } = useGetLandingLanguages();

  const defaultLanguageId =
    languageData?.body?.data?.find((lang) => lang.key === "en")?.id || "";

  return (
    <p className="line-clamp-1">
      {
        target.TemplateCategory?.TemplateCategoryContent?.find(
          (category) => category.languageId === defaultLanguageId
        )?.name
      }
    </p>
  );
};

export const columnDefs: ColumnDef<BlogTemplateData>[] = [
  {
    accessorKey: "name",
    header: "Template Name",
    size: 200,
    cell: ({ row }) => <TemplateName target={row.original} />,
  },
  {
    accessorKey: "templateCode",
    header: "Template ID",
    size: 150,
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 150,
    cell: ({ row }) => <CategoryName target={row.original} />,
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 100,
    cell: ({ row }) => <p> ${CurrencyFormat(row.original.price)}</p>,
  },
  {
    accessorKey: "total Users",
    header: "Total Buyers",
    size: 150,
    cell: ({ row }) => <p>{CurrencyFormat(row.original.totalBuyers ?? 0)}</p>,
  },
  {
    accessorKey: "updatedAt",
    header: "Uploaded On",
    size: 150,
    cell: ({ row }) => (
      <p>{dayjs(row.original.updatedAt).format("DD MMM YYYY, HH:mm")}</p>
    ),
  },
  {
    accessorKey: "Status",
    header: "Status",
    size: 150,
    cell: ({ row }) => (
      <Flex align="center">
        <Dot
          className={cn(
            "w-8 h-8 -ml-[12px] md:w-10 md:h-10 md:-ml-[16px]",
            row.original?.Status ? "text-green-500" : "text-white"
          )}
        />
        <p className="text-text-primary text-sm -ml-1">
          {" "}
          {row.original?.Status ? "Active" : "Inactive"}{" "}
        </p>
      </Flex>
    ),
  },
  {
    accessorKey: "status",
    size: 150,
    header: "Actions",
    cell: ({ row }) => <Actions target={row.original} />,
  },
];

export const overviewColumnDefs: ColumnDef<TemplateByCategoryData>[] = [
  {
    accessorKey: "category",
    header: "Category",
    size: 200,
    cell: ({ row }) => <p>{row.original?.name}</p>,
  },
  {
    accessorKey: "total",
    header: "Total Count",
    cell: ({ row }) => (
      <p>{CurrencyFormat(row.original.totalTemplates ?? 0)}</p>
    ),
  },
  {
    accessorKey: "using",
    header: "Using Count",
    cell: ({ row }) => (
      <p className="text-success font-bold">
        {CurrencyFormat(row.original.totalUseCount ?? 0)}
      </p>
    ),
  },
  {
    accessorKey: "sale",
    header: "Sales Count",
    cell: ({ row }) => (
      <p className="text-success font-bold">
        {CurrencyFormat(row.original.totalSalesCount ?? 0)}
      </p>
    ),
  },
];
