"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import { toast } from "sonner";
import { useFileUpload } from "@/features/base/services/mutations";
import { cleanAndRenameFile } from "@/utils/cleanAndRenameFile";

const MAX_FILE_SIZE = 500 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

interface FlagUploadProps {
  onChange: (fileId: string) => void;
  defaultUrl?: string;
}

const FlagUpload: React.FC<FlagUploadProps> = ({
  onChange,
  defaultUrl = null,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultUrl);
  const { mutateAsync: uploadFile } = useFileUpload();

  const handleRemoveImage = () => {
    setPreview(null);
    onChange("");
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];

    if (!file) return;
    file = cleanAndRenameFile(file);
    if (ACCEPTED_IMAGE_TYPES && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Only .jpg, .jpeg, and .png files are supported.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 500 KB.");
      return;
    }

    const response = await uploadFile({ file: file });
    if (response?.meta?.success) {
      onChange(response.body?.data?.id ?? "");
      setPreview(response?.body?.data?.url ?? "");
    } else {
      toast.error("Failed to upload file.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label htmlFor="icon" className="cursor-pointer">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              className="h-[82px] !w-[82px] rounded-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <Image
              src="/components/upload.svg"
              alt="Upload Icon"
              width={100}
              height={100}
              className="min-h-[82px] min-w-[82px] rounded-lg"
            />
          )}
        </Label>
        <div className="flex flex-col gap-2 flex-1">
          <Label className="normal-text">Upload Icon</Label>
          <p className="text-xs text-default-secondary md:text-sm">
            Acceptable formats: jpg, png only. Max file size: 500 KB
            <br />
            Recommend: 1:1 (Ratio Size)
          </p>
        </div>
        {preview && (
          <TableBaseButton onClick={handleRemoveImage} uiType="block">
            {" "}
            Delete
          </TableBaseButton>
        )}
      </div>

      <Input
        id="icon"
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={onFileChange}
        key={preview || "default"}
      />
    </div>
  );
};

export default FlagUpload;
