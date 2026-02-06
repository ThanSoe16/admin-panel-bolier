"use client";
import { MoneyInput } from "@/components/shared/base/MoneyInput";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MonthPicker from "@/components/ui/month-picker";
import {
  CreateInvoiceRequest,
  createInvoiceSchema,
} from "@/features/invoice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateInvoice } from "@/features/invoice/services/mutations";
import Details from "./PreviewDetails";
import UserBlogInput from "./UserBlogInput";
import { CloudOff } from "lucide-react";

const CreateInvoiceForm = ({ invoiceId }: { invoiceId: string }) => {
  const router = useRouter();

  const createInvoice = useCreateInvoice();

  const [preview, setPreview] = useQueryState(
    "preview",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const form = useForm<CreateInvoiceRequest>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      invoiceNumber: invoiceId || "",
      saveSpecification: true,
    },
    mode: "onChange",
  });

  const submit = async (data: CreateInvoiceRequest) => {
    const updatedData: CreateInvoiceRequest = {
      ...data,
      invoiceStatus: "PAID",
    };
    createInvoice.mutateAsync(updatedData).then((res) => router.back());
  };

  const handlerDraft = async () => {
    const updatedData: CreateInvoiceRequest = {
      ...form.getValues(),
      invoiceStatus: "PENDING",
    };

    createInvoice.mutateAsync(updatedData).then((res) => router.back());
  };

  useEffect(() => {
    if (!form.watch("invoiceAmount")) {
      setPreview(false);
    }
  }, []);
  return (
    <div>
      <PageBreadcrumb
        enableBack={!preview}
        links={
          preview
            ? [
                { label: "Create Invoice", href: "/invoice/create" },
                { label: "Preview", href: "#" },
              ]
            : [{ label: "Create Invoice", href: "/invoice/create" }]
        }
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="flex flex-col gap-6 pb-6">
            {preview ? (
              <div className="mt-6">
                <Details data={form.getValues()} />
              </div>
            ) : (
              <div>
                <div className="mt-6">
                  <PageTitle> Search User & Blog</PageTitle>
                  <p className="mb-2">
                    {" "}
                    Search by blog name, domain or username{" "}
                  </p>
                  <UserBlogInput form={form} />
                </div>

                <div className="pt-4">
                  <PageTitle> Invoice Date & Amount </PageTitle>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="invoiceNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Invoice ID"
                              {...field}
                              disabled
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="invoiceFor"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <MonthPicker
                              enableMonth
                              date={field.value ? new Date(field.value) : null}
                              onChange={(date) => {
                                field.onChange(date?.toString());
                              }}
                              className="w-full h-12"
                              placeholder="Invoice For"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="invoiceAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <MoneyInput
                              placeholder="Amount"
                              value={field.value}
                              setValue={field.onChange}
                              postfix="$"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tax"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <MoneyInput
                              placeholder="Tax"
                              value={field.value}
                              setValue={field.onChange}
                              postfix="$"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <PageTitle> Server Specifications </PageTitle>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="CPU"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="CPU"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Storage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <MoneyInput
                              placeholder="Storage"
                              value={field.value}
                              setValue={field.onChange}
                              postfix="gb"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="RAM"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <MoneyInput
                              placeholder="RAM (Memory)"
                              value={field.value}
                              setValue={field.onChange}
                              postfix="gb"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="saveSpecification"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value}
                              id="saveSpecs"
                              onCheckedChange={field.onChange}
                            />
                            <Label
                              htmlFor={"saveSpecs"}
                              className="text-default-secondary"
                            >
                              {`Save store’s sever specifications for next invoices`}
                            </Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-row gap-4 justify-end items-center">
              {preview && (
                <Button
                  loading={createInvoice.isPending}
                  variant="outline"
                  className=" bg-brand-secondary text-primary"
                  type="button"
                  onClick={handlerDraft}
                >
                  <CloudOff />
                  Draft Invoice
                </Button>
              )}
              <Button
                variant="outline"
                className="text-text-primary "
                type="button"
                onClick={() => {
                  if (preview) {
                    setPreview(false);
                  } else {
                    router.back();
                  }
                }}
              >
                Cancel
              </Button>
              {!preview && (
                <Button
                  addDoneIcon
                  type="button"
                  onClick={() => setPreview(true)}
                  disabled={!form.formState.isValid}
                >
                  Preview
                </Button>
              )}
              {preview && (
                <Button loading={createInvoice.isPending} addDoneIcon>
                  Confirm and Send
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateInvoiceForm;
