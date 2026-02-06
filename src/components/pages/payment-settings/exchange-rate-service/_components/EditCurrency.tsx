"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  ExchangeRateData,
  UpdateExchangeRateRequest,
  updateExchangeRateSchema,
} from "@/features/payment-settings/exchange-rate-service/types";
import CurrencyForm from "./CurrencyForm";
import { Flex } from "@radix-ui/themes";
import { Info } from "lucide-react";
import { useUpdateExchangeRate } from "@/features/payment-settings/exchange-rate-service/services/mutations";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  data: ExchangeRateData;
}

const EditCurrency: React.FC<CreateModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const updateExchangeRate = useUpdateExchangeRate();
  const defaultValues: UpdateExchangeRateRequest = {
    id: data.id,
    baseCurrencyId: data.baseCurrencyId,
    Status: data.Status,
    exchangeRate: data.exchangeRate.toString(),
    exchangeServiceFee: data.exchangeServiceFee.toString(),
  };
  const form = useForm<UpdateExchangeRateRequest>({
    resolver: zodResolver(updateExchangeRateSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdateExchangeRateRequest) => {
    updateExchangeRate.mutateAsync(data).then(() => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle> Edit Currency </DialogTitle>
        <Flex
          align={"center"}
          className="border-l-4 border-primary bg-secondary px-4 py-2 text-sm gap-2"
        >
          <Info className="w-4 h-4 text-primary" />
          Based currency is <b>$</b>.
        </Flex>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <CurrencyForm
              form={form}
              handleClose={handleClose}
              mode="update"
              isLoading={false}
              defaultImage={data.File?.url ?? ""}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCurrency;
