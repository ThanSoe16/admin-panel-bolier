import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  allDefaultPermissions,
  allPermissionsDefaults,
  permissions,
} from "@/data/permissions";
import { cn } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubPermissionItem from "./SubPermissionItem";
import PermissionItem from "./PermissionItem";
import { isEqual } from "lodash";

const RoleForm = ({
  form,
  mode = "create",
}: {
  form: any;
  mode: "create" | "update" | "view";
}) => {
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleDropdown = (path: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const resetHandler = () => {
    form.reset();
    router.back();
  };
  const permissionsWatch = form.watch("permissions");

  const allSelected = () => {
    const current = permissionsWatch;
    const defaults = allPermissionsDefaults;
    return Object.entries(defaults).every(([key, value]) => {
      const currentValue = current?.[key];
      return (
        Array.isArray(currentValue) &&
        currentValue.length === value.length &&
        value.every((v: string) => currentValue.includes(v))
      );
    });
  };
  const toggleSelectAll = () => {
    form.setValue(
      "permissions",
      allSelected() ? allDefaultPermissions : allPermissionsDefaults,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                error={!!form.formState.errors.name}
                placeholder="Enter role name"
                readOnly={mode === "view"}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Flex align="center" justify="between">
        <div className="font-bold">Add Permissions</div>
        <Flex align="center" className="space-x-2">
          <Checkbox
            checked={allSelected()}
            onCheckedChange={toggleSelectAll}
            disabled={mode === "view"}
          />
          <div>Select All</div>
        </Flex>
      </Flex>

      {permissions.map((item, index) => (
        <div key={item.name}>
          {item.subMenu ? (
            <div className="border rounded-xl cursor-pointer">
              <Flex
                onClick={() => {
                  if (item.subMenu) {
                    toggleDropdown(item.name);
                  }
                }}
                className={cn(
                  item.subMenu && openDropdowns[item.name] && "border-b",
                  "p-4 relative"
                )}
                wrap={{ initial: "wrap", md: "nowrap" }}
              >
                {item.subMenu ? (
                  openDropdowns[item.name] ? (
                    <ChevronUpCircle className="absolute top-4 right-4" />
                  ) : (
                    <ChevronDownCircle className="absolute top-4 right-4" />
                  )
                ) : null}
                <div className="font-bold w-full md:w-[400px] truncate">
                  {item.title}
                </div>
              </Flex>
              {openDropdowns[item.name] &&
                item.subMenu.map((subItem, key) => (
                  <FormField
                    key={subItem.name}
                    control={form.control}
                    name={`permissions.${subItem.name}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <SubPermissionItem
                            item={subItem}
                            value={field.value ?? []}
                            onChange={(value) => field.onChange(value)}
                            mode={mode}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
            </div>
          ) : (
            <FormField
              key={item.name}
              control={form.control}
              name={`permissions.${item.name}`}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Flex className="space-x-2" align="center">
                      <PermissionItem
                        item={item}
                        value={field.value ?? []} // 👈 fallback
                        onChange={(value) => field.onChange(value)}
                        mode={mode}
                        toggleDropdown={toggleDropdown}
                      />
                    </Flex>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
      ))}

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
          <Button
            size="lg"
            disabled={isEqual(form.watch("permissions"), allDefaultPermissions)}
          >
            {mode == "create" ? "Create" : "Update"}
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default RoleForm;
