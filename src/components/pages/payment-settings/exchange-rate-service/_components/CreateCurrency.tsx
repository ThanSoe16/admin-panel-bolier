"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CreateExchangeRateRequest,
  createExchangeRateSchema,
} from "@/features/payment-settings/exchange-rate-service/types";
import CurrencyForm from "./CurrencyForm";
import { useCreateExchangeRate } from "@/features/payment-settings/exchange-rate-service/services/mutations";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  total: number;
}

const CreateCurrency: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  total,
}) => {
  const createExchangeRateMutation = useCreateExchangeRate();
  const defaultValues: CreateExchangeRateRequest = {
    fileId: "",
    baseCurrencyId: "",
    Status: "ACTIVE",
    exchangeRate: "1",
    exchangeServiceFee: "1",
  };
  const form = useForm<CreateExchangeRateRequest>({
    resolver: zodResolver(createExchangeRateSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: CreateExchangeRateRequest) => {
    createExchangeRateMutation.mutateAsync(data).then(() => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle> Create New </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <CurrencyForm
              form={form}
              handleClose={handleClose}
              mode="create"
              isLoading={false}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCurrency;
