"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  imageUrl: string;
  open: boolean;
  onClose: () => void;
}

const ImagePreview: React.FC<ModalProps> = ({ imageUrl, open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <div className="relative w-full h-full flex items-center justify-center p-0">
          <Image
            src={imageUrl}
            alt="image"
            width={1960}
            height={1080}
            className="w-full h-full object-cover object-center rounded-lg"
          />
          <DialogTitle hidden />
          <button
            className="absolute top-4 right-4 bg-black/40 rounded-full p-2 text-white z-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreview;
