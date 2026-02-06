import { useMutation } from "@tanstack/react-query";
import baseApiService from "./api";
import { toast } from "sonner";
import {
  APIResponse,
  ErrorResponse,
  FileUploadRequest,
  FileUploadResponse,
} from "../types";
import { AxiosError } from "axios";

export const useFileUpload = () => {
  return useMutation<
    APIResponse<FileUploadResponse>,
    AxiosError<ErrorResponse>,
    FileUploadRequest
  >({
    mutationFn: (data: FileUploadRequest) =>
      baseApiService.fileUpload(data.file),

    onMutate: () => {},
    onError: (error: any) => {
      // console.log("error", error);
      toast.error(error?.response?.data?.meta?.message);
    },
    onSuccess: async (success) => {
      // console.log("success", success);
    },
  });
};
