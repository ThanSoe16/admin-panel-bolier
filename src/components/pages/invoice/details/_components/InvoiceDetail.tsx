"use client";
import React from "react";
import Image from "next/image";
import { CreateInvoiceRequest, InvoiceData } from "@/features/invoice/types";
import dayjs from "dayjs";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { useGetInvoiceUserDetail } from "@/features/invoice/services/queries";
import { cn } from "@/lib/utils";
import { useCreateInvoice } from "@/features/invoice/services/mutations";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import { useGetContactUs } from "@/features/settings/contact-us/services/queries";
import { Loading } from "@/components/shared/loading";

interface Props {
  data: InvoiceData;
  isDetails?: boolean;
}

const InvoiceDetailForm: React.FC<Props> = ({ data, isDetails = false }) => {
  const router = useRouter();
  const contactUsData = useGetContactUs();
  const invoiceUserDetail = useGetInvoiceUserDetail(data.merchantBlogId);
  const createInvoice = useCreateInvoice();

  const handlerSave = async () => {
    const updatedData: CreateInvoiceRequest = {
      invoiceNumber: data.invoiceNumber,
      oneSiteUserId: data.oneSiteUserId,
      merchantBlogId: data.merchantBlogId,
      invoiceFor: dayjs(data.invoiceFor).format("YYYY-MM"),
      invoiceAmount: data.invoiceAmount.toString() ?? "0",
      CPU: data.CPU,
      Storage: data.Storage.toString() ?? "",
      RAM: data.RAM.toString() ?? "",
      tax: data.tax.toString() ?? "",
      saveSpecification: data.saveSpecification,
      invoiceStatus: "PAID",
    };

    createInvoice.mutateAsync(updatedData).then((res) => router.back());
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "w-full rounded-xl p-4 text-[#1A1A1A]",
          data.InvoiceStatus === "PAID"
            ? "bg-[#C5F0B0] "
            : data.InvoiceStatus === "UNPAID"
            ? "bg-[#FFF4BA] "
            : data.InvoiceStatus === "PENDING"
            ? "bg-gray-300"
            : "bg-[#FFE8E8] "
        )}
      >
        {" "}
        Payment Status:{" "}
        <b
          className={cn(
            "",
            data.InvoiceStatus === "PAID"
              ? " text-[#319300]"
              : data.InvoiceStatus === "UNPAID"
              ? " text-[#8C7813]"
              : data.InvoiceStatus === "PENDING"
              ? "text-black"
              : " text-[#FF1A1A]"
          )}
        >
          {" "}
          {data.InvoiceStatus == "PENDING" ? "Draft" : data.InvoiceStatus}{" "}
        </b>{" "}
      </div>
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
                  {contactUsData?.data?.body?.data?.phoneNumbers.join(
                    ", "
                  )}{" "}
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
                Invoice Issued on:{" "}
              </p>
              <p> {dayjs(data.createdAt).format("DD MMM YYYY, HH:mm")} </p>
            </div>
            <div className="flex flex-row">
              <p className="text-default-secondary w-1/2"> Total Amount: </p>
              <p className="font-bold">
                {" "}
                $ {CurrencyFormat(data.invoiceAmount + data.tax)}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-b py-4 border-[#E0E0E0]">
          <p className="text-lg">
            {" "}
            This invoice is for the billing period{" "}
            {dayjs.utc(data?.billingPeriodFrom).format("MMMM DD ")} - {}
            {dayjs.utc(data?.billingPeriodTo).format("MMMM DD, YYYY")}.
          </p>
          <p>
            {" "}
            Bill Payable Period:{" "}
            {dayjs.utc(data.payablePeriodFrom).format("DD MMM YYYY")} -{" "}
            {dayjs.utc(data.payablePeriodTo).format("DD MMM YYYY")}.{" "}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden">
          <div className="bg-[#BCCEF7]  flex flex-row">
            <p className="w-1/2 border-r border-[#C6C6C6] p-4"> Description </p>
            <p className="w-1/2 p-4"> Amount </p>
          </div>
          <div className="bg-[#FFF7B9] flex flex-row text-lg">
            <p className="w-1/2 border-r border-[#C6C6C6] p-4">
              {" "}
              One Site Blog Server Fee{" "}
            </p>
            <p className="w-1/2 p-4">
              {" "}
              ${CurrencyFormat(data.invoiceAmount + data.tax) ?? "0"}{" "}
            </p>
          </div>
          <div className="bg-white   flex flex-row ">
            <p className="w-1/2 border-r border-[#C6C6C6] p-4"> Charges </p>
            <p className="w-1/2 p-4">
              {" "}
              ${CurrencyFormat(data.invoiceAmount) ?? "0"}{" "}
            </p>
          </div>
          <div className="bg-white   flex flex-row ">
            <p className="w-1/2 border-r border-[#C6C6C6] p-4"> Tax </p>
            <p className="w-1/2 p-4"> ${CurrencyFormat(data.tax) ?? "0"} </p>
          </div>
          <div className="bg-[#616F8F]   flex flex-row text-white">
            <p className="w-1/2 border-r border-[#C6C6C6] p-4"> Total </p>
            <p className="w-1/2 p-4">
              {" "}
              ${CurrencyFormat(data.invoiceAmount + data.tax) ?? "0"}{" "}
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
            <p className="text-[#2E2E2E] w-1/2 text-sm"> Customer Email: </p>
            <p className="text-[#1A1A1A] w-1/2">
              {" "}
              {invoiceUserDetail?.data?.body?.data?.OneSiteUser.email}{" "}
            </p>
          </div>
          <div className="flex flex-row">
            <p className="text-[#2E2E2E] w-1/2 text-sm"> Blog Name: </p>
            <p className="text-[#1A1A1A] w-1/2">
              {invoiceUserDetail?.data?.body?.data?.BlogNameAndLogo[0]?.name ??
                "-"}
            </p>
          </div>
          <div className="flex flex-row">
            <p className="text-[#2E2E2E] w-1/2 text-sm"> Blog Domain: </p>
            <p className="text-primary w-1/2">
              {" "}
              {invoiceUserDetail?.data?.body?.data?.blogDomain ?? "-"}{" "}
            </p>
          </div>
          <div className="flex flex-row">
            <p className="text-[#2E2E2E] w-1/2 text-sm"> Preview Domain: </p>
            <p className="text-primary w-1/2">
              {" "}
              {invoiceUserDetail?.data?.body?.data?.previewDomain ?? "-"}{" "}
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
      {data.InvoiceStatus == "PENDING" && (
        <Flex justify="end" className="mt-4 gap-3">
          {data.InvoiceStatus == "PENDING" && (
            <Button
              variant={"outline"}
              className="px-5"
              type="button"
              onClick={() => router.push(`/invoice/${data.id}/update`)}
            >
              Edit
            </Button>
          )}
          <Button
            loading={createInvoice.isPending}
            type="button"
            onClick={handlerSave}
            addDoneIcon
          >
            Confirm and Send
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default InvoiceDetailForm;
