"use client";
import React from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { useParams } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { DetailTable } from "@/components/shared/detail-table";
import { ChevronRight, CircleAlert } from "lucide-react";
import Link from "next/link";
import Status from "@/components/shared/Status";
import { useGetHostingSaleHistoryDetails } from "@/features/sale-histoy/hosting/services/queries";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";
import DetailsSkeleton from "../components/SkeletonLoading";

const links = [
  {
    label: "Hosting Sales",
    href: "/sale-history/hosting",
  },
  {
    label: "Details",
    href: "",
  },
];

const Details = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetHostingSaleHistoryDetails({
    id: id as string,
  });
  const saleData = data?.body?.data;

  const userDetails = [
    {
      label: "Username",
      value: saleData?.MerchantBlog?.OneSiteUser?.username,
    },
    {
      label: "Email",
      value: (
        <div className="line-clamp-1">
          {saleData?.MerchantBlog?.OneSiteUser?.email}
        </div>
      ),
    },
    {
      label: "Joined on",
      value: formatDate(saleData?.MerchantBlog?.OneSiteUser?.createdAt ?? ""),
    },
    {
      label: "Status",
      value: (
        <div className="flex items-center justify-center">
          <Status
            showGreenDot={
              saleData?.MerchantBlog?.OneSiteUser?.status === "ACTIVE"
            }
            status={
              saleData?.MerchantBlog?.OneSiteUser?.status?.toLowerCase() ?? ""
            }
          />
        </div>
      ),
    },
    {
      label: "",
      value: (
        <Link
          href={`/users/all/${saleData?.MerchantBlog?.OneSiteUser?.id}`}
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
      label: "Linked with (Template)",
      value: (
        <Link
          href={`/blog-templates/${saleData?.MerchantBlog?.Template?.id}`}
          className="line-clamp-2 normal-text text-brand underline "
        >
          {saleData?.MerchantBlog?.Template?.name} (
          {saleData?.MerchantBlog?.Template?.templateCode})
        </Link>
      ),
    },
    {
      label: "Template",
      value: (
        <Link
          href={`/blog-templates/${saleData?.MerchantBlog?.Template?.id}`}
          className="normal-text text-brand underline line-clamp-2"
        >
          {saleData?.MerchantBlog?.Template?.name} (
          {saleData?.MerchantBlog?.Template?.templateCode})
        </Link>
      ),
    },
    {
      label: "Domain Link",
      value: (
        <Link
          href={saleData?.MerchantBlog?.blogDomain ?? ""}
          className="line-clamp-2 normal-text text-brand underline"
        >
          {saleData?.MerchantBlog?.blogDomain ?? "Not Connected"}
        </Link>
      ),
    },
    {
      label: "Published on",
      value: formatDate(saleData?.updatedAt ?? "") ?? "-",
    },
    {
      label: "Hosting Fee",
      value: <p>${CurrencyFormat(saleData?.total ?? 0)}</p>,
    },
  ];

  const paymentDetails = [
    {
      label: "Payment Status",
      value: (
        <div className="flex items-center justify-center gap-2">
          {saleData?.MerchantBlogBillingStatus === "PAID" ? (
            <Icons.Done />
          ) : (
            <CircleAlert className="text-error w-4 h-4" />
          )}
          <p className="capitalize">
            {saleData?.MerchantBlogBillingStatus == "PAID"
              ? "Successful"
              : "Pending"}
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
          <span className="">{saleData?.transactionNo ?? "-"}</span>
        </p>
      </div>
      <DetailTable title="User Details" data={userDetails} />
      <DetailTable title="Template Details" data={templateDetails} />
      <DetailTable title="Payment Details" data={paymentDetails} />
    </div>
  );
};

export default Details;
