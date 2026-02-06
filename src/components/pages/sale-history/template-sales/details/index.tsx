"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { Image } from "@/components/ui/image";
import { Icons } from "@/components/ui/icons";
import { DetailTable } from "@/components/shared/detail-table";
import { ChevronRight, CircleAlert } from "lucide-react";
import { useGetTemplateSaleHistoryDetails } from "@/features/sale-histoy/templates/services/queries";
import DetailsSkeleton from "../components/SkeletonLoading";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";
import Status from "@/components/shared/Status";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";
import { filterEnglishAlphanumericStrings } from "@/utils/isEnglishAlphanumeric";

const links = [
  {
    label: "Template Sales",
    href: "/sale-history/template-sales",
  },
  {
    label: "Details",
    href: "",
  },
];

const Details = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetTemplateSaleHistoryDetails({
    id: id as string,
  });
  const { data: languageData } = useGetLandingLanguages();

  const defaultLanguageId =
    languageData?.body?.data?.find((lang) => lang.key === "en")?.id || "";

  const userDetails = [
    {
      label: "Username",
      value: (
        <div className="line-clamp-1">
          {data?.body?.data?.OneSiteUser?.username}
        </div>
      ),
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
      value: formatDate(data?.body?.data?.OneSiteUser?.createdAt ?? ""),
    },
    {
      label: "Status",
      value: (
        <div className="flex items-center justify-center">
          <Status
            showGreenDot={data?.body?.data?.OneSiteUser?.status === "ACTIVE"}
            status={
              data?.body?.data?.OneSiteUser?.status?.toLocaleLowerCase() ?? ""
            }
          />
        </div>
      ),
    },
    {
      label: "",
      value: (
        <Link
          href={`/users/all/${data?.body?.data?.OneSiteUser?.id}?tab=purchased-templates`}
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
          href={`/blog-templates/${data?.body?.data?.Template?.id}`}
          className="line-clamp-2 normal-text text-brand underline "
        >
          {data?.body?.data?.Template?.name} (
          {data?.body?.data?.Template?.templateCode})
        </Link>
      ),
    },
    {
      label: "Category",
      value: (() => {
        const contents =
          data?.body?.data?.Template?.TemplateCategory
            ?.TemplateCategoryContent ?? [];

        const names = contents.map((item: any) => item.name);
        const englishNames = filterEnglishAlphanumericStrings(names);

        return <div className="line-clamp-1">{englishNames[0]}</div>;
      })(),
    },
    {
      label: "Price",
      value: <p>${CurrencyFormat(data?.body?.data?.Template?.price ?? 0)}</p>,
    },
  ];

  const feeDetails = [
    {
      label: "Service Fee",
      value: (
        <p>
          $
          {CurrencyFormat(
            data?.body?.data?.OneSiteUserOrder?.[0]?.serviceFee ?? 0
          )}
        </p>
      ),
    },
    {
      label: "Total",
      value: (
        <p>
          ${CurrencyFormat(data?.body?.data?.OneSiteUserOrder?.[0]?.total ?? 0)}
        </p>
      ),
    },
  ];

  const paymentDetails = [
    {
      label: "Payment Status",
      value: (
        <div className="flex items-center justify-center gap-2">
          {data?.body?.data?.OneSiteUserOrder?.[0]?.PaymentStatus ===
          "SUCCESSFUL" ? (
            <Icons.Done />
          ) : (
            <CircleAlert className="text-error w-4 h-4" />
          )}
          <p className="capitalize">
            {data?.body?.data?.OneSiteUserOrder?.[0]?.PaymentStatus?.toLocaleLowerCase() ??
              "Failed"}
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
      label: "Transaction No",
      value: data?.body?.data?.OneSiteUserOrder?.[0]?.transactionNo,
    },
    {
      label: "Payment Made on",
      value: formatDate(data?.body?.data?.createdAt ?? ""),
    },
  ];

  if (isLoading) return <DetailsSkeleton />;

  return (
    <div className="space-y-6 mb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <PageBreadcrumb links={links} enableBack />
        <p className="normal-text font-normal">
          <span className="text-default-secondary">Invoice Number: </span>
          <span className="">
            {data?.body?.data?.OneSiteUserOrder[0]?.transactionNo}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {[
          { type: "Laptop", thumb: data?.body?.data?.Template?.LaptopThumb },
          { type: "Tablet", thumb: data?.body?.data?.Template?.TabletThumb },
          { type: "Mobile", thumb: data?.body?.data?.Template?.MobileThumb },
        ].map((thumbnail, index) => (
          <div
            key={index}
            className="w-full h-full flex flex-col gap-3 items-center"
          >
            <Image
              src={thumbnail.thumb?.url || ""}
              alt={thumbnail.type}
              width={1920}
              height={1080}
              className="w-full h-[90%] aspect-[4/3] object-cover object-center rounded-xl"
            />
            <div className="flex items-center gap-2 text-placeholder-secondary">
              {thumbnail.type === "Laptop" && <Icons.Laptop />}
              {thumbnail.type === "Tablet" && <Icons.Tablet />}
              {thumbnail.type === "Mobile" && <Icons.Mobile />}
              <p className="normal-text capitalize text-foreground-secondary">
                {thumbnail.type} Thumbnail
              </p>
            </div>
          </div>
        ))}
      </div>
      <DetailTable title="User Details" data={userDetails} />
      <DetailTable title="Template Details" data={templateDetails} />
      <DetailTable title="Fee" data={feeDetails} />
      <DetailTable title="Payment Details" data={paymentDetails} />
    </div>
  );
};

export default Details;
