import { MoneyInput } from '@/components/shared/base/MoneyInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateOTPSettings } from '@/features/settings/otp-settings/services/mutations';
import {
  OTPSettingsData,
  UpdateOTPSettingsRequest,
  updateOTPSettingsSchema,
} from '@/features/settings/otp-settings/types';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const OTPSettingForm = ({
  data,
  editEnable,
  setEditEnable,
}: {
  data: OTPSettingsData;
  editEnable: boolean;
  setEditEnable: (editEnable: boolean) => void;
}) => {
  const updateOTPSettings = useUpdateOTPSettings();

  const defaultValues = {
    expireTime: data.expireTime,
    expireUnit: data.expireUnit,
    maxRetry: data.maxRetry,
    otpLockTime: data.otpLockTime,
    otpLockUnit: data.otpLockUnit,
    maxWrongAttempt: data.maxWrongAttempt,
  };
  const form = useForm<UpdateOTPSettingsRequest>({
    resolver: zodResolver(updateOTPSettingsSchema),
    defaultValues: defaultValues,
  });

  const submit = (data: UpdateOTPSettingsRequest) => {
    updateOTPSettings.mutateAsync(data).then(() => {
      setEditEnable(false);
    });
  };

  const handleClose = () => {
    form.reset(defaultValues);
    setEditEnable(false);
  };

  const disabled = !editEnable;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
          <div className="relative">
            <FormField
              control={form.control}
              name="expireTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MoneyInput
                      value={field.value.toString()}
                      setValue={(e) => {
                        field.onChange(parseInt(e));
                      }}
                      placeholder="Expire Time"
                      className="pr-[80px]"
                      disabled={disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="min-w-[80px] max-w-[120px] absolute right-0 top-0 z-50">
              <FormField
                control={form.control}
                name="expireUnit"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={disabled}
                      >
                        <SelectTrigger className={cn('border-0 shadow-none focus:ring-0')}>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {['MINUTE', 'HOUR'].map((item, key) => (
                            <SelectItem value={item} key={key}>
                              {item} (s)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="otpLockTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MoneyInput
                      value={field.value.toString()}
                      setValue={(e) => {
                        field.onChange(parseInt(e));
                      }}
                      placeholder="OTP Lock Time"
                      className="pr-[80px]"
                      disabled={disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="min-w-[80px] max-w-[120px] absolute right-0 top-0 z-50">
              <FormField
                control={form.control}
                name="otpLockUnit"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={disabled}
                      >
                        <SelectTrigger className="border-0 shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {['MINUTE', 'HOUR'].map((item, key) => (
                            <SelectItem value={item} key={key}>
                              {item} (s)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="maxRetry"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MoneyInput
                    value={field.value.toString()}
                    setValue={(e) => {
                      field.onChange(parseInt(e));
                    }}
                    placeholder="Maximum resend attempts"
                    className="pr-[80px]"
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxWrongAttempt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MoneyInput
                    value={field.value.toString()}
                    setValue={(e) => {
                      field.onChange(parseInt(e));
                    }}
                    placeholder="Maximum incorrect OTP attempts"
                    className="pr-[80px]"
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-4 justify-end items-center mt-4">
            <Button
              variant={!disabled ? 'outline' : 'default'}
              className="min-w-[110px]"
              type="button"
              onClick={() => {
                if (!disabled) {
                  handleClose();
                } else {
                  setEditEnable(true);
                }
              }}
              size={'lg'}
            >
              {!disabled ? 'Cancel' : 'Edit'}
            </Button>
            {!disabled && (
              <Button
                className="min-w-[110px]"
                loading={updateOTPSettings.isPending}
                addDoneIcon
                disabled={!form.formState.isValid}
                size={'lg'}
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default OTPSettingForm;
