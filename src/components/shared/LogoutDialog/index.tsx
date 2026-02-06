import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flex, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/auth';
import { LogOut } from 'lucide-react';


interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const LogoutDialog: React.FC<ModalProps> = ({
  open,
  handleClose
}) => {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-[400px]'>
        <DialogTitle> Logout? </DialogTitle>
        <Text className='text-base'> Are you sure you want to log out from this account? </Text>
        <Flex className="flex flex-row items-center gap-x-4 ml-auto">
          <Button
            variant={"outline"}
            onClick={handleClose}
            className=''
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              logout();
              // window.location.reload();
              router.replace('/login');
              handleClose();
            }}
          >
            <LogOut size={16} />
            Log Out
          </Button>
        </Flex>

      </DialogContent>

    </Dialog>
  )
}

export default LogoutDialog