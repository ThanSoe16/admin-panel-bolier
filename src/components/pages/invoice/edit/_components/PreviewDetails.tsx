"use client";
import React from "react";
import Image from "next/image";
import {
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
} from "@/features/invoice/types";
import dayjs from "dayjs";
import { CurrencyFormat } from "@/utils/currencyFormat";
import {
  useGetInvoiceDetail,
  useGetInvoiceUserDetail,
} from "@/features/invoice/services/queries";
import { useGetContactUs } from "@/features/settings/contact-us/services/queries";
import { Loading } from "@/components/shared/loading";

interface Props {
  data: UpdateInvoiceRequest;
}

const Details: React.FC<Props> = ({ data }) => {
  const invoiceDetail = useGetInvoiceDetail(data.invalidId ?? "");
  const invoiceUserDetail = useGetInvoiceUserDetail(data.merchantBlogId);
  const contactUsData = useGetContactUs();

  return (
    <div className="p-4 md:p-12 bg-muted rounded-2xl">
      <div className="flex flex-col justify-center md:flex-row md:justify-between w-full gap-4 items-start">
        <Image
          src="/full-logo.svg"
          alt="Logo"
          width={222}
          height={67}
          className="w-[222px] h-[67px] object-cover"
        />
        <p className="text-lg md:text-2xl"> One Site Blog Invoice</p>
      </div>

      <div className="flex flex-col justify-center items-center lg:flex-row md:justify-between w-full gap-4 py-4">
        {contactUsData.isLoading ? (
          <Loading />
        ) : (
          contactUsData.data && (
            <div className="w-full">
              <p className="font-bold"> One Site Blog </p>
              <p> {contactUsData?.data?.body?.data?.email} </p>
              <p>
                {" "}
                {contactUsData?.data?.body?.data?.phoneNumbers.join(", ")}{" "}
              </p>
              <p>{contactUsData?.data?.body?.data?.office ?? ""}</p>
            </div>
          )
        )}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 w-full space-y-2">
          <p className="font-bold"> Invoice Summary </p>
          <div className="flex flex-row">
            <p className="text-default-secondary w-1/2"> Invoice Number: </p>
            <p> {data.invoiceNumber} </p>
          </div>
          <div className="flex flex-row">
            <p className="text-default-secondary w-1/2"> Invoice For: </p>
            <p> {dayjs(data.invoiceFor).format("MMMM YYYY")} </p>
          </div>
          <div className="flex flex-row">
            <p className="text-default-secondary w-1/2">
              {" "}
              Invoice Issued on::{" "}
            </p>
            <p> {dayjs().format("DD MMM YYYY, HH:mm")} </p>
          </div>
          <div className="flex flex-row">
            <p className="text-default-secondary w-1/2"> Total Amount:</p>
            <p className="font-bold">
              ${" "}
              {CurrencyFormat(
                parseFloat(data.invoiceAmount ?? "0") +
                  parseFloat(data.tax ?? "0")
              )}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-b py-4 border-[#E0E0E0]">
        <p className="text-lg">
          {" "}
          This invoice is for the billing period{" "}
          {dayjs
            .utc(invoiceDetail?.data?.body?.data?.billingPeriodFrom)
            .format("MMMM DD")}{" "}
          -{" "}
          {dayjs
            .utc(invoiceDetail?.data?.body?.data?.billingPeriodTo)
            .format("MMMM DD, YYYY")}
          .
        </p>
        <p>
          {" "}
          Bill Payable Period: {dayjs().format("DD MMM YYYY")} -{" "}
          {dayjs().add(15, "days").format("DD MMM YYYY")}.{" "}
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden">
        <div className="bg-[#BCCEF7]  flex flex-row">
          <p className="w-1/2 border-r border-[#C6C6C6] p-4"> Description </p>
          <p className="w-1/2 p-4"> Amount </p>
        </div>
        <div className="bg-[#FFF7B9]   flex flex-row text-lg">
          <p className="w-1/2 border-r border-[#C6C6C6] p-4">
            {" "}
            One Site Blog Server Fee{" "}
          </p>
          <p className="w-1/2 p-4">
            {" "}
            $
            {CurrencyFormat(
              parseFloat(data.invoiceAmount ?? "0") +
                parseFloat(data.tax ?? "0")
            ) ?? "0"}{" "}
          </p>
        </div>
        <div className="bg-white flex flex-row ">
          <p className="w-1/2 border-r border-[#C6C6C6] p-4"> Charges </p>
          <p className="w-1/2 p-4">
            {" "}
            ${CurrencyFormat(parseFloat(data.invoiceAmount ?? "0")) ?? "0"}{" "}
          </p>
        </div>
        <div className="bg-white   flex flex-row ">
          <p className="w-1/2 border-r border-[#C6C6C6] p-4"> Tax </p>
          <p className="w-1/2 p-4">
            {" "}
            ${CurrencyFormat(parseFloat(data.tax ?? "0")) ?? "0"}{" "}
          </p>
        </div>
        <div className="bg-[#616F8F]   flex flex-row text-white">
          <p className="w-1/2 border-r border-[#C6C6C6] p-4"> Total </p>
          <p className="w-1/2 p-4">
            {" "}
            $
            {CurrencyFormat(
              parseFloat(data.invoiceAmount ?? "0") +
                parseFloat(data.tax ?? "0")
            ) ?? "0"}{" "}
          </p>
        </div>
      </div>

      <div className="py-6 space-y-2">
        <p className="font-bold pb-2"> Customer Details </p>

        <div className="flex flex-row">
          <p className="text-[#2E2E2E] w-1/2 text-sm"> Customer Name: </p>
          <p className="text-[#1A1A1A]">
            {" "}
            {invoiceUserDetail?.data?.body?.data?.OneSiteUser.username}{" "}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="text-[#2E2E2E] w-1/2 text-sm truncate">
            {" "}
            Customer Email:{" "}
          </p>
          <p className="text-[#1A1A1A]">
            {" "}
            {invoiceUserDetail?.data?.body?.data?.OneSiteUser.email}{" "}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="text-[#2E2E2E] w-1/2 text-sm"> Blog Name: </p>
          <p className="text-[#1A1A1A]">
            {invoiceUserDetail?.data?.body?.data?.BlogNameAndLogo[0]?.name ??
              "-"}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="text-[#2E2E2E] w-1/2 text-sm"> Blog Domain: </p>
          <p className="text-primary">
            {" "}
            {!!invoiceUserDetail?.data?.body?.data?.blogDomain
              ? invoiceUserDetail?.data?.body?.data?.blogDomain
              : "-"}{" "}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="text-[#2E2E2E] w-1/2 text-sm"> Preview Domain: </p>
          <p className="text-primary">
            {" "}
            {!!invoiceUserDetail?.data?.body?.data?.previewDomain
              ? invoiceUserDetail?.data?.body?.data?.previewDomain
              : "-"}{" "}
          </p>
        </div>
      </div>

      <div className="py-6 space-y-2">
        <p className="font-bold pb-2"> Store’s Server Specifications </p>

        <div className="flex flex-row">
          <p className="text-[#2E2E2E] w-1/2 text-sm"> CPU: </p>
          <p className="text-[#1A1A1A]"> {data.CPU} </p>
        </div>
        <div className="flex flex-row">
          <p className="text-[#2E2E2E] w-1/2 text-sm"> Storage: </p>
          <p className="text-[#1A1A1A]"> {data.Storage} gb </p>
        </div>
        <div className="flex flex-row">
          <p className="text-[#2E2E2E] w-1/2 text-sm"> RAM (Memory): </p>
          <p className="text-[#1A1A1A]"> {data.RAM} gb </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
