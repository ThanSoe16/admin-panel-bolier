import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Box, Flex } from "@radix-ui/themes";
import { Loading } from "../loading";
import { useFileUpload } from "@/features/base/services/mutations";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { cleanAndRenameFile } from "@/utils/cleanAndRenameFile";

const ImagePicker = ({
  defaultUrl,
  onChange,
  uniqueKey = "image-uploader",
  maxFileSizeInKb,
  className,
  closeClassName,
  acceptFiles,
}: {
  defaultUrl?: string | undefined;
  onChange: ({ url, fileId }: { url: string; fileId: string }) => void;
  acceptFiles?: string;
  maxFileSizeInKb?: number;
  uniqueKey?: string;
  className?: string;
  closeClassName?: string;
}) => {
  const { mutateAsync: uploadFile, isPending } = useFileUpload();
  const [url, setUrl] = useState(defaultUrl ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let file = event.target.files?.[0];
      if (!file) return;
      file = cleanAndRenameFile(file);
      if (maxFileSizeInKb) {
        const maxSize = maxFileSizeInKb ? maxFileSizeInKb * 1024 : 0;
        if (maxSize && file.size > maxSize) {
          alert(`File size must be less than ${maxFileSizeInKb} KB.`);
          return;
        }
      }
      uploadFile({ file: file }).then((res) => {
        setUrl(res?.body?.data?.url ?? "");
        onChange({
          url: res?.body?.data?.url ?? "",
          fileId: res?.body?.data?.id ?? "",
        });
        if (fileInputRef?.current) {
          fileInputRef.current.value = res?.body?.data?.id ?? "";
        }
      });
    } catch (error) {}
  };

  return (
    <div>
      <Input
        type="file"
        accept={acceptFiles}
        className="hidden"
        onChange={handleFileChange}
        id={uniqueKey ?? "file-picker"}
      />

      <Flex className="space-x-4 relative" align="center">
        <Box
          // className="bg-red-500"
          className={cn(
            "w-[150px] h-[150px] overflow-hidden",
            !url
              ? " bg-blueLight-lightActive border-dashed border-primary"
              : "border-dashed border-primary",
            className,
            "border rounded-2xl text-text-secondary bg-brand-secondary"
          )}
        >
          {url && (
            <Flex
              align="center"
              justify="center"
              className={cn(
                "absolute top-[-7px] left-[135px] bg-gray-500 rounded-full cursor-pointer p-1",
                closeClassName
              )}
              onClick={(e) => {
                e.stopPropagation();
                setUrl("");
                onChange({ url: "", fileId: "" });
              }}
            >
              <X className="text-white w-4 h-4" />
            </Flex>
          )}
          <label htmlFor={uniqueKey ?? "file-picker"}>
            {isPending ? (
              <div className="pt-8">
                <Loading />
              </div>
            ) : url ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="w-full h-full cursor-pointer "
              >
                <img
                  src={url}
                  alt="Selected logo"
                  className="w-full h-full object-contain cursor-pointer rounded-2xl"
                />
              </Flex>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="w-full h-full cursor-pointer"
              >
                <ImagePlus className="w-9 h-9 text-primary" />
              </Flex>
            )}
          </label>
        </Box>
      </Flex>
    </div>
  );
};

export default ImagePicker;
