"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Info } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import {
  PaymentAccountData,
  UpdatePaymentAccountRequest,
  updatePaymentAccountSchema,
} from "@/features/payment-settings/payment-accounts/types";
import AccountForm from "./AccountForm";
import { useUpdatePaymentAccount } from "@/features/payment-settings/payment-accounts/services/mutation";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  data: PaymentAccountData;
}

const EditAccount: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const updateAccount = useUpdatePaymentAccount();
  const defaultValues: UpdatePaymentAccountRequest = {
    id: data.id,
    name: data.name,
    number: data.number,
    paymentMethodId: data.MembershipPaymentMethod.id,
    Status: data.Status,
  };
  const form = useForm<UpdatePaymentAccountRequest>({
    resolver: zodResolver(updatePaymentAccountSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdatePaymentAccountRequest) => {
    updateAccount.mutateAsync(data).then((res) => handleClose());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle> Edit Payment Account </DialogTitle>
        <Flex
          align={"center"}
          className="border-l-4 border-primary bg-secondary px-4 py-2 text-sm gap-2"
        >
          <Info className="w-4 h-4 text-primary" />
          This payment accounts will be specified as <b>Auto-payment</b>
          account.
        </Flex>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <AccountForm
              form={form}
              handleClose={handleClose}
              mode="update"
              isLoading={updateAccount.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccount;
