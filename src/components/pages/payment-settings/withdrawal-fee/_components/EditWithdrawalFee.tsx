"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  UpdateTransactionFeeRequest,
  UpdateWithdrawFeeRequest,
  WithdrawFeeData,
  updateTransactionFeeSchema,
  updateWithdrawFeeSchema,
} from "@/features/payment-settings/transaction-fee/types";
import {
  useUpdateTransactionFee,
  useUpdateWithdrawFee,
} from "@/features/payment-settings/transaction-fee/servicex/mutations";
import WithdrawalFeeForm from "./WithdrawalFeeForm";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  data: WithdrawFeeData;
}

const EditWithdrawalFee: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const updateMethod = useUpdateWithdrawFee();

  const defaultValues: UpdateWithdrawFeeRequest = {
    feeType: data.feeType,
    amount: data.amount.toString(),
  };
  const form = useForm<UpdateWithdrawFeeRequest>({
    resolver: zodResolver(updateWithdrawFeeSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdateWithdrawFeeRequest) => {
    updateMethod.mutateAsync(data).then((res) => handleClose());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px]">
        <DialogTitle> Edit Withdrawal Fee </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <WithdrawalFeeForm
              form={form}
              handleClose={handleClose}
              mode="update"
              isLoading={updateMethod.isPending}
              data={defaultValues}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWithdrawalFee;
