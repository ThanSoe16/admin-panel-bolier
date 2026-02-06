import ImagePicker from '@/components/shared/base/ImagePicker';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useApproveWithdrawalRequest } from '@/features/withdrawal/services/mutations';
import { WithdrawalRequestDetailData } from '@/features/withdrawal/types';
import { CurrencyFormat } from '@/utils/currencyFormat';
import { Flex } from '@radix-ui/themes';
import { Check } from 'lucide-react';
import { useState } from 'react';
import UserAccount from './UserAccount';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { matchRouteToStoredPermission } from '@/utils/routeMatcher';
import { routePermissionMap } from '@/data/route-permissions';

const ApproveWithdrawal = ({ data }: { data: WithdrawalRequestDetailData }) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useApproveWithdrawalRequest();

  const [open, setOpen] = useState(false);
  const [proofOfPayment, setProofOfPayment] = useState<string>('');
  const [proofOfPaymentFileId, setProofOfPaymentFileId] = useState<string>('');

  const pathname = usePathname();
  const match = matchRouteToStoredPermission(pathname, routePermissionMap);

  if (!match?.includes('EDIT')) return null;

  const exchangeRate = (data?.exchangeRate ?? 0) + (data?.exchangeFee ?? 0);

  const withdrawalPercentage =
    data?.withdrawFeeType == 'PERCENTAGE'
      ? (data?.withdrawFee ?? 0) / 100
      : (data?.withdrawFee ?? 0) / exchangeRate;

  const requestedAmount = (data?.totalRequestAmount ?? 0) * exchangeRate;

  const withdrawalFeeAmount = requestedAmount * withdrawalPercentage;

  const List = ({ name, value, minute }: { name: string; value: string; minute?: boolean }) => {
    return (
      <Flex justify={'between'}>
        <p className="">{name} : </p>
        <p className={cn('text-right', minute && 'text-destructive')}>{value}</p>
      </Flex>
    );
  };

  const handleConfirm = () => {
    mutateAsync({
      id: data.id,
      paymentProofId: proofOfPaymentFileId,
    }).then(() => {
      setOpen(false);
      router.replace(`/users/withdrawal-history/${data.id}`);
    });
  };

  const handleReset = () => {
    setProofOfPayment('');
    setProofOfPaymentFileId('');
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Check /> Confirm
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" md:min-w-[700px]">
          <DialogTitle>Confirm Withdrawal</DialogTitle>
          <div className="space-y-1">
            <List
              name={'Withdrawal Amount'}
              value={'$ ' + CurrencyFormat(data.totalRequestAmount)}
            />
            <List
              name={'Exchange Rate at Requested Time'}
              value={'$1 = ' + CurrencyFormat(exchangeRate) + ' MMK'}
            />
            <List
              name={'Withdrawal Amount in MMK'}
              value={CurrencyFormat(requestedAmount) + ' MMK'}
            />
            <List
              name={'Withdrawal Service Fee'}
              value={CurrencyFormat(withdrawalFeeAmount) + ' MMK'}
              minute
            />
            <Flex justify={'between'} className=" pb-2">
              <p className="">Actual Withdrawal Amount : </p>
              <p className="text-right text-2xl font-semibold">
                {CurrencyFormat(data.paidAmount)} MMK
              </p>
            </Flex>
            <UserAccount data={data.OnesiteUserReceivingAccount} />
            <div className="pt-2">
              <h3 className="font-bold text-lg">Upload proof of payment</h3>
              <p className="text-xs pb-4 pt-1">
                Accepted formats : jpg, png only Max file size : 10 MB
              </p>
              <ImagePicker
                onChange={({ url, fileId }) => {
                  setProofOfPaymentFileId(fileId);
                  setProofOfPayment(url);
                }}
                maxFileSizeInKb={10240}
                defaultUrl={proofOfPayment}
                acceptFiles=".jpg, .jpeg, .png"
              />
            </div>
            <Flex justify={'end'} className="pt-4 space-x-2">
              <Button variant={'outline'} size={'lg'} onClick={handleReset}>
                Cancel
              </Button>
              <Button
                size={'lg'}
                addDoneIcon
                disabled={!proofOfPaymentFileId}
                onClick={handleConfirm}
                loading={isPending}
              >
                Confirm
              </Button>
            </Flex>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ApproveWithdrawal;
