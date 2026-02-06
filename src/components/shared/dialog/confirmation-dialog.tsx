import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Flex } from '@radix-ui/themes';
import { Trash2 } from 'lucide-react';
import { JSX } from 'react';

interface SecondarySuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  desc: string;
  onPress?: () => void;
  isDelete?: boolean;
  isLoading?: boolean;
  confirmText?: JSX.Element | string;
  enableDeleteIcon?: boolean;
}
const ConfirmationDialog: React.FC<SecondarySuccessDialogProps> = ({
  open,
  onClose,
  title,
  desc,
  onPress,
  isDelete,
  isLoading,
  confirmText = 'Confirm',
  enableDeleteIcon = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 pb-4 max-w-[500px]">
        <div>
          <div className="h-full px-6 pt-4">
            <Flex direction="column" justify="center" align="center">
              <div className="">
                <Flex align="center" justify="between">
                  <div className="font-bold text-blueDark-normal text-xl">{title}</div>
                </Flex>
                <div className="text-base pt-3">{desc}</div>
                <Flex className="gap-4" justify={'end'}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="mt-6 border-grey-normal w-[120px]"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    className={cn(
                      isDelete ? 'bg-error hover:bg-red-400' : 'bg-success',
                      'mt-6 w-[120px]',
                    )}
                    onClick={onPress}
                    loading={isLoading}
                  >
                    {enableDeleteIcon && <Trash2 />}
                    {confirmText}
                  </Button>
                </Flex>
              </div>
            </Flex>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
