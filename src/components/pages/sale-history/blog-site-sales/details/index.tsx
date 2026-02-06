"use client";
import React from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { useParams } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { DetailTable } from "@/components/shared/detail-table";
import { ChevronRight, CircleAlert } from "lucide-react";
import Link from "next/link";
import Status from "@/components/shared/Status";
import { useGetBlogSiteSaleHistoryDetails } from "@/features/sale-histoy/blog-site/services/queries";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";
import DetailsSkeleton from "../components/SkeletonLoading";
import { getFeeTypeName } from "@/utils/getFeeTypeName";
import { filterEnglishAlphanumericStrings } from "@/utils/isEnglishAlphanumeric";

const links = [
  {
    label: "Blog Site Sales",
    href: "/sale-history/blog-site",
  },
  {
    label: "Details",
    href: "",
  },
];

const Details = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBlogSiteSaleHistoryDetails({
    id: id as string,
  });
  const saleData = data?.body?.data;

  const userDetails = [
    {
      label: "Username",
      value: saleData?.OneSiteUser?.username,
    },
    {
      label: "Email",
      value: (
        <div className="line-clamp-1">
          {data?.body?.data?.OneSiteUser?.email}
        </div>
      ),
    },
    {
      label: "Joined on",
      value: formatDate(saleData?.OneSiteUser?.createdAt ?? ""),
    },
    {
      label: "Status",
      value: (
        <div className="flex items-center justify-center">
          <Status
            showGreenDot={saleData?.OneSiteUser?.status === "ACTIVE"}
            status={saleData?.OneSiteUser?.status?.toLowerCase() ?? ""}
          />
        </div>
      ),
    },
    {
      label: "",
      value: (
        <Link
          href={`/users/all/${saleData?.OneSiteUser?.id}`}
          className="w-full flex items-center justify-center gap-2 normal-text"
        >
          <p className="text-brand">More Details</p>
          <ChevronRight />
        </Link>
      ),
    },
  ];

  const templateDetails = [
    {
      label: "Template",
      value: (
        <Link
          href={`/blog-templates/${saleData?.MerchantBlog?.Template?.id}`}
          className="line-clamp-2 normal-text text-brand underline"
        >
          {saleData?.MerchantBlog?.Template?.name} (
          {saleData?.MerchantBlog?.Template?.templateCode})
        </Link>
      ),
    },
    {
      label: "Category",
      value: (() => {
        const contents =
          saleData?.MerchantBlog?.Template?.TemplateCategory
            ?.TemplateCategoryContent ?? [];

        const names = contents.map((item: any) => item.name);
        const englishNames = filterEnglishAlphanumericStrings(names);

        return <div className="line-clamp-1">{englishNames[0]}</div>;
      })(),
    },
    {
      label: "Price",
      value: (
        <p>${CurrencyFormat(saleData?.MerchantBlog?.Template?.price ?? 0)}</p>
      ),
    },
  ];

  const feeDetails = [
    {
      label: "Fee Type",
      value: getFeeTypeName(saleData?.FeeType ?? "CREATE_BLOG"),
    },
    {
      label: "Total",
      value: <p>${CurrencyFormat(saleData?.total ?? 0)}</p>,
    },
  ];

  const paymentDetails = [
    {
      label: "Payment Status",
      value: (
        <div className="flex items-center justify-center gap-2">
          {saleData?.PaymentStatus === "SUCCESSFUL" ? (
            <Icons.Done />
          ) : (
            <CircleAlert className="text-error w-4 h-4" />
          )}
          <p className="capitalize">
            {saleData?.PaymentStatus?.toLowerCase() ?? "Failed"}
          </p>
        </div>
      ),
    },
    {
      label: "Payment Method",
      value: "Onesite Wallet",
    },
    {
      label: "Card Number",
      value: "-",
    },
    {
      label: "Payment Made on",
      value: formatDate(saleData?.createdAt ?? ""),
    },
  ];

  if (isLoading) return <DetailsSkeleton />;

  return (
    <div className="space-y-6 mb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <PageBreadcrumb links={links} enableBack />
        <p className="normal-text font-normal">
          <span className="text-default-secondary">Invoice Number: </span>
          <span className="">{saleData?.transactionNo}</span>
        </p>
      </div>
      <DetailTable title="User Details" data={userDetails} />
      <DetailTable title="Template Details" data={templateDetails} />
      <DetailTable title="Fee" data={feeDetails} />
      <DetailTable title="Payment Details" data={paymentDetails} />
    </div>
  );
};

export default Details;
