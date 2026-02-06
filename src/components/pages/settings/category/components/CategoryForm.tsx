// import ButtonImagePicker from "@/components/shared/base/ButtonImagePicker";
import ButtonImagePicker from "@/components/shared/base/ButtonImagePicker";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { LandingLanguage } from "@/features/landing-languages/types";

const CategoryForm = ({
  form,
  handleClose,
  languages,
  mode = "create",
  isLoading = false,
}: {
  form: any;
  handleClose: () => void;
  languages?: LandingLanguage[];
  mode: "create" | "update" | "view";
  isLoading?: boolean;
}) => {
  return (
    <div>
      {languages ? (
        languages.map((language, index) => (
          <FormField
            key={language.id}
            control={form.control}
            name={`items.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center space-x-2 justify-start ">
                  <Image
                    src={language?.File?.url}
                    width={20}
                    height={20}
                    alt="icon"
                    className="rounded-full w-5 h-5"
                  />
                  <p className="font-bold text-default text-base">
                    {" "}
                    For {language.name}{" "}
                  </p>
                </div>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`Enter Category Name`}
                    {...field}
                    disabled={mode === "view"}
                    maxLength={60}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))
      ) : (
        <p className="text-gray-500">No languages available.</p>
      )}

      <FormField
        control={form.control}
        name={`url`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ButtonImagePicker
                disabled={mode === "view"}
                imageURL={field.value}
                setImageURL={field.onChange}
                setImageID={(value: string) => form.setValue("fileId", value)}
                name={form.getValues("name")}
                setName={(value: string) => form.setValue("name", value)}
                limitations={
                  "Acceptable formats: PNG, JPEG, JPG, SVG. only Max file size : 600 x 600 (Pixel) Recommend: 1:1 (Ratio Size) Black Color"
                }
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex flex-row gap-4 justify-end items-center mt-4">
        <Button
          variant="outline"
          className="text-text-primary"
          type="button"
          onClick={handleClose}
        >
          Cancel
        </Button>
        {mode != "view" && (
          <Button loading={isLoading} addDoneIcon>
            {mode == "create" ? "Create" : `Update`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
