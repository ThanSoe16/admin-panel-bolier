import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Box, Flex } from '@radix-ui/themes';
import { Loading } from '../base/loading';
import { useFileUpload } from '@/features/base/services/mutations';
import { Camera } from 'lucide-react';
import { cleanAndRenameFile } from '@/utils/cleanAndRenameFile';

const ProfilePicker = ({
  imageURL,
  setImageURL,
  setImageID,
  className,
  type,
  maxFileInKb,
  width,
  height,
  limitations,
  id = 'file-picker',
}: {
  imageURL: string;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  setImageID: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  type?: string[];
  maxFileInKb?: number;
  width?: number;
  height?: number;
  limitations?: React.ReactNode;
  id?: string;
}) => {
  const photoUpload = useFileUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
    if (!file) return;
    file = cleanAndRenameFile(file);
    const allowedFormats = type;
    if (allowedFormats && !allowedFormats.includes(file.type)) {
      alert('Only .jpg, .jpeg, and .png files are supported.');
      return;
    }

    const maxSize = maxFileInKb ? maxFileInKb * 1024 : 0;
    if (maxSize && file.size > maxSize) {
      alert('File size must be less than 500 KB.');
      return;
    }
    if (width && height) {
      const img = document.createElement('img');
      const objectURL = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 500 || img.height !== 500) {
          alert('Image dimensions must be exactly 500 x 500 px.');
          URL.revokeObjectURL(objectURL);
          return;
        }

        URL.revokeObjectURL(objectURL);
      };
      img.src = objectURL;
    }
    photoUpload.mutateAsync({ file: file }).then((res) => {
      setImageURL(res?.body?.data?.url ?? '');
      setImageID(res?.body?.data?.id ?? '');
    });
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        id={id ?? 'file-picker'}
      />

      <Flex className="space-x-4  " align="center">
        <Box
          // className="bg-red-500"
          className={cn(
            className ? className : 'w-[150px] h-[150px] relative overflow-hidden',
            !imageURL ? ' bg-blueLight-lightActive' : '',
            'border rounded-full text-text-secondary bg-brand-secondary',
          )}
        >
          <label htmlFor={id ?? 'file-picker'}>
            {photoUpload.isPending ? (
              <div className="pt-8">
                <Loading />
              </div>
            ) : imageURL ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="w-full h-full cursor-pointer rounded-full"
              >
                <img
                  src={imageURL}
                  alt="Selected logo"
                  className="w-full h-full object-cover cursor-pointer rounded-full"
                />
              </Flex>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="w-full h-full cursor-pointer"
              >
                <Camera fill="blue" className="w-9 h-9 text-white" />
              </Flex>
            )}
          </label>
        </Box>
        <div className="max-w-[230px]">{limitations}</div>
      </Flex>
    </div>
  );
};

export default ProfilePicker;
