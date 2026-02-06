import ImageCombobox from "@/components/shared/base/ImageCombobox";
import ImagePicker from "@/components/shared/base/ImagePicker";
import { MoneyInput } from "@/components/shared/base/MoneyInput";
import ProfileAvatar from "@/components/shared/base/ProfileAvatar";
import Combobox from "@/components/shared/combobox";
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
import { useGetBaseCurrencyList } from "@/features/payment-settings/exchange-rate-service/services/queries";
import { Flex, Grid } from "@radix-ui/themes";

const ExchangeRateRow = ({
  form,
  index,
  defaultImage,
}: {
  form: any;
  index: number;
  defaultImage?: string[];
}) => {
  const currencies = useGetBaseCurrencyList({ pageIndex: 1, rowPerPage: 200 });
  const selectedImage = currencies.data?.body?.data?.find(
    (item) => item.id == form.watch(`currencies.${index}.baseCurrencyId`)
  )?.File?.url;
  return (
    <Flex>
      {/* <FormField
        control={form.control}
        name={`currencies.${index}.fileId`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ImagePicker
                onChange={({ url, fileId }) => {
                  field.onChange(fileId);
                }}
                maxFileSizeInKb={1024}
                defaultUrl={defaultImage?.at(index) ?? ""}
                acceptFiles=".jpg, .jpeg, .png"
                className="w-14 h-14 rounded-full"
                closeClassName="left-[40px]"
                uniqueKey={`image-picker-${index}`}
              />
            </FormControl>
          </FormItem>
        )}
      /> */}

      {/* DESKTOP */}
      <Grid columns={"8"} align={"center"} className=" gap-4 w-full">
        <div className=" md:hidden h-full flex justify-start col-span-4">
          <img
            src={selectedImage ?? ""}
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
        <div className=" md:hidden h-full flex justify-end col-span-4">
          <FormField
            control={form.control}
            name={`currencies.${index}.Status`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Flex align={"center"} className="gap-4 mt-0">
                    <Switch
                      checked={field.value == "ACTIVE"}
                      onCheckedChange={(e) =>
                        field.onChange(e ? "ACTIVE" : "INACTIVE")
                      }
                    />
                    <p className="hidden md:block">
                      {" "}
                      {field.value == "ACTIVE" ? `ON` : `OFF`}
                    </p>
                  </Flex>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={`currencies.${index}.baseCurrencyId`}
          render={({ field }) => (
            <FormItem className="col-span-4 md:col-span-2 mt-0">
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

        <FormField
          control={form.control}
          name={`currencies.${index}.currencyCode`}
          render={({ field }) => (
            <FormItem className="col-span-4 md:col-span-1 mt-0 ">
              <FormControl>
                <Input
                  value={
                    currencies?.data?.body?.data?.find(
                      (item) =>
                        item.id ==
                        form.watch(`currencies.${index}.baseCurrencyId`)
                    )?.iso4217
                  }
                  type="text"
                  placeholder=""
                  readOnly
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className=" hidden md:block col-span-4 md:col-span-2">
          <FormField
            control={form.control}
            name={`currencies.${index}.exchangeRate`}
            render={({ field }) => (
              <FormItem className="mt-0">
                <FormControl>
                  <MoneyInput
                    value={field.value}
                    setValue={(value) => field.onChange(value)}
                    placeholder=""
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className=" md:hidden col-span-4 md:col-span-2 ">
          <FormField
            control={form.control}
            name={`currencies.${index}.exchangeRate`}
            render={({ field }) => (
              <FormItem className="mt-0">
                <FormControl>
                  <MoneyInput
                    value={field.value}
                    setValue={(value) => field.onChange(value)}
                    placeholder="Exchange Rate"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className=" hidden md:block col-span-4 md:col-span-2">
          <FormField
            control={form.control}
            name={`currencies.${index}.exchangeServiceFee`}
            render={({ field }) => (
              <FormItem className="mt-0">
                <FormControl>
                  <MoneyInput
                    value={field.value}
                    setValue={(value) => field.onChange(value)}
                    placeholder=""
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className=" md:hidden col-span-4 md:col-span-2">
          <FormField
            control={form.control}
            name={`currencies.${index}.exchangeServiceFee`}
            render={({ field }) => (
              <FormItem className="mt-0">
                <FormControl>
                  <MoneyInput
                    value={field.value}
                    setValue={(value) => field.onChange(value)}
                    placeholder="Exchange Service Fee"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="hidden md:block">
          <FormField
            control={form.control}
            name={`currencies.${index}.Status`}
            render={({ field }) => (
              <FormItem className=" mt-0">
                <FormControl>
                  <Flex align={"center"} className="gap-4">
                    <Switch
                      checked={field.value == "ACTIVE"}
                      onCheckedChange={(e) =>
                        field.onChange(e ? "ACTIVE" : "INACTIVE")
                      }
                    />
                    <p> {field.value == "ACTIVE" ? `ON` : `OFF`}</p>
                  </Flex>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Grid>
    </Flex>
  );
};
export default ExchangeRateRow;
