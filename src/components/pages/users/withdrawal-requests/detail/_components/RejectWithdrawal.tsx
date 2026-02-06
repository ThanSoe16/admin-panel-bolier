import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRejectWithdrawalRequest } from '@/features/withdrawal/services/mutations';
import { WithdrawalRequestDetailData } from '@/features/withdrawal/types';
import { CurrencyFormat } from '@/utils/currencyFormat';
import { Flex } from '@radix-ui/themes';
import { X } from 'lucide-react';
import { useState } from 'react';
import UserAccount from './UserAccount';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { matchRouteToStoredPermission } from '@/utils/routeMatcher';
import { routePermissionMap } from '@/data/route-permissions';

const RejectWithdrawal = ({ data }: { data: WithdrawalRequestDetailData }) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useRejectWithdrawalRequest();

  const [open, setOpen] = useState(false);
  const [otherReason, setOtherReason] = useState<string>('');

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
      reason: otherReason,
    }).then(() => {
      setOpen(false);
      router.replace(`/users/withdrawal-history/${data.id}`);
    });
  };

  const handleReset = () => {
    setOtherReason('');
    setOpen(false);
  };

  // const reasonList = [
  //   { label: "Invalid account details", value: "Invalid account details" },
  //   { label: "Other", value: "Other" },
  // ];

  return (
    <div>
      <Button variant={'destructive'} onClick={() => setOpen(true)}>
        <X /> Reject
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full md:min-w-[700px]">
          <DialogTitle>Reject Withdrawal</DialogTitle>
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
              value={CurrencyFormat(requestedAmount) + ' MMK '}
            />
            <List
              name={'Withdrawal Service Fee'}
              value={CurrencyFormat(withdrawalFeeAmount) + ' MMK '}
              minute
            />
            <Flex justify={'between'} className=" pb-2">
              <p className="">Actual Withdrawal Amount : </p>
              <p className="text-right text-2xl font-semibold">
                {CurrencyFormat(data.paidAmount)} MMK
              </p>
            </Flex>
            <UserAccount data={data.OnesiteUserReceivingAccount} />
            <div className="pt-2 space-y-2">
              <h3 className="font-bold text-lg">Please Explain Why You Reject This Withdrawal</h3>
              {/* <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasonList.map((reason, index) => (
                    <SelectItem key={index} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              <Input
                placeholder="Other Reason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                maxLength={100}
              />
            </div>
            <Flex justify={'end'} className="pt-4 space-x-2">
              <Button variant={'outline'} size={'lg'} onClick={handleReset}>
                Cancel
              </Button>
              <Button
                size={'lg'}
                variant={'destructive'}
                disabled={!otherReason}
                onClick={handleConfirm}
                loading={isPending}
              >
                <X />
                Reject
              </Button>
            </Flex>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default RejectWithdrawal;
