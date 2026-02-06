import { UserReceivingAccountData } from '@/features/users/types';
import UserAccount from './UserAccount';
import { Button } from '@/components/ui/button';
import { ArrowLeft, QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { downloadFile } from '@/utils/downloadFile';

const ViewQRCode = ({ data }: { data: UserReceivingAccountData }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant={'secondary'} className="w-full border-none" onClick={() => setOpen(true)}>
        <QrCode className="min-w-5 min-h-5" />
        View QR Code
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:min-w-[700px]">
          <Flex align={'center'} className="space-x-4">
            <div onClick={() => setOpen(false)}>
              <ArrowLeft size={20} />
            </div>
            <DialogTitle>QR Code</DialogTitle>
          </Flex>
          <UserAccount data={data} hideQRButton />
          <Flex direction={'column'} justify={'center'} align={'center'} className="pt-4">
            <img src={data?.QR?.url} alt="" className="w-[350px] h-[400px]" />
          </Flex>
          <Button
            size={'lg'}
            className="w-full"
            addDoneIcon
            onClick={() => {
              downloadFile({
                url: data?.QR?.url,
                filename: `${data.QR.name}`,
                downloadName: `${data.accountName}_${data.AcceptedReceivingAccount.name}`,
              });
              // setOpen(false);
            }}
          >
            Save QR Code
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ViewQRCode;
