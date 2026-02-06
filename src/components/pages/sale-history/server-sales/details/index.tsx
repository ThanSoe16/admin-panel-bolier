"use client";
import React from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { useParams } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { DetailTable } from "@/components/shared/detail-table";
import { ChevronRight, CircleAlert } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/dateTime";
import { useGetServerSaleHistoryDetails } from "@/features/sale-histoy/server/services/queries";
import DetailsSkeleton from "../components/SkeletonLoading";
import Status from "@/components/shared/Status";
import { CurrencyFormat } from "@/utils/currencyFormat";
import dayjs from "dayjs";
import { filterEnglishAlphanumericStrings } from "@/utils/isEnglishAlphanumeric";

const links = [
  {
    label: "Server Sales",
    href: "/sale-history/server",
  },
  {
    label: "Details",
    href: "",
  },
];

const Details = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetServerSaleHistoryDetails({
    id: id as string,
  });

  const userDetails = [
    {
      label: "Username",
      value: data?.body?.data?.MerchantBlog?.OneSiteUser?.username,
    },
    {
      label: "Email",
      value: (
        <div className="line-clamp-1">
          {data?.body?.data?.MerchantBlog?.OneSiteUser?.email}
        </div>
      ),
    },
    {
      label: "Joined on",
      value: formatDate(
        data?.body?.data?.MerchantBlog?.OneSiteUser?.joinData ?? ""
      ),
    },
    {
      label: "Status",
      value: (
        <div className="flex items-center justify-center">
          <Status
            showGreenDot={
              data?.body?.data?.MerchantBlog?.OneSiteUser?.status === "ACTIVE"
            }
            status={
              data?.body?.data?.MerchantBlog?.OneSiteUser?.status?.toLowerCase() ??
              ""
            }
          />
        </div>
      ),
    },
    {
      label: "",
      value: (
        <Link
          href={`/users/all/${data?.body?.data?.MerchantBlog?.OneSiteUser?.id}`}
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
          href={`/blog-templates/${data?.body?.data?.MerchantBlog?.Template?.id}`}
          className="line-clamp-2 normal-text text-brand underline "
        >
          {data?.body?.data?.MerchantBlog?.Template?.name} (
          {data?.body?.data?.MerchantBlog?.Template?.templateCode})
        </Link>
      ),
    },
    {
      label: "Category",
      value: (() => {
        const contents =
          data?.body?.data?.MerchantBlog?.Template?.TemplateCategory
            ?.TemplateCategoryContent ?? [];

        const names = contents.map((item: any) => item.name);

        const englishNames = filterEnglishAlphanumericStrings(names);

        return <div className="line-clamp-1">{englishNames[0]}</div>;
      })(),
    },
    {
      label: "Price",
      value: (
        <p>
          $
          {CurrencyFormat(data?.body?.data?.MerchantBlog?.Template?.price ?? 0)}
        </p>
      ),
    },
  ];

  const feeDetails = [
    {
      label: "Started on",
      value: <p>{formatDate(data?.body?.data?.initialDate ?? "")}</p>,
    },
    {
      label: "Month",
      value: (
        <p>
          {data?.body?.data?.paidDate
            ? dayjs(data?.body?.data?.paidDate).format("MMMM")
            : "-"}
        </p>
      ),
    },
    {
      label: "Server Fee",
      value: <p>${CurrencyFormat(data?.body?.data?.total ?? 0)}/ month</p>,
    },
  ];

  const paymentDetails = [
    {
      label: "Payment Status",
      value: (
        <div className="flex items-center justify-center gap-2">
          {data?.body?.data?.MerchantBlogBillingStatus === "PAID" ? (
            <Icons.Done />
          ) : (
            <CircleAlert className="text-error w-4 h-4" />
          )}
          <p className="capitalize">
            {data?.body?.data?.MerchantBlogBillingStatus?.toLocaleLowerCase()}
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
      value: formatDate(data?.body?.data?.paidDate ?? ""),
    },
  ];
  if (isLoading) return <DetailsSkeleton />;

  return (
    <div className="space-y-6 mb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <PageBreadcrumb links={links} enableBack />
        <p className="normal-text font-normal">
          <span className="text-default-secondary">Invoice Number: </span>
          <span className="">{data?.body?.data?.transactionNo}</span>
        </p>
      </div>
      <DetailTable title="User Details" data={userDetails} />
      <DetailTable title="Template Details" data={templateDetails} />
      <DetailTable title="Server Fee Details" data={feeDetails} />
      <DetailTable title="Payment Details" data={paymentDetails} />
    </div>
  );
};

export default Details;
