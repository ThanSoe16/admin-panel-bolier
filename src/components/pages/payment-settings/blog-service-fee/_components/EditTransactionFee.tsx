"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  TransactionFeeData,
  UpdateTransactionFeeRequest,
  updateTransactionFeeSchema,
} from "@/features/payment-settings/transaction-fee/types";
import { useUpdateTransactionFee } from "@/features/payment-settings/transaction-fee/servicex/mutations";
import TransactionFeeForm from "./TransactionFeeForm";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  data: TransactionFeeData;
}

const EditTransactionFee: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const updateMethod = useUpdateTransactionFee();

  const defaultValues: UpdateTransactionFeeRequest = {
    id: data.id,
    Status: data.Status,
    TrxType: data.trxFeeType,
    amount: data.trxFee.toString(),
  };
  const form = useForm<UpdateTransactionFeeRequest>({
    resolver: zodResolver(updateTransactionFeeSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdateTransactionFeeRequest) => {
    updateMethod.mutateAsync(data).then((res) => handleClose());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogTitle> Edit Transaction Fee </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <TransactionFeeForm
              form={form}
              handleClose={handleClose}
              mode="update"
              isLoading={updateMethod.isPending}
              data={data}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionFee;
