"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  PaymentMethodData,
  UpdatePaymentMethodRequest,
  updatePaymentMethodSchema,
} from "@/features/payment-settings/payment-methods/types";
import MethodForm from "./MethodForm";
import { Info } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import { useUpdatePaymentMethod } from "@/features/payment-settings/payment-methods/services/mutation";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  data: PaymentMethodData;
}

const EditMethod: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const updateMethod = useUpdatePaymentMethod();

  const defaultValues: UpdatePaymentMethodRequest = {
    id: data.id,
    fileId: data.fileId,
    paymentKey: data.paymentKey,
    name: data.name,
    Status: data.Status,
    PaymentChannels: data.PaymentMethodChannels,
  };
  const form = useForm<UpdatePaymentMethodRequest>({
    resolver: zodResolver(updatePaymentMethodSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdatePaymentMethodRequest) => {
    updateMethod.mutateAsync(data).then((res) => handleClose());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogTitle> Edit Payment Method </DialogTitle>
        <Flex
          align={"center"}
          className="border-l-4 border-primary bg-secondary px-4 py-2 text-sm gap-2"
        >
          <Info className="w-4 h-4 text-primary" />
          All payment method will be specified as <b>Auto-payment</b>.
        </Flex>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <MethodForm
              form={form}
              handleClose={handleClose}
              mode="update"
              isLoading={updateMethod.isPending}
              defaultImage={data.File?.url ?? ""}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMethod;
