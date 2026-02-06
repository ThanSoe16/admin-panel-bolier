"use client";
import { MoneyInput } from "@/components/shared/base/MoneyInput";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { useCreateSetupFee } from "@/features/service-fee/services/mutations";
import { Flex } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UpdateFormProps {
  fee: string;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ fee = "0" }) => {
  const router = useRouter();
  const mode = useSearchParams().get("mode") || "";

  const links = [
    { label: "Setup Fee", href: "/service-fee/setup" },
    { label: mode ? "Create" : "Edit", href: "" },
  ];

  const [value, setValue] = useState(fee);

  useEffect(() => {
    setValue(fee);
  }, [fee]);

  const createSetupFee = useCreateSetupFee();

  const createHandler = () => {
    createSetupFee.mutateAsync(value.toString()).then(() => router.back());
  };

  return (
    <div className="space-y-4">
      <Flex
        direction={{ initial: "column", lg: "row" }}
        align={{ initial: "start", lg: "center" }}
        justify={{ initial: "between" }}
        className="gap-4"
      >
        <PageBreadcrumb enableBack links={links} />
        <div className="flex flex-row gap-4 justify-start md:justify-end items-center w-full lg:flex-1">
          <Button
            variant="outline"
            className="text-text-primary"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            loading={createSetupFee.isPending}
            addDoneIcon
            onClick={createHandler}
            disabled={Number(value) < 1}
          >
            {mode ? "Create" : "Update"}
          </Button>
        </div>
      </Flex>
      <MoneyInput
        value={value}
        setValue={(e) => setValue(e)}
        postfix="$"
        placeholder="Setup Fee"
      />
    </div>
  );
};

export default UpdateForm;
