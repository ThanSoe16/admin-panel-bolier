import ImagePicker from "@/components/shared/base/ImagePicker";
import MultiSelectInput from "@/components/shared/base/MultiSelectInput";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Flex } from "@radix-ui/themes";

const MethodForm = ({
  form,
  handleClose,
  mode = "create",
  isLoading = false,
  defaultImage = "",
}: {
  form: any;
  handleClose: () => void;
  mode: "create" | "update" | "view";
  isLoading?: boolean;
  defaultImage?: string;
}) => {
  const paymentMethods = [
    { name: "KBZPay", channels: ["PWAAPP", "PAY_BY_QRCODE"] },
    { name: "WavePay", channels: ["PIN"] },
    { name: "AYA Pay", channels: ["NOTI", "PAY_BY_QRCODE"] },
    { name: "MPU", channels: ["WEB"] },
    { name: "JCB", channels: ["WEB"] },
    { name: "Visa", channels: ["WEB"] },
    { name: "Master", channels: ["WEB"] },
    { name: "UnionPay", channels: ["upi"] },
    { name: "UABPay", channels: ["uabpay"] },
    { name: "MMQR", channels: ["mmqr"] },
  ];

  const channels = [
    { name: "QR", value: "PAY_BY_QRCODE" },
    { name: "PWA", value: "PWAAPP" },
    { name: "PIN", value: "PIN" },
    { name: "NOTI", value: "NOTI" },
    { name: "WEB", value: "WEB" },
    { name: "UPI", value: "upi" },
    { name: "UABPAY", value: "uabpay" },
    { name: "MMQR", value: "mmqr" },
  ];

  return (
    <div className="pt-4">
      <div>
        <div>
          <h3 className="font-bold text-lg">Upload payment method image</h3>
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
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Payment Method Name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentKey"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Payment Method Name" disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="PaymentChannels"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultiSelectInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Payment Channel(s)"
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

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
          disabled={!form.formState.isValid}
          size={"lg"}
        >
          {mode == "create" ? `Add` : "Update"}
        </Button>
      </div>
    </div>
  );
};
export default MethodForm;
