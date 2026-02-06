"use client";
import React, { useEffect, useState } from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { TextEditor } from "@/components/shared/text-editor";
import { Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { toast } from "sonner";
import { useUpdateRegistrationTermsConditions } from "@/features/settings/registration-tnc/services/mutations";
import { useGetRegistrationTNC } from "@/features/settings/registration-tnc/services/queries";
import { RegistrationTermsConditionsTypeEnum } from "@/features/base/types/backend-defined-enums";
import { UpdateRegistrationTermsConditionsRequest } from "@/features/settings/registration-tnc/types";

const EmailRegistrationTNCDetail = () => {

  const router = useRouter();

  const updateTC = useUpdateRegistrationTermsConditions();

  const { data, isLoading } = useGetRegistrationTNC({
    type: RegistrationTermsConditionsTypeEnum.EMAIL
  });

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
    const updatedData: UpdateRegistrationTermsConditionsRequest = {
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
          { label: "Settings", href: "" },
          {
            label: "Email Registration T&C",
            href: "/settings/email-registration-tnc",
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

export default EmailRegistrationTNCDetail;
