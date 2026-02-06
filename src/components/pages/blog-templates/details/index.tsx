"use client";
import React from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { useParams } from "next/navigation";
import ImagePreview from "./components/ImagePreview";
import TemplateData from "./components/TemplateData";
import { DetailTable } from "@/components/shared/detail-table";
import { formatDate } from "@/utils/dateTime";
import PageTitle from "@/components/shared/PageTitle";
import { DataTable } from "@/components/shared/data-table";
import SearchInput from "@/components/shared/search-input";
import { columnDefs } from "./components/columnDefs";
import { usePagination } from "@/features/base/hooks/usePagination";
import {
  useGetBlogTemplateSaleHistory,
  useGetTemplateDetails,
} from "@/features/blog-templates/services/queries";
import { Loading } from "@/components/shared/loading";
import { parseAsString, useQueryState } from "nuqs";
import { CurrencyFormat } from "@/utils/currencyFormat";
import ThemeContainer from "./components/ThemeContainer";
import PageMeta from "./components/PageMeta";

const links = [
  { label: "Manage Blog Templates", href: "/blog-templates" },
  { label: "Template Details", href: "" },
];

const TemplateDetails = () => {
  const params = useParams();
  const id = params.id as string;
  const { query } = usePagination();
  const { data, isLoading } = useGetTemplateDetails({
    id: id ?? "",
  });
  const [search] = useQueryState("search", parseAsString);

  const { data: saleData, isLoading: fetchingSaleData } =
    useGetBlogTemplateSaleHistory({
      id: id ?? "",
      filter: {
        word: search ?? "",
      },
    });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <PageBreadcrumb enableBack links={links} />
      <div className="flex flex-col lg:flex-row gap-4">
        {data?.body?.data && (
          <>
            <ImagePreview data={data?.body?.data} />
            <TemplateData data={data?.body?.data} />
          </>
        )}
      </div>
      {data?.body?.data && <ThemeContainer data={data?.body?.data} />}
      {data?.body?.data && <PageMeta data={data?.body?.data} />}

      <DetailTable
        title="Other Details"
        data={[
          {
            label: "Ready From Dev On",
            value: formatDate(data?.body?.data?.updatedAt || ""),
          },
          {
            label: "Uploaded By (Dev)",
            value: data?.body?.data?.CreatedBy?.name,
          },
          {
            label: "Uploaded to One Site on",
            value: formatDate(data?.body?.data?.uploadedAt || ""),
          },
          {
            label: "Uploaded By (Admin)",
            value: data?.body?.data?.UploadedBy?.name,
          },
          {
            label: "Total User Count",
            value: (
              <p className="text-brand">
                {CurrencyFormat(data?.body?.data?.totalBuyers || 0)}
              </p>
            ),
          },
        ]}
      />

      <PageTitle className="mt-4 mb-0"> Template Sale List </PageTitle>

      <div className="w-[calc(100dvw-65px)] md:w-full">
        {fetchingSaleData ? (
          <Loading />
        ) : (
          saleData?.body?.data && (
            <DataTable
              isShowNo={false}
              data={saleData?.body?.data}
              total={saleData?.body?.total}
              columns={columnDefs}
              renderHeader={() => (
                <SearchInput placeholder="Search by username" />
              )}
              query={query}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TemplateDetails;
