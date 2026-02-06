import { objectToQueryString } from "@/utils/objectToQueryString";
import {
  CreateInvoiceRequest,
  InvoiceData,
  InvoiceFilter,
  UpdateInvoiceRequest,
  UserInvoiceData,
} from "../types";
import appAxios from "@/lib/appAxios";
import { APIResponse } from "@/features/base/types";
import dayjs from "dayjs";

const invoiceApiService = {
  getInvoices: async (filters: InvoiceFilter) => {
    const params = objectToQueryString(filters);
    const response = await appAxios.get<APIResponse<InvoiceData[]>>(
      `/invoice/invoice-list?${params}`
    );
    return response.data;
  },
  getInvoiceNumber: async () => {
    const response = await appAxios.get<APIResponse<string>>(
      `/invoice/invoice-number`
    );
    return response.data;
  },
  getInvoiceUserList: async (filters: InvoiceFilter) => {
    const params = objectToQueryString(filters);
    const response = await appAxios.get<APIResponse<UserInvoiceData[]>>(
      `/invoice/invoice-users-list?${params}`
    );
    return response.data;
  },

  getInvoiceDetail: async (id: string) => {
    const response = await appAxios.get<APIResponse<InvoiceData>>(
      `/invoice/${id}`
    );
    return response.data;
  },
  getInvoiceUserDetail: async (id: string) => {
    const response = await appAxios.get<APIResponse<UserInvoiceData>>(
      `/invoice/blog-detail/${id}`
    );
    return response.data;
  },
  getInvoiceUserSpecification: async (id: string) => {
    const response = await appAxios.get<APIResponse<InvoiceData>>(
      `/invoice/blog/${id}`
    );
    return response.data;
  },
  createInvoice: async (data: CreateInvoiceRequest) => {
    const updatedData = {
      oneSiteUserId: data.oneSiteUserId,
      merchantBlogId: data.merchantBlogId,
      invoiceFor: dayjs(data.invoiceFor).format("YYYY-MM"),
      invoiceAmount: parseFloat(data.invoiceAmount),
      CPU: data.CPU,
      Storage: parseFloat(data.Storage),
      RAM: parseFloat(data.RAM),
      tax: parseFloat(data.tax),
      invoiceNumber: data.invoiceNumber,
      saveSpecification: data.saveSpecification,
      invoiceStatus: data.invoiceStatus || "PENDING", // Default to PENDING if not provided
    };

    const response = await appAxios.post<APIResponse<InvoiceData>>(
      `/invoice/create`,
      updatedData
    );
    return response.data;
  },
  updateInvoice: async (data: UpdateInvoiceRequest) => {
    const updatedData = {
      oneSiteUserId: data.oneSiteUserId,
      merchantBlogId: data.merchantBlogId,
      invoiceFor: dayjs(data.invoiceFor).format("YYYY-MM"),
      invoiceAmount: parseFloat(data.invoiceAmount),
      CPU: data.CPU,
      Storage: parseFloat(data.Storage),
      RAM: parseFloat(data.RAM),
      tax: parseFloat(data.tax),
      invoiceNumber: data.invoiceNumber,
      saveSpecification: data.saveSpecification,
      invoiceStatus: data.invoiceStatus || "PENDING", // Default to PENDING if not provided
    };

    const response = await appAxios.put<APIResponse<InvoiceData>>(
      `/invoice/edit/${data.id}`,
      updatedData
    );
    return response.data;
  },
  getUserInvoices: async (filters: InvoiceFilter) => {
    const { userId, ...rest } = filters;
    const params = objectToQueryString(rest);
    const response = await appAxios.get<APIResponse<InvoiceData[]>>(
      `/invoice/user/${userId}?${params}`
    );
    return response.data;
  },
};
export default invoiceApiService;
