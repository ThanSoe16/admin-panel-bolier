"use client";
import React, { useState } from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { TextEditor } from "@/components/shared/text-editor";
import { Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateUserAgreement } from "@/features/membership/features-user-agreement/services/mutations";

const CreateUserAgreement = () => {
  const router = useRouter();
  const createAgreement = useCreateUserAgreement();

  const [value, setValue] = useState("");

  const resetHandler = () => {
    router.back();
  };

  const updateHandler = () => {
    createAgreement.mutateAsync(value).then(() => {
      toast.success("Created successfully");
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
            loading={createAgreement.isPending}
          >
            Save
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default CreateUserAgreement;
