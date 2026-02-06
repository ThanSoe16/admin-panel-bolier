"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Info } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import {
  CreatePaymentAccountRequest,
  createPaymentAccountSchema,
} from "@/features/payment-settings/payment-accounts/types";
import AccountForm from "./AccountForm";
import { useCreatePaymentAccount } from "@/features/payment-settings/payment-accounts/services/mutation";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  total: number;
}

const CreateAccount: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  total,
}) => {
  const createAccount = useCreatePaymentAccount();
  const defaultValues: CreatePaymentAccountRequest = {
    name: "",
    number: "",
    paymentMethodId: "",
    Status: "ACTIVE",
  };
  const form = useForm<CreatePaymentAccountRequest>({
    resolver: zodResolver(createPaymentAccountSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: CreatePaymentAccountRequest) => {
    createAccount.mutateAsync(data).then((res) => handleClose());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle> Create New </DialogTitle>
        <Flex className="border-l-4 border-primary bg-secondary px-4 py-2 text-sm gap-2">
          <Info className="w-4 h-4 text-primary mt-[2px]" />
          <p>
            This payment accounts will be specified as{" "}
            <span className="font-medium">Auto-payment </span> account.
          </p>
        </Flex>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <AccountForm
              form={form}
              handleClose={handleClose}
              mode="create"
              isLoading={createAccount.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccount;
