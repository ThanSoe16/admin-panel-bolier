"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  BlogMerchantAccountLimitData,
  UpdateBlogMerchantAccountLimitRequest,
  updateBlogMerchantAccountLimitSchema,
} from "@/features/blog-preferences/types";
import { useUpdateBlogMerchantAccountLimit } from "@/features/blog-preferences/services/mutations";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditMerchantAccountLimitModalProps {
  data: BlogMerchantAccountLimitData;
  open: boolean;
  handleClose: () => void;
}

const EditMerchantAccountLimitModal: React.FC<
  EditMerchantAccountLimitModalProps
> = ({ data, open, handleClose }) => {
  const { mutateAsync: updateMerchantAccountLimit, isPending } =
    useUpdateBlogMerchantAccountLimit();

  const form = useForm<UpdateBlogMerchantAccountLimitRequest>({
    resolver: zodResolver(updateBlogMerchantAccountLimitSchema),
    defaultValues: {
      numberOfMerchant: data?.numberOfMerchant,
    },
  });

  const onSubmit = async (
    submittedData: UpdateBlogMerchantAccountLimitRequest
  ) => {
    try {
      const response = await updateMerchantAccountLimit({
        id: data?.id,
        data: submittedData,
      });
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
        <DialogHeader> Edit Merchant Account Limit </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="numberOfMerchant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Merchant</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(Number(value.target.value));
                        }}
                        placeholder="Enter number of merchant limit"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  addDoneIcon
                  disabled={!form.formState.isValid}
                  loading={isPending}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMerchantAccountLimitModal;
