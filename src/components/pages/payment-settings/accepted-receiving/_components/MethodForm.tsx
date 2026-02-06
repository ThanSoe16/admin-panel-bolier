import ImagePicker from "@/components/shared/base/ImagePicker";
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
import { Flex } from "@radix-ui/themes";
import { Info } from "lucide-react";

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
                <Input
                  {...field}
                  type="text"
                  placeholder="Payment Method Name"
                  postfix="e.g. KBZPay"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="AcceptedAccountType"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                  if (e == "BANKING") {
                    form.setValue("isQRRequired", false);
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["PAY", "BANKING"].map((item, key) => (
                    <SelectItem value={item} key={key}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isQRRequired"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Flex align="center" className="gap-4">
                  <Switch
                    checked={field.value}
                    onCheckedChange={(val) => field.onChange(val)}
                    disabled={form.watch("AcceptedAccountType") == "BANKING"}
                  />
                  <p>QR Required: {field.value ? "Yes" : "No"}</p>
                </Flex>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="py-4">
          <Flex
            align={"center"}
            className="border-l-4 border-primary bg-secondary px-4 py-2 text-sm gap-2"
          >
            <Info className="w-4 h-4 text-primary" />
            Fields: Acc Name, ID or Number & QR
          </Flex>
        </div>

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
