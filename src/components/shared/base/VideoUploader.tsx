'use client';
import { Input } from '@/components/ui/input';
import { Flex } from '@radix-ui/themes';
import { Loading } from '../loading';
import { useFileUpload } from '@/features/base/services/mutations';
import { Video, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cleanAndRenameFile } from '@/utils/cleanAndRenameFile';

interface VideoUploaderProps {
  videoURL: string;
  setVideoURL: React.Dispatch<React.SetStateAction<string>>;
  setVideoID: (value: string) => void;
  className?: string;
  limitations?: React.ReactNode;
  id?: string;
  disabled?: boolean;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  videoURL,
  setVideoURL,
  setVideoID,
  className,
  limitations,
  id = 'video-picker',
  disabled = false,
}) => {
  const videoUpload = useFileUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
    if (!file) return;
    file = cleanAndRenameFile(file);
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      alert('Please upload a video file (MP4, WebM)');
      return;
    }

    // Check file size (100MB max)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 100MB');
      return;
    }

    videoUpload.mutateAsync({ file }).then((res) => {
      setVideoURL(res?.body?.data?.url ?? '');
      setVideoID(res?.body?.data?.id ?? '');
    });
  };

  return (
    <div className="w-full">
      <Input
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
        id={id}
        disabled={disabled}
      />

      <div
        className={cn(
          'w-full border-2 border-dashed rounded-lg p-4',
          videoURL ? 'border-primary' : 'border-brand-secondary',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        <Flex className="w-full" direction="column" gap="4" align="center">
          <label
            htmlFor={id}
            className={cn('w-full cursor-pointer', disabled && 'cursor-not-allowed')}
          >
            {videoUpload.isPending ? (
              <div className="w-full flex justify-center items-center py-8">
                <Loading />
              </div>
            ) : videoURL ? (
              <div className="w-full">
                <div className="relative aspect-video w-full">
                  <video
                    src={videoURL}
                    className="w-full h-full object-contain rounded-lg"
                    controls
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setVideoURL('');
                      setVideoID('');
                    }}
                    className="absolute top-2 right-2 p-1 bg-error text-white rounded-full hover:bg-error-secondary"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="w-full py-8 gap-2"
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">Click to upload video</p>
                  <p className="text-xs text-gray-500 mt-1">MP4 or WebM (max. 100MB)</p>
                </div>
              </Flex>
            )}
          </label>

          {!videoURL && limitations && (
            <div className="text-xs text-gray-500 text-center">{limitations}</div>
          )}
        </Flex>
      </div>
    </div>
  );
};

export default VideoUploader;
