import { Input } from "@/components/ui/input";
import { Box, Flex } from "@radix-ui/themes";
import { Loading } from "../loading";
import { useFileUpload } from "@/features/base/services/mutations";
import { Plus, X } from "lucide-react";
import { cleanAndRenameFile } from "@/utils/cleanAndRenameFile";

const ButtonImagePicker = ({
  imageURL,
  name,
  setName,
  setImageURL,
  setImageID,
  className,
  type,
  maxFileInKb,
  width,
  height,
  limitations,
  id = "file-picker",
  disabled = false,
}: {
  imageURL: string;
  name?: string;
  setName: (value: string) => void;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  setImageID: (value: string) => void;
  className?: string;
  type?: string[];
  maxFileInKb?: number;
  width?: number;
  height?: number;
  limitations?: React.ReactNode;
  id?: string;
  disabled?: boolean;
}) => {
  const photoUpload = useFileUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
    if (!file) return;
    file = cleanAndRenameFile(file);
    const allowedFormats = type;
    if (allowedFormats && !allowedFormats.includes(file.type)) {
      alert("Only .jpg, .jpeg, and .png files are supported.");
      return;
    }

    const maxSize = maxFileInKb ? maxFileInKb * 1024 : 0;
    if (maxSize && file.size > maxSize) {
      alert("File size must be less than 500 KB.");
      return;
    }
    if (width && height) {
      const img = document.createElement("img");
      const objectURL = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 500 || img.height !== 500) {
          alert("Image dimensions must be exactly 500 x 500 px.");
          URL.revokeObjectURL(objectURL);
          return;
        }

        URL.revokeObjectURL(objectURL);
      };
      img.src = objectURL;
    }
    photoUpload.mutateAsync({ file: file }).then((res) => {
      setImageURL(res?.body?.data?.url ?? "");
      setImageID(res?.body?.data?.id ?? "");
      setName(res?.body?.data?.name ?? "");
    });
  };

  return (
    <div>
      <Input
        type="file"
        accept=".png, .jpg, .jpeg, .svg"
        className="hidden"
        onChange={handleFileChange}
        id={id ?? "file-picker"}
        disabled={disabled}
      />

      <Flex className="space-x-4  relative" align="center">
        <Box
        // className="bg-red-500"
        >
          <label htmlFor={id ?? "file-picker"}>
            {photoUpload.isPending ? (
              <div className="pt-8">
                <Loading />
              </div>
            ) : imageURL ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="w-full h-full cursor-pointer "
              >
                <img
                  src={imageURL}
                  alt="Selected logo"
                  className="object-contain cursor-pointer rounded-lg h-[40px] w-[40px]"
                />
              </Flex>
            ) : (
              <Flex
                justify="center"
                align="center"
                className="w-full h-full cursor-pointer bg-primary rounded-xl px-4 py-3 gap-2"
              >
                <Plus className="text-background" />
                <div className="text-sm text-background">Upload Icon</div>
              </Flex>
            )}
          </label>
        </Box>
        {imageURL && name && <div>{name}</div>}
        {!imageURL && (
          <div className="max-w-[450px] text-xs text-default-secondary">
            {limitations}
          </div>
        )}
        {imageURL && (
          <X onClick={() => setImageURL("")} className="absolute right-0" />
        )}
      </Flex>
    </div>
  );
};

export default ButtonImagePicker;
