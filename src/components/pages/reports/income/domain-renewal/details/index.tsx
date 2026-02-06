"use client";
import React from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { useParams } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { DetailTable } from "@/components/shared/detail-table";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { formatDate } from "@/utils/dateTime";
import DetailsSkeleton from "../components/SkeletonLoading";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetDomainSaleHistoryDetails } from "@/features/sale-histoy/domain/services/queries";

const Details = () => {
  const { tab, date } = usePagination();

  const links = [
    {
      label: "Income Report",
      href: "/reports/income",
    },
    {
      label: tab.charAt(0).toUpperCase() + tab.slice(1),
      href: `/reports/income?tab=${tab}`,
    },
    {
      label: "Domain Renewal Fee",
      href: `reports/income/domain_renewal?tab=${tab}&date=${date}`,
    },
    {
      label: "Sale Details",
      href: "",
    },
  ];

  const { id } = useParams();
  const { data, isLoading } = useGetDomainSaleHistoryDetails({
    id: id as string,
  });
  const saleData = data?.body?.data;

  const userDetails = [
    {
      label: "Username",
      value: saleData?.username,
    },
    {
      label: "Email",
      value: <div className="line-clamp-1">{saleData?.email}</div>,
    },
  ];

  const domainDetails = [
    {
      label: "Domain Name",
      value: (
        <Link
          href={saleData?.domainName ?? ""}
          className="line-clamp-2 normal-text text-brand underline"
        >
          {saleData?.domainName ?? "Not Connected"}
        </Link>
      ),
    },
    {
      label: "Is Linked?",
      value: <p>{saleData?.linkedStatus ? "🔗" : "⛓️‍💥"}</p>,
    },
    {
      label: "Service Fee",
      value: <p>${CurrencyFormat(saleData?.serviceFee ?? 0)}</p>,
    },
    {
      label: "Renewal Fee",
      value: <p>${CurrencyFormat(saleData?.currentRenewalPrice ?? 0)}</p>,
    },
    {
      label: "Sub Total",
      value: <p>${CurrencyFormat(saleData?.subTotal ?? 0)}</p>,
    },
    {
      label: "Total",
      value: <p>${CurrencyFormat(saleData?.totalPrice ?? 0)}</p>,
    },
  ];

  const paymentDetails = [
    {
      label: "Payment Status",
      value: (
        <div className="flex items-center justify-center gap-2">
          {saleData?.paymentStatus === "SUCCESSFUL" ? (
            <Icons.Done />
          ) : (
            <CircleAlert className="text-error w-4 h-4" />
          )}
          <p className="capitalize">
            {saleData?.paymentStatus?.toLowerCase() ?? "Failed"}
          </p>
        </div>
      ),
    },
    {
      label: "Payment Method",
      value: "Onesite Wallet",
    },
    {
      label: "Purchased From",
      value: (
        <p className="capitalize">
          {saleData?.purchasedFrom?.toLocaleLowerCase()}
        </p>
      ),
    },
    {
      label: "Payment Made on",
      value: formatDate(saleData?.paymentDate ?? ""),
    },
  ];

  if (isLoading) return <DetailsSkeleton />;

  return (
    <div className="space-y-6 mb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <PageBreadcrumb links={links} enableBack />
        {/* <p className="normal-text font-normal">
          <span className="text-default-secondary">Invoice Number: </span>
          <span className="">{saleData?.transactionNo ?? "-"}</span>
        </p> */}
      </div>
      <DetailTable title="User Details" data={userDetails} />
      <DetailTable title="Domain Details" data={domainDetails} />
      <DetailTable title="Payment Details" data={paymentDetails} />
    </div>
  );
};

export default Details;
