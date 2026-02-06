"use client";
import { Box, Flex } from "@radix-ui/themes";
import { Loading } from "@/components/shared/loading";
import { useFileUpload } from "@/features/base/services/mutations";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cleanAndRenameFile } from "@/utils/cleanAndRenameFile";

interface AvatarUploadProps {
  defaultUrl?: string | undefined;
  onChange: ({ url, fileId }: { url: string; fileId: string }) => void;
  width?: string;
  height?: string;
  uniqueKey?: string;
  acceptFiles?: string;
  imageSizeLimit?: {
    width: number;
    height: number;
  };
  maxFileSizeInKb?: number;
  labelText: string;
  aspectRatio?: string;
}

const TemplateImagePicker: React.FC<AvatarUploadProps> = ({
  defaultUrl,
  onChange,
  width = "120px",
  height = "120px",
  uniqueKey = "image-uploader",
  acceptFiles,
  maxFileSizeInKb,
  imageSizeLimit,
  labelText,
  aspectRatio,
}) => {
  const { mutateAsync: uploadFile, isPending } = useFileUpload();
  const [url, setUrl] = useState(defaultUrl ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      if (imageSizeLimit) {
        const img = document.createElement("img");
        const objectURL = URL.createObjectURL(file);
        img.onload = () => {
          if (
            img.width !== imageSizeLimit.width ||
            img.height !== imageSizeLimit.height
          ) {
            alert(
              `"Image dimensions must be exactly ${imageSizeLimit.width} x ${imageSizeLimit.height} px`
            );
            URL.revokeObjectURL(objectURL);
            return;
          }

          URL.revokeObjectURL(objectURL);
        };
        img.src = objectURL;
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

  // const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     const file = event.target.files?.[0];
  //     if (!file) return;
  //     onChange({
  //       fileId: new Date().toISOString(),
  //       url: URL.createObjectURL(file)
  //     })
  //     setUrl(URL.createObjectURL(file));
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }

  return (
    <div className="flex flex-col w-full justify-start items-center">
      {url ? (
        <Box className="relative">
          <Flex
            className="relative w-full bg-[#D0D8D8] flex flex-row justify-start items-start gap-4 p-2 rounded-xl"
            style={{
              width,
              height: aspectRatio ? undefined : height,
              aspectRatio: aspectRatio,
            }}
          >
            {isPending ? (
              <Box className="w-[106px] h-[106px] flex justify-center items-center">
                <Loading />
              </Box>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt="image"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                className="object-cover rounded-xl"
              />
            )}

            <Button
              className=" absolute -top-3 -right-3 rounded-full w-8 h-8 "
              type="button"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.60)",
              }}
              onClick={() => {
                setUrl("");
                onChange({
                  url: "",
                  fileId: "",
                });
                if (fileInputRef?.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </Flex>
        </Box>
      ) : (
        <Label
          style={{
            width,
            height: aspectRatio ? undefined : height,
            aspectRatio: aspectRatio,
          }}
          htmlFor={uniqueKey}
          className={`rounded-xl bg-blue-100 border border-dashed border-brand text-brand flex flex-col items-center justify-center cursor-pointer`}
        >
          <ImagePlus className="w-8 h-8" />
        </Label>
      )}

      <input
        hidden
        ref={fileInputRef}
        id={uniqueKey}
        type="file"
        accept={acceptFiles ?? "image/*"}
        onChange={handleUpload}
      />
      <div
        className="mt-1 flex flex-row items-center justify-center text-xs md:text-sm text-center"
        style={{ width: width }}
      >
        <p className="w-1/2 border-r"> {labelText} </p>
        <Label htmlFor={uniqueKey} className=" cursor-pointer text-brand w-1/2">
          Replace
        </Label>
      </div>
    </div>
  );
};

export default TemplateImagePicker;
