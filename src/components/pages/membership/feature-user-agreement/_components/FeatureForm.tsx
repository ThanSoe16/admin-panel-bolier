import ImagePicker from "@/components/shared/base/ImagePicker";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FeatureForm = ({
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
          <h3 className="font-bold text-lg">Upload feature image</h3>
          <p className="text-xs">
            Accepted formats : 1200* 916px. jpg, png only Max file size : 5 MB
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
                    maxFileSizeInKb={5120}
                    defaultUrl={defaultImage ?? ""}
                    acceptFiles=".jpg, .jpeg, .png"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Feature Title in English"
                  maxLength={50}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Feature Description in English"
                  maxLength={160}
                  className="h-[150px]"
                />
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
          {mode == "create" ? `Create` : "Update"}
        </Button>
      </div>
    </div>
  );
};
export default FeatureForm;
