import { MoneyInput } from '@/components/shared/input/money-input';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Grid } from '@radix-ui/themes';

const WithdrawSettingForm = ({
  form,
  handleClose,
  mode = 'create',
  isLoading = false,
}: {
  form: any;
  handleClose: () => void;
  mode: 'create' | 'update' | 'view';
  isLoading?: boolean;
}) => {
  return (
    <div>
      <Grid className="gap-3">
        <p className="pb-3">{`Please select the date you'd like users to withdraw their funds.`}</p>
        <FormField
          control={form.control}
          name="monthlyWithdrawDate"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="relative">
                    <SelectValue placeholder="Select Withdraw Date" />
                    <div className="absolute right-8 top-2.5">
                      <p className="text-base">of every month</p>
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
                    <SelectItem value={String(num)} key={num}>
                      {num.toString()}
                      {num == 1 ? 'st' : num == 2 ? 'nd' : num == 3 ? 'rd' : 'th'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthlyWithdrawLimit"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MoneyInput
                  value={field.value}
                  setValue={(e) => {
                    field.onChange(e);
                  }}
                  placeholder="Minimum Withdrawal Amount"
                  postfix="$"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dailyTransactionLimit"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MoneyInput
                  value={field.value}
                  setValue={(e) => {
                    field.onChange(e);
                  }}
                  placeholder="Daily Transaction Limit"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Grid>
      <div className="flex flex-row gap-4 justify-end items-center mt-4">
        <Button
          variant="outline"
          className="text-text-primary min-w-[110px]"
          type="button"
          onClick={() => handleClose()}
          size={'lg'}
        >
          Cancel
        </Button>
        <Button
          className="min-w-[110px]"
          loading={isLoading}
          addDoneIcon
          // disabled={!form.formState.isValid}
          size={'lg'}
        >
          {mode == 'create' ? `Add` : 'Update'}
        </Button>
      </div>
    </div>
  );
};
export default WithdrawSettingForm;
