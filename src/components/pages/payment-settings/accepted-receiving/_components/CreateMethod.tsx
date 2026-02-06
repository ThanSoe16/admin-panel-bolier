"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CreateReceivingPaymentRequest,
  createReceivingPaymentSchema,
} from "@/features/payment-settings/accepted-receiving/types";
import MethodForm from "./MethodForm";
import { useCreateAcceptedReceivingPayment } from "@/features/payment-settings/accepted-receiving/services/mutations";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateMethod: React.FC<CreateModalProps> = ({ open, handleClose }) => {
  const createMethod = useCreateAcceptedReceivingPayment();
  const defaultValues: CreateReceivingPaymentRequest = {
    fileId: "",
    name: "",
    Status: "ACTIVE",
    AcceptedAccountType: "PAY",
    isQRRequired: false,
  };
  const form = useForm<CreateReceivingPaymentRequest>({
    resolver: zodResolver(createReceivingPaymentSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: CreateReceivingPaymentRequest) => {
    createMethod.mutateAsync(data).then(() => {
      handleClose();
      form.reset();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogTitle> Create New </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
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
