import { useMutation, useQueryClient } from "@tanstack/react-query";
import invoiceApiService from "./api";
import { CreateInvoiceRequest, UpdateInvoiceRequest } from "../types";
import { toast } from "sonner";

export const useGetInvoiceNumber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: invoiceApiService.getInvoiceNumber,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["invoice-number"] });
    },
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInvoiceRequest) =>
      invoiceApiService.createInvoice(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateInvoiceRequest) =>
      invoiceApiService.updateInvoice(data),
    onSuccess: async (response, variable) => {
      await queryClient.invalidateQueries({ queryKey: ["invoices"] });
      await queryClient.invalidateQueries({
        queryKey: ["invoice-detail", variable.invalidId],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.meta?.message);
    },
  });
};

export const useGetInvoiceUserSpecification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      invoiceApiService.getInvoiceUserSpecification(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["invoice-user-specification"],
      });
    },
  });
};
