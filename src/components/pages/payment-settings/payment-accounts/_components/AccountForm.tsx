import { MoneyInput } from "@/components/shared/base/MoneyInput";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useGetPaymentMethods } from "@/features/payment-settings/payment-methods/services/queries";
import { Flex } from "@radix-ui/themes";

const AccountForm = ({
  form,
  handleClose,
  mode = "create",
  isLoading = false,
}: {
  form: any;
  handleClose: () => void;
  mode: "create" | "update" | "view";
  isLoading?: boolean;
}) => {
  const methods = useGetPaymentMethods({ pageIndex: 1, rowPerPage: 50 });

  return (
    <div className="pt-4">
      <div>
        <FormField
          control={form.control}
          name="paymentMethodId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {methods?.data?.body?.data &&
                    methods?.data?.body?.data
                      .filter((item) => item.Status == "ACTIVE")
                      .map((item, key) => (
                        <SelectItem value={item.id} key={key}>
                          {item.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="text" placeholder="Account Name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(e) => {
                    const numberOnly = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(numberOnly);
                  }}
                  type="text"
                  placeholder="Account Number"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MoneyInput
                  value={field.value?.toString()}
                  setValue={(value) => field.onChange(Number(value))}
                  placeholder="Payment Method Order"
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="Status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Flex align={"center"} className="gap-4">
                  <Switch
                    checked={field.value == "ACTIVE"}
                    onCheckedChange={(e) => {
                      field.onChange(e ? "ACTIVE" : "INACTIVE");
                    }}
                  />
                  <p>Status: {field.value == "ACTIVE" ? `ON` : `OFF`}</p>
                </Flex>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
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
export default AccountForm;
