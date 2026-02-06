import ProfilePicker from "@/components/shared/base/ProfilePicker";
import PageTitle from "@/components/shared/PageTitle";
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
import { useGetRoles } from "@/features/admins/services/queries";
import { usePagination } from "@/features/base/hooks/usePagination";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const AdminForm = ({
  form,
  mode = "create",
  isLoading,
}: {
  form: any;
  mode: "view" | "update" | "create";
  isLoading: boolean;
}) => {
  const router = useRouter();
  const { query } = usePagination();
  const roles = useGetRoles(query);

  const resetHandler = () => {
    form.reset();
    router.back();
  };

  return (
    <div className="space-y-4 pt-6">
      <PageTitle>{mode == "create" ? "Create Admin" : "Edit Admin"}</PageTitle>
      <Flex justify="center" className="pb-6">
        <FormField
          control={form.control}
          name="profileUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProfilePicker
                  imageURL={field.value}
                  setImageURL={field.onChange}
                  setImageID={(value) => form.setValue("avatarId", value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Flex>
      <FormField
        control={form.control}
        name="adminRoleId"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Admin Role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {roles?.data?.body?.data &&
                  roles?.data?.body?.data
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
              <Input
                {...field}
                error={!!form.formState.errors.name}
                placeholder="Admin Name"
                readOnly={mode === "view"}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                error={!!form.formState.errors.phone}
                placeholder="Phone Number"
                readOnly={mode === "view"}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="loginId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                error={!!form.formState.errors.loginId}
                placeholder="Login ID"
                readOnly={mode === "view"}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field, fieldState }) => {
          return (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  error={
                    form.formState.errors.password || fieldState.error?.message
                  }
                  placeholder="Password"
                  readOnly={mode === "view"}
                  type="password"
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      {mode != "view" && (
        <Flex justify="end" className="space-x-2">
          <Button
            size="lg"
            variant="outline"
            type="button"
            onClick={resetHandler}
          >
            Cancel
          </Button>
          <Button size="lg" loading={isLoading}>
            {mode == "create" ? "Create" : "Update"}
          </Button>
        </Flex>
      )}
    </div>
  );
};
export default AdminForm;
