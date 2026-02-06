"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import MethodForm from "./MethodForm";
import { Info } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import {
  AcceptedReceivingPaymentData,
  UpdateReceivingPaymentRequest,
  updateReceivingPaymentSchema,
} from "@/features/payment-settings/accepted-receiving/types";
import { useUpdateAcceptedReceivingPayment } from "@/features/payment-settings/accepted-receiving/services/mutations";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  data: AcceptedReceivingPaymentData;
}

const EditMethod: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const updateMethod = useUpdateAcceptedReceivingPayment();

  const defaultValues: UpdateReceivingPaymentRequest = {
    id: data.id,
    fileId: data.fileId,
    name: data.name,
    Status: data.Status,
    AcceptedAccountType: data.ReceivingAccType,
    isQRRequired: data.isQRRequired,
  };
  const form = useForm<UpdateReceivingPaymentRequest>({
    resolver: zodResolver(updateReceivingPaymentSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdateReceivingPaymentRequest) => {
    updateMethod.mutateAsync(data).then((res) => {
      handleClose();
      form.reset();
    });
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
