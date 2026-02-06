import { MoneyInput } from "@/components/shared/base/MoneyInput";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { UpdateWithdrawFeeRequest } from "@/features/payment-settings/transaction-fee/types";
import { Flex, Grid } from "@radix-ui/themes";

const WithdrawalFeeForm = ({
  form,
  handleClose,
  mode = "create",
  isLoading = false,
  data,
}: {
  form: any;
  handleClose: () => void;
  mode: "create" | "update" | "view";
  isLoading?: boolean;
  data?: UpdateWithdrawFeeRequest;
}) => {
  const types = [
    { label: "Percentage", value: "PERCENTAGE" },
    { label: "Fixed Amount", value: "FIX_AMOUNT" },
  ];
  return (
    <div>
      <Grid className="gap-1">
        <div>
          <p className="text-xs">
            Please select how you’d like to charge withdrawal fee.
          </p>
          <FormField
            control={form.control}
            name="feeType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    defaultValue={data?.feeType}
                    onValueChange={(e) => {
                      field.onChange(e);
                      form.setValue("amount", 0);
                    }}
                    value={field.value}
                    className="space-y-3"
                  >
                    {types.map((type, index) => (
                      <div className="flex items-center gap-3" key={index}>
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label htmlFor={type.value}>By {type.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="pt-2">
              <FormControl>
                <MoneyInput
                  value={field.value.toString()}
                  setValue={(e) => field.onChange(e)}
                  placeholder="Withdrawal Fee"
                  maxLength={form.watch("feeType") == "FIX_AMOUNT" ? 10 : 3}
                  postfix={
                    form.watch("feeType") == "FIX_AMOUNT" ? "MMK/$" : "%/$"
                  }
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
          size={"lg"}
        >
          Cancel
        </Button>
        <Button
          className="min-w-[110px]"
          loading={isLoading}
          addDoneIcon
          disabled={!form.formState.isValid}
          size={"lg"}
        >
          {mode == "create" ? `Add` : "Update"}
        </Button>
      </div>
    </div>
  );
};
export default WithdrawalFeeForm;
