import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useUpdateWithdrawalSetting } from '@/features/withdrawal/services/mutations';
import {
  UpdateWithdrawalSettingRequest,
  updateWithdrawalSettingSchema,
  WithdrawalSettingData,
} from '@/features/withdrawal/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import WithdrawSettingForm from './WithdrawSettingForm';

const WithdrawSetting = ({
  open,
  handleClose,
  data,
}: {
  open: boolean;
  handleClose: (value: boolean) => void;
  data: WithdrawalSettingData;
}) => {
  const updateWithdrawalSetting = useUpdateWithdrawalSetting();

  const form = useForm<UpdateWithdrawalSettingRequest>({
    resolver: zodResolver(updateWithdrawalSettingSchema),
    defaultValues: {
      dailyTransactionLimit: data.dailyTransactionLimit.toString() ?? '1',
      monthlyWithdrawLimit: data.monthlyWithdrawLimit.toString() ?? '1',
      monthlyWithdrawDate: data.monthlyWithdrawDate.toString() ?? '1',
    },
  });

  const submit = async (data: UpdateWithdrawalSettingRequest) => {
    updateWithdrawalSetting.mutateAsync(data).then(() => {
      handleClose(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px] overflow-hidden">
        <DialogTitle> Withdrawal Date Setting </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <WithdrawSettingForm
              form={form}
              handleClose={() => handleClose(false)}
              mode={'update'}
              isLoading={updateWithdrawalSetting.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default WithdrawSetting;
