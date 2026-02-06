"use client";
import OptionSelect from "@/components/shared/OptionSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NOTI_SETTING_TIME_UNITS_ENUM } from "@/features/base/types/backend-defined-enums";
import { useUpdateMaintainNotificationSettings } from "@/features/notification/maintain/services/mutations";
import {
  UpdateNotificationSettingRequest,
  updateSettingFormSchema,
} from "@/features/notification/types";
import { toSentenceCase } from "@/utils/toSentenceCase";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  data: UpdateNotificationSettingRequest;
  handleOk?: () => void;
  type: "maintain" | "hosting" | "server";
  id: string;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  handleClose,
  data,
  type,
  id,
}) => {
  const { mutateAsync: updateMaintainSetting, isPending: isUpdatePending } =
    useUpdateMaintainNotificationSettings();
  const {
    mutateAsync: updateHostingSetting,
    isPending: isUpdateHostingPending,
  } = useUpdateMaintainNotificationSettings();
  const { mutateAsync: updateServerSetting, isPending: isUpdateServerPending } =
    useUpdateMaintainNotificationSettings();

  const form = useForm<UpdateNotificationSettingRequest>({
    resolver: zodResolver(updateSettingFormSchema),
    defaultValues: {
      time: data?.time || 0,
      unit: data?.unit || "DAYS",
    },
  });

  const submit = async (submittedData: UpdateNotificationSettingRequest) => {
    try {
      let response;
      const dataToSend = {
        id: id,
        data: submittedData,
      };
      if (type === "maintain") {
        response = await updateMaintainSetting(dataToSend);
      } else if (type === "hosting") {
        response = await updateHostingSetting(dataToSend);
      } else if (type === "server") {
        response = await updateServerSetting(dataToSend);
      }

      if (response?.meta?.success) {
        toast.success(response?.meta?.message);
        handleClose();
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.meta?.message ?? "Something went wrong"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle> Edit Send Time </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="w-full ">
            <div className="flex flex-row gap-2 lg:gap-4 items-center  w-full ">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel> Time </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Time"
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Unit </FormLabel>
                    <FormControl>
                      <OptionSelect
                        options={Object.values(
                          NOTI_SETTING_TIME_UNITS_ENUM
                        ).map((item) => ({
                          label: `${toSentenceCase(item)}`,
                          value: item,
                        }))}
                        placeholder="Select Unit"
                        {...field}
                        selectClassName="w-[118px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row gap-4 justify-end items-center mt-4">
              <Button
                variant="outline"
                className="text-text-primary"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                loading={
                  isUpdatePending ||
                  isUpdateHostingPending ||
                  isUpdateServerPending
                }
                addDoneIcon
              >
                {" "}
                Update{" "}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
