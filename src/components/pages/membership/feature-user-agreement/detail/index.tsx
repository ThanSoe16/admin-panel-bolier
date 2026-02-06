"use client";
import React, { useEffect, useState } from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { TextEditor } from "@/components/shared/text-editor";
import { Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { toast } from "sonner";
import { useGetUserAgreement } from "@/features/membership/features-user-agreement/services/queries";
import { useGetBloglanguages } from "@/features/blog-preferences/services/queries";
import { useUpdateUserAgreement } from "@/features/membership/features-user-agreement/services/mutations";
import { UpdateUserAgreementRequest } from "@/features/membership/features-user-agreement/types";

const UserAgreementDetail = () => {
  const router = useRouter();
  const { data, isLoading } = useGetUserAgreement();
  const languages = useGetBloglanguages();
  const english = languages?.data?.body?.data?.find((item) => item.key == "en");

  const updateUserAgreement = useUpdateUserAgreement();

  const [value, setValue] = useState(data?.body?.data.content || "");

  useEffect(() => {
    if (english) {
      setValue(data?.body?.data.content ?? "");
      return;
    }
  }, [english, data]);

  const resetHandler = () => {
    router.back();
  };

  const updateHandler = () => {
    const updatedData: UpdateUserAgreementRequest = {
      id: data?.body?.data.id ?? "",
      content: value,
    };
    updateUserAgreement.mutateAsync(updatedData).then(() => {
      router.back();
    });
  };

  return (
    <div className="space-y-4">
      <PageBreadcrumb
        links={[
          {
            label: "Membership",
            href: "",
          },
          { label: "User Agreement", href: "" },
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
            <Button
              size="lg"
              onClick={updateHandler}
              loading={updateUserAgreement.isPending}
            >
              Update
            </Button>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default UserAgreementDetail;
