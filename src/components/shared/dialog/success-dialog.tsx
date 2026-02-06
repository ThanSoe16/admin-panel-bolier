import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Flex } from '@radix-ui/themes';

interface SecondarySuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  desc: string;
}
const SecondarySuccessDialog: React.FC<SecondarySuccessDialogProps> = ({
  open,
  onClose,
  title,
  desc,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 h-[190px]">
        <div>
          <div className="h-full px-4 pt-6">
            <Flex direction="column" justify="center" align="center">
              <div>
                <div className="font-bold text-blueDark-normal text-center text-xl">{title}</div>
                <div className="text-sm text-center pt-3">{desc}</div>
                <div className="px-12">
                  <Button className="w-full mt-6" onClick={onClose}>
                    OK
                  </Button>
                </div>
              </div>
            </Flex>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecondarySuccessDialog;
