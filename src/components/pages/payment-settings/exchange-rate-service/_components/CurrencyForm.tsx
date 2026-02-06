import ImageCombobox from "@/components/shared/base/ImageCombobox";
import ImagePicker from "@/components/shared/base/ImagePicker";
import { MoneyInput } from "@/components/shared/base/MoneyInput";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
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
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetBaseCurrencyList } from "@/features/payment-settings/exchange-rate-service/services/queries";
import { Flex } from "@radix-ui/themes";

const CurrencyForm = ({
  form,
  handleClose,
  mode = "create",
  isLoading = false,
  defaultImage,
}: {
  form: any;
  handleClose: () => void;
  mode: "create" | "update" | "view";
  isLoading?: boolean;
  defaultImage?: string;
}) => {
  const { query } = usePagination();
  const currencies = useGetBaseCurrencyList({ pageIndex: 1, rowPerPage: 200 });

  return (
    <div>
      <div>
        {/* <div>
          <h3 className="font-bold text-lg">Upload currency image</h3>
          <p className="text-xs">
            Accepted formats : 200x 140px. jpg, png only Max file size : 1 MB
          </p>
          <FormField
            control={form.control}
            name="fileId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImagePicker
                    onChange={({ url, fileId }) => {
                      field.onChange(fileId);
                    }}
                    maxFileSizeInKb={1024}
                    defaultUrl={defaultImage}
                    acceptFiles=".jpg, .jpeg, .png"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div> */}
        <FormField
          control={form.control}
          name="baseCurrencyId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageCombobox
                  options={
                    currencies?.data?.body?.data?.flatMap((item) => {
                      return {
                        value: item.id,
                        label: item.countryName,
                        image: item.File?.url,
                      };
                    }) ?? []
                  }
                  value={field.value}
                  setValue={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="shortForm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Currency Short Form"
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="currencyCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MoneyInput
                  value={field.value}
                  setValue={(e) => {
                    field.onChange(e);
                  }}
                  placeholder="Currency Code"
                />
              </FormControl>
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="exchangeRate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MoneyInput
                  value={field.value}
                  setValue={(e) => {
                    field.onChange(e);
                  }}
                  placeholder="Exchange Rate"
                  postfix={`${
                    currencies?.data?.body?.data.find(
                      (item) => item.id == form.watch("baseCurrencyId")
                    )?.countryCode ?? ""
                  }`}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exchangeServiceFee"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MoneyInput
                  value={field.value}
                  setValue={(e) => {
                    field.onChange(e);
                  }}
                  placeholder="Exchange Service Fee"
                  postfix={
                    currencies?.data?.body?.data.find(
                      (item) => item.id == form.watch("baseCurrencyId")
                    )?.countryCode ?? ""
                  }
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
                  value={field.value.toString()}
                  setValue={(e) => {
                    field.onChange(Number(e));
                  }}
                  placeholder="Currency Order"
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
                    onCheckedChange={(e) =>
                      field.onChange(e ? "ACTIVE" : "INACTIVE")
                    }
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
          // disabled={!form.formState.isValid}
          size={"lg"}
        >
          {mode == "create" ? `Add` : "Update"}
        </Button>
      </div>
    </div>
  );
};
export default CurrencyForm;
