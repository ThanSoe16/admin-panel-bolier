"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  CreateMembershipPlanRequest,
  createMembershipPlanSchema,
} from "@/features/membership/plans/types";
import { MoneyInput } from "@/components/shared/base/MoneyInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCreateMembershipPlan } from "@/features/membership/plans/services/mutations";

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateMembership: React.FC<CreateModalProps> = ({
  open,
  handleClose,
}) => {
  const createMembership = useCreateMembershipPlan();

  const defaultValues: CreateMembershipPlanRequest = {
    amount: 1,
    DurationType: "HOUR",
  };
  const form = useForm<CreateMembershipPlanRequest>({
    resolver: zodResolver(createMembershipPlanSchema),
    defaultValues: defaultValues,
  });

  const submit = async (data: CreateMembershipPlanRequest) => {
    createMembership.mutateAsync(data).then((res) => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px]">
        <DialogTitle> Create Membership Plan </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex flex-col ">
            <div className="relative">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MoneyInput
                        value={field.value.toString()}
                        setValue={(e) => {
                          field.onChange(parseInt(e));
                        }}
                        placeholder="Set Plan Duration"
                        className="pr-[80px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="min-w-[80px] max-w-[100px] absolute right-0 top-0 z-50">
                <FormField
                  control={form.control}
                  name="DurationType"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="border-0 shadow-none focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            {["HOUR", "DAY", "MONTH", "YEAR"].map(
                              (item, key) => (
                                <SelectItem value={item} key={key}>
                                  {item} (s)
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
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
                  loading={createMembership.isPending}
                  addDoneIcon
                  disabled={!form.formState.isValid}
                  size={"lg"}
                >
                  Create
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMembership;
