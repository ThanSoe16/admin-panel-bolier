'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { SocialLinkIconsType, SocialLinksType } from '@/features/settings/socials/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';

type SelectedSocialIconsType = {
  id: string;
  url: string;
};
interface SelectIconsDialogProps {
  availableLinks: SocialLinkIconsType[] | never[];
  selectedLinks: SocialLinksType[];
  open: boolean;
  onClose: () => void;
  onSelect: (link: SelectedSocialIconsType) => void; // Add this
}

export const SelectIconsDialog: React.FC<SelectIconsDialogProps> = ({
  availableLinks,
  selectedLinks,
  open,
  onClose,
  onSelect, // Add this
}) => {
  const handleSelectIcons = (link: SelectedSocialIconsType) => {
    const selectedLink = {
      id: link.id,
      url: link.url,
    };
    onSelect(selectedLink); // Call the onSelect callback
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[500px]">
        <div>
          <div className="w-full flex items-center justify-between">
            <DialogTitle className="font-bold text-lg md:text-[24px] leading-[26px] lg:leading-[36px]">
              Select Social Link
            </DialogTitle>
            {/* <X onClick={onClose} className="cursor-pointer" /> */}
          </div>
          <div className="grid grid-cols-3 gap-y-14 mt-4">
            {availableLinks?.map((link) => (
              <div
                key={link.id}
                className={cn(
                  'flex flex-col items-center justify-center cursor-pointer',
                  selectedLinks?.some((item) => item.fileId === link.id) &&
                    'opacity-30 cursor-not-allowed',
                )}
                onClick={() =>
                  !selectedLinks.some((item) => item.fileId === link.id) &&
                  handleSelectIcons({ id: link.id, url: link.url })
                }
              >
                <Avatar>
                  <AvatarImage
                    src={link.url}
                    alt={link.name}
                    width={200}
                    height={200}
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                  <AvatarFallback>{link.name}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
