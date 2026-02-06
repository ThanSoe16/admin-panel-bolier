'use client';

import * as React from 'react';
import { Eye, X } from 'lucide-react';
import ProfileAvatar from '../base/profile-avatar';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ImagePreviewDialogProps {
  src: string;
  alt?: string;
  className?: string;
}

export function ImagePreviewDialog({
  src,
  alt = 'Preview image',
  className,
}: ImagePreviewDialogProps) {
  if (!src)
    return (
      <ProfileAvatar
        photo={src ?? ''}
        name={alt.charAt(0).toUpperCase()}
        className={cn('w-18 h-14 rounded-lg', className)}
      />
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <ProfileAvatar
            photo={src}
            name={alt.charAt(0).toUpperCase()}
            className={cn('w-18 h-14 rounded-lg', className)}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye className="text-white w-5 h-5" />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 min-w-[80dvw] min-h-[80dvh]">
        <div className="relative w-full h-full flex items-center justify-center p-0">
          <img
            src={src}
            alt="image"
            width={1960}
            height={1080}
            className="w-full h-full max-w-[80dvw] max-h-[80dvh] object-center rounded-lg"
          />
          <DialogTitle hidden />
          <DialogClose>
            <button
              className="absolute top-4 right-4 bg-black/40 rounded-full p-2 text-white z-50 cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
