"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CreatePaymentMethodRequest,
  createPaymentMethodSchema,
} from "@/features/payment-settings/payment-methods/types";
import MethodForm from "./MethodForm";
import { Info } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import { useCreatePaymentMethod } from "@/features/payment-settings/payment-methods/services/mutation";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  total: number;
}

const CreateMethod: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  total = 1,
}) => {
  const createMethod = useCreatePaymentMethod();

  const defaultValues: CreatePaymentMethodRequest = {
    fileId: "",
    name: "",
    paymentKey: "",
    Status: "ACTIVE",
    PaymentChannels: ["PWAAPP"],
  };
  const form = useForm<CreatePaymentMethodRequest>({
    resolver: zodResolver(createPaymentMethodSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: CreatePaymentMethodRequest) => {
    const updatedData = {
      ...data,
      paymentKey: data.name,
    };
    createMethod.mutateAsync(updatedData).then((res) => handleClose());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogTitle> Create New </DialogTitle>
        <Flex className="border-l-4 border-primary bg-secondary px-4 py-2 text-sm gap-2">
          <Info className="w-4 h-4 text-primary mt-[2px]" />
          <p>
            All payment method will be specified as{" "}
            <span className="font-medium">Auto-payment</span>.
          </p>
        </Flex>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <MethodForm
              form={form}
              handleClose={handleClose}
              mode="create"
              isLoading={createMethod.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMethod;
