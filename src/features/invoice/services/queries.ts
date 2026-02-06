import { useQuery } from "@tanstack/react-query";
import invoiceApiService from "./api";
import { InvoiceFilter } from "../types";

export const useGetInvoices = (filters: InvoiceFilter) => {
  return useQuery({
    queryKey: ["invoices", filters],
    queryFn: () => invoiceApiService.getInvoices(filters),
    refetchOnWindowFocus: false,
  });
};

export const useGetInvoiceDetail = (id: string) => {
  return useQuery({
    queryKey: ["invoice-detail", id],
    queryFn: () => invoiceApiService.getInvoiceDetail(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetInvoiceNumber = () => {
  return useQuery({
    queryKey: ["invoice-number"],
    queryFn: () => invoiceApiService.getInvoiceNumber(),
    refetchOnWindowFocus: false,
  });
};

export const useGetInvoiceUsers = (filter: InvoiceFilter) => {
  return useQuery({
    queryKey: ["invoice-users", filter],
    queryFn: () => invoiceApiService.getInvoiceUserList(filter),
    refetchOnWindowFocus: false,
  });
};

export const useGetInvoiceUserDetail = (id: string) => {
  return useQuery({
    queryKey: ["invoice-user-detail", id],
    queryFn: () => invoiceApiService.getInvoiceUserDetail(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const useGetInvoiceSpecification = (id: string) => {
  return useQuery({
    queryKey: ["invoice-user-specification", id],
    queryFn: () => invoiceApiService.getInvoiceUserSpecification(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const useGetUserInvoices = (filters: InvoiceFilter) => {
  return useQuery({
    queryKey: ["users-invoices", filters],
    queryFn: () => invoiceApiService.getUserInvoices(filters),
    refetchOnWindowFocus: false,
  });
};
