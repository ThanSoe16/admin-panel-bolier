"use client";
import React, { useEffect, useState } from "react";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Flex, Grid } from "@radix-ui/themes";
import {
  useCreateHostingFee,
  useCreateHostingRenewFee,
} from "@/features/service-fee/services/mutations";
import { MoneyInput } from "@/components/shared/base/MoneyInput";

interface UpdateFormProps {
  hosting: string;
  hostingRenew: string;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ hosting, hostingRenew }) => {
  const mode = useSearchParams().get("mode") || "";

  const links = [
    { label: "Hosting Fee", href: "/service-fee/hosting" },
    { label: mode ? "Create" : "Edit", href: "" },
  ];

  const router = useRouter();

  const [hostingValue, setHostingValue] = useState<string>(hosting);
  const [hostingRenewValue, setHostingRenewValue] = useState(hostingRenew);

  useEffect(() => {
    setHostingValue(hosting);
    setHostingRenewValue(hostingRenew);
  }, [hosting, hostingRenew]);

  const createHostingFee = useCreateHostingFee();
  const createHostingRenewFee = useCreateHostingRenewFee();

  const createHandler = () => {
    createHostingFee.mutateAsync(hostingValue.toString());
    createHostingRenewFee
      .mutateAsync(hostingRenewValue.toString())
      .then(() => router.back());
  };

  return (
    <div className="space-y-4">
      <Flex
        direction={{ initial: "column", md: "row" }}
        align={{ initial: "start", md: "center" }}
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
            loading={createHostingFee.isPending}
            addDoneIcon
            onClick={createHandler}
            disabled={Number(hostingValue) < 1 || Number(hostingRenewValue) < 1}
          >
            {" "}
            {mode ? "Create" : "Update"}
          </Button>
        </div>
      </Flex>
      <Grid columns={{ initial: "1", md: "2" }} className="gap-4">
        <MoneyInput
          value={hostingValue.toString()}
          setValue={(e) => setHostingValue(e)}
          placeholder="Hosting Fee"
          postfix="$/ year"
        />
        <MoneyInput
          value={hostingRenewValue}
          setValue={(e) => setHostingRenewValue(e)}
          placeholder="Hosting Renew Fee"
          postfix="$"
        />
      </Grid>
    </div>
  );
};

export default UpdateForm;
