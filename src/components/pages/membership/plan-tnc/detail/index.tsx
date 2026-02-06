"use client";
import React, { useEffect, useState } from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { TextEditor } from "@/components/shared/text-editor";
import { Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { toast } from "sonner";
import {
  useGetBlogServiceFeeTNC,
  useGetMembershipPlanTNC,
} from "@/features/payment-settings/blog-service-fee-tnc/services/queries";
import { useUpdateMembershipPlanTNC } from "@/features/payment-settings/blog-service-fee-tnc/services/mutations";
import { UpdateBlogServiceFeeTermsConditionsRequest } from "@/features/payment-settings/blog-service-fee-tnc/types";

const MemberPlanTNCDetail = () => {
  const router = useRouter();

  const updateTC = useUpdateMembershipPlanTNC();

  const { data, isLoading } = useGetMembershipPlanTNC();

  const [value, setValue] = useState(data?.body?.data?.content || "");

  useEffect(() => {
    if (data?.body?.data) {
      setValue(data?.body?.data?.content ?? "");
      return;
    }
  }, [data?.body?.data]);

  const resetHandler = () => {
    router.back();
  };

  const updateHandler = () => {
    const updatedData: UpdateBlogServiceFeeTermsConditionsRequest = {
      id: data?.body?.data?.id ?? "",
      content: value,
    };
    updateTC.mutateAsync(updatedData).then(() => {
      toast.success("Updated successfully");
      router.back();
    });
  };

  return (
    <div className="space-y-4">
      <PageBreadcrumb
        links={[
          {
            label: "Membership Plan T&C",
            href: "",
          },
          { label: "Detail", href: "" },
        ]}
        enableBack
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <TextEditor value={value} setValue={setValue} />
          <Flex justify="end" className="space-x-2">
            <Button
              size="lg"
              variant="outline"
              type="button"
              onClick={resetHandler}
            >
              Cancel
            </Button>
            <Button size="lg" onClick={updateHandler}>
              Update
            </Button>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default MemberPlanTNCDetail;
